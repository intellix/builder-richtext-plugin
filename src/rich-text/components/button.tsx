import { css, cx } from '@emotion/css';
import React, { ReactNode } from 'react';

interface ButtonProps {
  className?: string;
  onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => void;
  onClick: (event: React.PointerEvent<HTMLButtonElement>) => void;
  active: boolean;
  reversed?: boolean;
  children?: ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', active, reversed, children, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={cx(
        css`
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
          color: ${reversed
            ? active
              ? 'white'
              : '#aaa'
            : active
            ? 'black'
            : '#ccc'};
        `,
        className
      )}
    >{children}</button>
  )
)