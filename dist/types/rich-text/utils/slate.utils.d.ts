import { AlignType, CustomEditor, CustomElementFormat, CustomElementWithAlign, CustomTextKey, ListType, CustomElement } from "../slate.types";
export declare const isBlockActive: (editor: CustomEditor, format: CustomElementFormat, blockType?: "type" | "align") => boolean;
export declare const isMarkActive: (editor: CustomEditor, format: CustomTextKey) => boolean;
export declare const isAlignType: (format: CustomElementFormat) => format is AlignType;
export declare const isListType: (format: CustomElementFormat) => format is ListType;
export declare const isAlignElement: (element: CustomElement) => element is CustomElementWithAlign;
export declare const toggleBlock: (editor: CustomEditor, format: CustomElementFormat) => void;
