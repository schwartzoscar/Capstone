import { Editor, Element as SlateElement, Transforms } from "slate";
import isUrl from 'is-url';
import imageExtensions from 'image-extensions';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export function isMarkActive(editor, format) {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

export function toggleMark(editor, format) {
  const isActive = isMarkActive(editor, format);
  if(isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

export function isBlockActive(editor, format, type) {
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

export function toggleBlock(editor, format, type) {
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

export function withImages(editor) {
  const { insertData, isVoid } = editor

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = data => {
    const text = data.getData('text/plain');
    const { files } = data;

    if(files && files.length > 0) {
      for(const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split('/');
        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result;
            insertImage(editor, url);
          })
          reader.readAsDataURL(file);
        }
      }
    } else if(isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  }

  return editor;
}

export function isImageUrl(url) {
  if(!url || !isUrl(url)) return false;
  const ext = new URL(url).pathname.split('.').pop();
  return imageExtensions.includes(ext);
}

export function insertImage(editor, url) {
  const text = { text: '' };
  const image = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
  Transforms.insertNodes(editor, { type: 'paragraph', children: [{ text: '' }]} );
}
