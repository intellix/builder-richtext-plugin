import React from 'react';
import { css } from "@emotion/css"
import { ChangeEvent } from "react"

interface LanguageSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value?: string
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export const LanguageSelect = (props: LanguageSelectProps) => {
  return (
    <select
      data-test-id="language-select"
      contentEditable={false}
      className={css`
        position: absolute;
        right: 5px;
        top: 5px;
        z-index: 1;
      `}
      {...props}
    >
      <option value="css">CSS</option>
      <option value="html">HTML</option>
      <option value="javascript">JS</option>
    </select>
  )
}