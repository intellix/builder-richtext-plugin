import { Descendant } from "slate";
export declare function serialize(nodes: Descendant[]): string;
export declare const deserialize: (el: Node, markAttributes?: {}) => any[] | import("../slate.types").CustomText | import("../slate.types").CustomElement | "\n" | null;
