import React from "react";
import { Transforms } from "slate";
import { ReactEditor, RenderElementProps, useSlateStatic } from "slate-react";
import { css } from "@emotion/css";
import { CodeBlockType, CodeLineType } from "../prism";
import { LanguageSelect } from "./language-select";
import { isAlignElement } from "../utils/slate.utils";
import { AlignType } from "../slate.types";

export const Element = ({ attributes, children, element }: RenderElementProps) => {
  const editor = useSlateStatic();
  const style: React.CSSProperties = {};

  if (isAlignElement(element)) {
    style.textAlign = element.align as AlignType;
  }

  if (element.type === CodeBlockType) {
    const setLanguage = (language: string) => {
      const path = ReactEditor.findPath(editor, element);
      Transforms.setNodes(editor, { language }, { at: path });
    };

    return (
      <div
        {...attributes}
        className={css(`
        font-family: monospace;
        font-size: 16px;
        line-height: 20px;
        margin-top: 0;
        margin-bottom: 4px;
        background: rgba(0, 20, 60, .03);
        padding: 5px 13px;
      `)}
        style={{ position: "relative" }}
        spellCheck={false}
      >
        <LanguageSelect
          value={element.language}
          onChange={(e) => setLanguage(e.target.value)}
        />
        {children}
      </div>
    );
  }

  if (element.type === CodeLineType) {
    return (
      <div {...attributes} style={{ position: "relative" }}>
        {children}
      </div>
    );
  }

  switch (element.type) {
    case "blockquote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "ul":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "h1":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "li":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "ol":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default: {
      if (editor.isInline(element)) {
        return (
          <span style={{ ...style }} {...attributes}>
            {children}
          </span>
        );
      }

      return (
        <div style={{ ...style, marginBottom: 4 }} {...attributes}>
          {children}
        </div>
      );
    }
  }
};
