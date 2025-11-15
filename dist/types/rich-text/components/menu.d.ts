import React, { ReactNode } from 'react';
interface MenuProps {
    className?: string;
}
export declare const Menu: React.ForwardRefExoticComponent<MenuProps & {
    children?: ReactNode | undefined;
} & React.RefAttributes<HTMLDivElement>>;
export {};
