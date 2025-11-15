import React from 'react';
import { ChangeEvent } from "react";
interface LanguageSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    value?: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}
export declare const LanguageSelect: (props: LanguageSelectProps) => React.JSX.Element;
export {};
