import { useMemo } from 'react';
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { Element, Leaf } from "./RichText";

export default function RichTextReadOnly({ content }) {

  const editor = useMemo(() => withReact(createEditor()), [])

  return(
    <Slate editor={editor} initialValue={content}>
      <Editable
        readOnly
        renderElement={props => <Element {...props}/>}
        renderLeaf={props => <Leaf {...props}/>}
      />
    </Slate>
  );
}
