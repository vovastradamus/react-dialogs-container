import { useContext, createElement, isValidElement, cloneElement } from "react";
import { DialogContenxt, DialogsContext } from "./dialog.contexts";

const DialogWrapper = (props) => {
  const {
    component: Component,
    props: componentProps,
    dialogID,
    closeDialogByID,
  } = props;
  const closeDialog = () => closeDialogByID(dialogID);

  return createElement(
    DialogContenxt.Provider,
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
        })
      : createElement(Component, {
          closeDialog: closeDialog,
          ...componentProps,
        })
  );
};

export const DialogsContainer = () => {
  const { dialogs, closeDialogByID } = useContext(DialogsContext);

  const dialogsView = dialogs.map((dialogProps) =>
    createElement(DialogWrapper, {
      key: dialogProps.dialogID,
      closeDialogByID,
      ...dialogProps,
    })
  );

  return dialogsView;
};
