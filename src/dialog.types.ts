import { ReactElement, ComponentType } from "react";

export interface DialogProps {
  closeDialog?: () => void;
  [key: string]: any;
}

export type PropsWithDialogProps<P = unknown> = P & DialogProps;

export interface DialogItem {
  component: ComponentType<DialogProps> | ReactElement;
  props: Record<string, any>;
  dialogID: number;
}

export type CloseDialogFn = () => void;
