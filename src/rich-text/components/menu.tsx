import { css, cx } from '@emotion/css';
import React, { PropsWithChildren, ReactNode, Ref } from 'react';

interface MenuProps {
  className?: string;
}

export const Menu = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<MenuProps>,
    ref: Ref<HTMLDivElement>
  ) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={cx(
        className,
        css`
          & > * {
            display: inline-block;
          }

          & > * + * {
            margin-left: 6px;
          }
        `
      )}
    />
  )
)