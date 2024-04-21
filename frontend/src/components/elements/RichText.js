import { useState, useMemo } from "react";
import { createEditor, Editor, Transforms, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import isHotkey from "is-hotkey";
import Button from "./Button";

const HOTKEYS = {'mod+b': 'bold', 'mod+i': 'italic', 'mod+u': 'underline', 'mod+`': 'code'};
const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const MARKS = [
  { format: 'bold', icon: 'fa-bold' },
  { format: 'italic', icon: 'fa-italic' },
  { format: 'underline', icon: 'fa-underline' },
  { format: 'code', icon: 'fa-code' }
]

const BLOCKS = [
  { format: 'heading-one', type: 'type', icon: 'fa-1' },
  { format: 'heading-two', type: 'type', icon: 'fa-2' },
  { format: 'block-quote', type: 'type', icon: 'fa-quote-left' },
  { format: 'numbered-list', type: 'type', icon: 'fa-list-ol' },
  { format: 'bulleted-list', type: 'type', icon: 'fa-list-ul' },
  { format: 'left', type: 'align', icon: 'fa-align-left' },
  { format: 'center', type: 'align', icon: 'fa-align-center' },
  { format: 'right', type: 'align', icon: 'fa-align-right' },
  { format: 'justify', type: 'align', icon: 'fa-align-justify' }
];

export default function RichText(props) {

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const initialValue = [{ type: 'paragraph', children: [{ text: '' }] }];

  const markButtons = MARKS.map(mark => (
    <Button key={mark.format} active={isMarkActive(editor, mark.format)}
            onClick={() => toggleMark(editor, mark.format)}>
      <span className={`fas ${mark.icon}`}/>
    </Button>
  ));

  const blockButtons = BLOCKS.map(block => (
    <Button key={block.format} active={isBlockActive(editor, block.format, block.type)}
            onClick={() => toggleBlock(editor, block.format, block.type)}>
      <span className={`fas ${block.icon}`}/>
    </Button>
  ));

  const checkHotKey = evt => {
    for(const hotkey in HOTKEYS) {
      if(isHotkey(hotkey, evt)) {
        evt.preventDefault();
        toggleMark(editor, HOTKEYS[hotkey]);
      }
    }
  }

  return(
    <Slate editor={editor} initialValue={initialValue} onChange={props.onChange}>
      <div className="rich-text-controls">
        {markButtons}
        {blockButtons}
      </div>
      <div className="rich-text-input">
        <Editable
          renderElement={props => <Element {...props}/>}
          renderLeaf={props => <Leaf {...props}/>}
          placeholder="Start your post…"
          spellCheck
          autoFocus
          onKeyDown={checkHotKey}
        />
      </div>
    </Slate>
  );
}

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case 'block-quote':
      return <blockquote style={style} {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul style={style} {...attributes}>{children}</ul>;
    case 'heading-one':
      return <p style={style} {...attributes} className="rich-text-h1">{children}</p>;
    case 'heading-two':
      return <p style={style} {...attributes} className="rich-text-h2">{children}</p>;
    case 'list-item':
      return <li style={style} {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol style={style} {...attributes}>{children}</ol>;
    default:
      return <p style={style} {...attributes}>{children}</p>;
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if(leaf.bold) children = <strong>{children}</strong>;
  if(leaf.code) children = <code>{children}</code>;
  if(leaf.italic) children = <em>{children}</em>;
  if(leaf.underline) children = <u>{children}</u>;
  return <span {...attributes}>{children}</span>
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if(isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

const isBlockActive = (editor, format, type) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: node =>
        !Editor.isEditor(node) &&
        SlateElement.isElement(node) &&
        node[type] === format,
    })
  );

  return !!match;
}

const toggleBlock = (editor, format, type) => {
  const isActive = isBlockActive(editor, format, type);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: node =>
      !Editor.isEditor(node) &&
      SlateElement.isElement(node) &&
      LIST_TYPES.includes(node.type) &&
      type !== 'align',
    split: true,
  });

  let newProperties = {};
  if(type === 'align') {
    newProperties = { align: isActive ? undefined : format };
  } else {
    newProperties = { type: isActive ? 'paragraph' : isList ? 'list-item' : format };
  }

  Transforms.setNodes(editor, newProperties);

  if(!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
}
