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
        renderElement={props => <Element readOnly={true} {...props}/>}
        renderLeaf={props => <Leaf {...props}/>}
      />
    </Slate>
  );
}
