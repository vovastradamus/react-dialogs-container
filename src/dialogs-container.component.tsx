import React, { useContext, createElement, isValidElement, cloneElement, ReactElement, ComponentType } from "react";
import { DialogContext, DialogsContext } from "./dialog.contexts";
import { DialogProps, DialogItem } from "./dialog.types";

interface DialogWrapperProps {
  component: ComponentType<any> | ReactElement;
  props: Record<string, any>;
  dialogID: number;
  closeDialogByID: (dialogID: number) => void;
}

const DialogWrapper = (props: DialogWrapperProps) => {
  const {
    component: Component,
    props: componentProps,
    dialogID,
    closeDialogByID,
  } = props;
  const closeDialog = () => closeDialogByID(dialogID);

  return createElement(
    DialogContext.Provider,
    {
      key: dialogID,
      value: {
        closeDialog,
      },
    },
    isValidElement(Component)
      ? cloneElement(Component, {
          closeDialog: closeDialog,
          ...componentProps,
        } as any)
      : createElement(Component as ComponentType<DialogProps>, {
          closeDialog: closeDialog,
          ...componentProps,
        })
  );
};

export const DialogsContainer = () => {
  const { dialogs, closeDialogByID } = useContext(DialogsContext);

  const dialogsView = dialogs.map((dialogProps: DialogItem) =>
    createElement(DialogWrapper, {
      key: dialogProps.dialogID,
      closeDialogByID,
      ...dialogProps,
    })
  );

  return <>{dialogsView}</>;
};
