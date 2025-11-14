/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Builder } from '@builder.io/sdk';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';

// Then register the languages you need
hljs.registerLanguage('javascript', javascript);

const options: ReactQuill.QuillOptions = {
  formats: [
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
  ],
  modules: {
    syntax: {
      highlight: hljs.highlightAuto,
    },
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
  },
}

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
      {...options}
    />
  );
}

Builder.registerEditor({
  /**
   * Here we override the built-in richtext editor.
   */
  name: 'html',
  component: RichTextEditor,
});
