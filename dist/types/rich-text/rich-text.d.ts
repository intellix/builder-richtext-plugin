import React from "react";
import { Descendant } from "slate";
export interface RichTextProps {
    onChange: (value: string) => void;
    initialValue: Descendant[];
}
export declare const RichText: (props: RichTextProps) => React.JSX.Element;
