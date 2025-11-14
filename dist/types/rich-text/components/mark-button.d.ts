import React from 'react';
import { CustomEditor, CustomTextKey } from "../slate.types";
export declare const toggleMark: (editor: CustomEditor, format: CustomTextKey) => void;
interface MarkButtonProps {
    format: CustomTextKey;
    icon: string;
}
export declare const MarkButton: ({ format, icon }: MarkButtonProps) => React.JSX.Element;
export {};
