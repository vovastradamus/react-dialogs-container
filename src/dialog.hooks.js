import { useState, useContext, useEffect, useRef } from "react";
import { dialogIDGenerator } from "./dialog.shared";
import { DialogsContext, DialogContenxt } from "./dialog.contexts";

export const useDialogsRoot = () => {
  const [dialogs, setDialogs] = useState(() => []);

  const closeDialogByID = (dialogID) => {
    setDialogs((d) => d.filter((dialog) => dialog.dialogID !== dialogID));
  };
  const pushDialog = (component, props = {}) => {
    const newDialog = {
      component,
      props,
      dialogID: dialogIDGenerator(),
    };

    setDialogs((m) => [...m, newDialog]);

    return () => {
      closeDialogByID(newDialog.dialogID);
    };
  };

  return {
    dialogs,
    pushDialog,
    closeDialogByID,
  };
};

export const useDialogs = () => {
  const { pushDialog, closeDialogByID } = useContext(DialogsContext);

  const closeFnsRef = useRef([]);

  useEffect(() => {
    return () => {
      closeFnsRef.current.forEach((closeFn) => closeFn());
    };
  }, []);

  const pushTempDialog = (...args) => {
    const closeFn = pushDialog(...args);
    
    closeFnsRef.current.push(closeFn);

    return closeFn;
  };

  return {
    pushDialog,
    pushTempDialog,
    closeDialogByID,
  };
};

export const useDialog = () => {
  const { closeDialog } = useContext(DialogContenxt);

  return {
    closeDialog,
  };
};

export const useDialogsContainer = useDialogs;
