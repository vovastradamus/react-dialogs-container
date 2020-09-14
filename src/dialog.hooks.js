import { useState, useContext } from "react";
import { dialogIDGenerator } from "./dialog.shared";
import { DialogsContext, DialogContenxt } from "./dialog.contexts";

export const useDialogs = () => {
  const [dialogs, setDialogs] = useState([]);

  const pushDialog = (component, props = {}) => {
    const newDialog = {
      component,
      props,
      dialogID: dialogIDGenerator(),
    };

    setDialogs((m) => [...m, newDialog]);

    return newDialog.dialogID;
  };

  const closeDialogByID = (dialogID) => {
    setDialogs((d) => d.filter((dialog) => dialog.dialogID !== dialogID));
  };

  return {
    dialogs,
    pushDialog,
    closeDialogByID,
  };
};

export const useDialogsContainer = () => {
  const { pushDialog, closeDialogByID } = useContext(DialogsContext);

  return {
    pushDialog,
    closeDialogByID,
  };
};

export const useDialog = () => {
  const { closeDialog } = useContext(DialogContenxt);

  return {
    closeDialog,
  };
};
