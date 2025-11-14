import { css, cx } from '@emotion/css';
import React, { PropsWithChildren, ReactNode, Ref } from 'react';
import { Menu } from './menu';

interface ToolbarProps {
  className?: string;
}

export const Toolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<ToolbarProps>,
    ref: Ref<HTMLDivElement>
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          display: flex;
          padding: 0 0 5px;
          border-bottom: 2px solid #ddd;
        `
      )}
    />
  )
)