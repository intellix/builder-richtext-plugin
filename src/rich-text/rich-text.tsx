import { css, cx } from "@emotion/css";
import isHotkey from "is-hotkey";
import React, { KeyboardEvent, useMemo } from "react";
import { Descendant, Editor, createEditor } from "slate";
import { withHistory } from "slate-history";
import { Editable, RenderLeafProps, Slate, withReact } from "slate-react";
import { BlockButton } from "./components/block-button";
import { CodeBlockButton } from "./components/code-block-button";
import { Element } from "./components/element";
import { MarkButton, toggleMark } from "./components/mark-button";
import { Toolbar } from "./components/toolbar";
import { useDecorate } from "./prism";
import { prismThemeCss } from "./prism-css";
import { HOTKEYS } from "./slate.types";
import { toggleBlock } from "./utils/slate.utils";
import { serialize } from "./utils/serialization.utils";
import { Divider } from "./components/divider";

const renderLeaf = (props: RenderLeafProps) => {
  const { attributes, leaf } = props;
  const { text, ...rest } = leaf;

  if (leaf.bold) {
    props.children = <strong>{props.children}</strong>;
  }

  if (leaf.code) {
    props.children = <code>{props.children}</code>;
  }

  if (leaf.italic) {
    props.children = <em>{props.children}</em>;
  }

  if (leaf.underline) {
    props.children = <u>{props.children}</u>;
  }

  return (
    <span {...attributes} className={Object.keys(rest).join(" ")}>
      {props.children}
    </span>
  );
};

export interface RichTextProps {
  onChange: (value: string) => void;
  initialValue: Descendant[];
}

export const RichText = (props: RichTextProps) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const decorate = useDecorate();

  return (
    <Slate
      editor={editor}
      initialValue={
        props.initialValue?.length > 0
          ? props.initialValue
          : [
              {
                type: "p",
                children: [{ text: "" }],
              },
            ]
      }
      onChange={(value) => {
        props.onChange(serialize(value));
      }}
    >
      <Toolbar>
        <BlockButton format="h1" icon="looks_one" />
        <BlockButton format="h2" icon="looks_two" />
        <Divider />
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="underline" icon="format_underlined" />
        <Divider />
        <BlockButton format="ol" icon="format_list_numbered" />
        <BlockButton format="ul" icon="format_list_bulleted" />
        <Divider />
        <BlockButton format="left" icon="format_align_left" />
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="justify" icon="format_align_justify" />
        <Divider />
        <CodeBlockButton />
      </Toolbar>
      <Editable
        className={cx(
          css`
            outline: none;
            min-height: 100px;
            padding: 15px;
            border: 1px solid #ddd;
          `
        )}
        decorate={decorate}
        renderElement={Element}
        renderLeaf={renderLeaf}
        spellCheck
        onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
          if (isHotkey('tab', event)) {
            event.preventDefault()
            Editor.insertText(editor, '  ');
            return;
          }

          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
        onKeyUp={(event: KeyboardEvent<HTMLDivElement>) => {
          if (event.key === "Enter" && event.shiftKey === true) {
            toggleBlock(editor, "p");
          }
        }}
      />
      <style>{prismThemeCss}</style>
    </Slate>
  );
};
