/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Builder } from "@builder.io/sdk";
import { RichText } from "./rich-text/rich-text";
import { useMaterialIcons } from "./hooks/use-material-icons";
import { Descendant } from "slate";
import { deserialize } from "./rich-text/utils/serialization.utils";

interface RichTextProps {
  value: string;
  onChange: () => void;
}

function RichTextEditor(props: RichTextProps) {
  useMaterialIcons();

  const document = new DOMParser().parseFromString(props.value, 'text/html')
  const initialValue = deserialize(document.body);

  return (
    <RichText
      onChange={props.onChange}
      initialValue={initialValue as Descendant[]}
    />
  );
}

Builder.registerEditor({
  /**
   * Here we override the built-in richtext editor.
   */
  name: "richText",
  component: RichTextEditor,
});
