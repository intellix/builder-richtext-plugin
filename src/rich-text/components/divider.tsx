import { css, cx } from '@emotion/css';
import React from 'react';

export const Divider = () => (
  <div className={cx(
    css`
      border-left: 1px solid #ddd;
      height: 18px;
      width: 1px;
    `
  )}></div>
);