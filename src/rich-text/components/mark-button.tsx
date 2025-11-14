import React, { PointerEvent } from 'react';
import { useSlate } from "slate-react";
import { CustomEditor, CustomTextKey } from "../slate.types";
import { Button } from "./button";
import { isMarkActive } from "../utils/slate.utils";
import { Editor } from 'slate';
import { Icon } from './icon';

export const toggleMark = (editor: CustomEditor, format: CustomTextKey) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

interface MarkButtonProps {
  format: CustomTextKey
  icon: string
}

export const MarkButton = ({ format, icon }: MarkButtonProps) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onPointerDown={(event: PointerEvent<HTMLButtonElement>) =>
        event.preventDefault()
      }
      onClick={() => toggleMark(editor, format)}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}