import { css, cx } from '@emotion/css';
import React, { PropsWithChildren, Ref } from 'react';

interface IconProps {
  className?: string;
}

export const Icon = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<IconProps>,
    ref: Ref<HTMLSpanElement>
  ) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        'material-icons',
        className,
        css`
          font-size: 18px;
          vertical-align: text-bottom;
        `
      )}
    />
  )
)