import React, { PointerEvent } from 'react';
import { Element, Transforms } from "slate"
import { useSlateStatic } from "slate-react"
import { CodeBlockType, CodeLineType, ParagraphType } from "../prism"
import { Button } from "./button"
import { Icon } from "./icon"

export const CodeBlockButton = () => {
  const editor = useSlateStatic()
  const handleClick = () => {
    Transforms.wrapNodes(
      editor,
      { type: CodeBlockType, language: 'javascript', children: [] },
      {
        match: n => Element.isElement(n) && n.type === ParagraphType,
        split: true,
      }
    )
    Transforms.setNodes(
      editor,
      { type: CodeLineType },
      { match: n => Element.isElement(n) && n.type === CodeLineType }
    )
  }

  return (
    <Button
      data-test-id="code-block-button"
      active
      onPointerDown={(event: PointerEvent<HTMLButtonElement>) => {
        event.preventDefault()
      }}
      onClick={handleClick}
    >
      <Icon>code</Icon>
    </Button>
  )
}