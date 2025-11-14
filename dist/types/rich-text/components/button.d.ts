import React, { ReactNode } from 'react';
interface ButtonProps {
    className?: string;
    onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => void;
    onClick: (event: React.PointerEvent<HTMLButtonElement>) => void;
    active: boolean;
    reversed?: boolean;
    children?: ReactNode;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export {};
