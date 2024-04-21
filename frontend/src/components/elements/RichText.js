import { useMemo } from "react";
import { createEditor, Transforms, } from 'slate';
import { Slate, Editable, withReact, useSlateStatic, useSelected, useFocused, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';
import isHotkey from "is-hotkey";
import { isMarkActive, toggleMark, isBlockActive, toggleBlock, withImages, isImageUrl, insertImage } from "../../helpers/richTextHelpers";
import Button from "./Button";

const HOTKEYS = {'mod+b': 'bold', 'mod+i': 'italic', 'mod+u': 'underline', 'mod+`': 'code', 'mod+a': 'all'};

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

  const editor = useMemo(() => withImages(withHistory(withReact(createEditor()))), []);

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
        if(hotkey === 'mod+a') {
          Transforms.select(editor, []);
        } else {
          toggleMark(editor, HOTKEYS[hotkey]);
        }
      }
    }
  }

  const imageUpload = () => {
    const url = window.prompt('Enter the URL of the image:');
    if (url && !isImageUrl(url)) {
      alert('URL is not an image');
      return;
    }
    url && insertImage(editor, url);
  }

  return(
    <Slate editor={editor} initialValue={initialValue} onChange={props.onChange}>
      <div className="rich-text-controls">
        {markButtons}
        {blockButtons}
        <Button onClick={imageUpload}>
          <span className="fas fa-image"/>
        </Button>
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
    case 'image':
      return <Image attributes={attributes} element={element}>{children}</Image>;
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

const Image = ({ attributes, children, element }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const selected = useSelected();
  const focused = useFocused();

  return(
    <div {...attributes}>
      {children}
      <div contentEditable={false} className="position-relative">
        <img
          src={element.url} className="rich-text-image"
          style={{ boxShadow: `${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}` }}
        />
        <Button
          active className="rich-text-image-remove"
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          style={{ display: `${selected && focused ? 'inline' : 'none'}` }}
        >
          <span className="fas fa-trash"/>
        </Button>
      </div>
    </div>
  )
}
