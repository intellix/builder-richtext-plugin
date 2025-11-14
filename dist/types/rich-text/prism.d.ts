import { DecoratedRange, NodeEntry } from "slate";
export declare const ParagraphType = "p";
export declare const CodeBlockType = "code";
export declare const CodeLineType = "code-line";
export declare const useDecorate: () => ([node, path]: NodeEntry) => DecoratedRange[];
