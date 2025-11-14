import { css, cx } from '@emotion/css';
import React, { PropsWithChildren, ReactNode, Ref } from 'react';

interface InstructionProps {
  className?: string;
}

export const Instruction = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<InstructionProps>,
    ref: Ref<HTMLDivElement>
  ) => (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          white-space: pre-wrap;
          margin: 0 -20px 10px;
          padding: 10px 20px;
          font-size: 14px;
          background: #f8f8e8;
        `
      )}
    />
  )
)