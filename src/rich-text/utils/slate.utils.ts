import { Editor, Element as SlateElement, Transforms } from "slate";
import {
  AlignType,
  CustomEditor,
  CustomElementFormat,
  CustomElementWithAlign,
  CustomTextKey,
  LIST_TYPES,
  ListType,
  TEXT_ALIGN_TYPES,
  CustomElement,
} from "../slate.types";

export const isBlockActive = (
  editor: CustomEditor,
  format: CustomElementFormat,
  blockType: "type" | "align" = "type"
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => {
        if (!Editor.isEditor(n) && SlateElement.isElement(n)) {
          if (blockType === "align" && isAlignElement(n)) {
            return n.align === format;
          }
          return n.type === format;
        }
        return false;
      },
    })
  );

  return !!match;
};

export const isMarkActive = (editor: CustomEditor, format: CustomTextKey) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const isAlignType = (
  format: CustomElementFormat
): format is AlignType => {
  return TEXT_ALIGN_TYPES.includes(format as AlignType);
};

export const isListType = (format: CustomElementFormat): format is ListType => {
  return LIST_TYPES.includes(format as ListType);
};

export const isAlignElement = (
  element: CustomElement
): element is CustomElementWithAlign => {
  return "align" in element;
};

export const toggleBlock = (
  editor: CustomEditor,
  format: CustomElementFormat
) => {
  const isActive = isBlockActive(
    editor,
    format,
    isAlignType(format) ? "align" : "type"
  );
  const isList = isListType(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      isListType(n.type) &&
      !isAlignType(format),
    split: true,
  });

  let newProperties: Partial<SlateElement>;

  if (isAlignType(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "p" : isList ? "li" : format,
    };
  }

  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};
