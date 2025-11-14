import React, { PointerEvent } from "react";
import { useSlate } from "slate-react";
import { Button } from "./button";
import { Icon } from "./icon";
import { CustomElementFormat } from "../slate.types";
import { isAlignType, isBlockActive, toggleBlock } from "../utils/slate.utils";

interface BlockButtonProps {
  format: CustomElementFormat;
  icon: string;
}

export const BlockButton = ({ format, icon }: BlockButtonProps) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        isAlignType(format) ? "align" : "type"
      )}
      onPointerDown={(event: PointerEvent<HTMLButtonElement>) =>
        event.preventDefault()
      }
      onClick={() => toggleBlock(editor, format)}
      data-test-id={`block-button-${format}`}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};
