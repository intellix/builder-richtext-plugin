/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Builder } from '@builder.io/sdk';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    // ['color', 'background'],
    ['code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'code-block',
  'list',
  'script',
  'bullet',
  'indent',
  'link',
  'image',
];

interface TextProps {
  value: string;
  onChange: () => void;
}

function RichTextEditor(props: TextProps) {
  return (
    <ReactQuill
      theme="snow"
      value={props.value}
      onChange={props.onChange}
      modules={modules}
      formats={formats}
    />
  );
}

Builder.registerEditor({
  /**
   * Here we override the built-in richtext editor.
   */
  name: 'richText',
  component: RichTextEditor,
});
