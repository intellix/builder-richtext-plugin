import Prism from "prismjs";
import { useCallback } from "react";
import {
  DecoratedRange,
  NodeEntry,
  Node as SlateNode,
  Element as SlateElement,
} from "slate";
import { normalizeTokens } from "./utils/normalize-tokens";
import { CodeBlockElement } from "./slate.types";

export const ParagraphType = "p";
export const CodeBlockType = "code";
export const CodeLineType = "code-line";

const decorateCodeBlock = ([block, blockPath]: NodeEntry<
  CodeBlockElement
>): DecoratedRange[] => {
  const text = block.children.map((line) => SlateNode.string(line)).join("\n");
  const tokens = Prism.tokenize(text, Prism.languages[block.language]);
  const normalizedTokens = normalizeTokens(tokens); // make tokens flat and grouped by line
  const decorations: DecoratedRange[] = [];

  for (let index = 0; index < normalizedTokens.length; index++) {
    const tokens = normalizedTokens[index];

    let start = 0;
    for (const token of tokens) {
      const length = token.content.length;
      if (!length) {
        continue;
      }

      const end = start + length;

      const path = [...blockPath, index, 0];

      decorations.push({
        anchor: { path, offset: start },
        focus: { path, offset: end },
        token: true,
        ...Object.fromEntries(token.types.map((type) => [type, true])),
      });

      start = end;
    }
  }

  return decorations;
};

export const useDecorate = () => {
  return useCallback(([node, path]: NodeEntry) => {
    if (SlateElement.isElement(node) && node.type === CodeBlockType) {
      return decorateCodeBlock([node, path]);
    }

    return [];
  }, []);
};
