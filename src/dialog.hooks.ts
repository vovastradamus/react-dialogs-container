import { useContext, useEffect, useRef, ComponentType, ReactElement } from "react";
import { DialogsContext, DialogContext } from "./dialog.contexts";
import { CloseDialogFn } from "./dialog.types";

export const useDialogs = () => {
  const { pushDialog, closeDialogByID } = useContext(DialogsContext);

  const closeFnsRef = useRef<CloseDialogFn[]>([]);

  useEffect(() => {
    return () => {
      closeFnsRef.current.forEach((closeFn) => closeFn());
    };
  }, []);

  const pushTempDialog = (
    component: ComponentType<any> | ReactElement,
    props: Record<string, any> = {}
  ): CloseDialogFn => {
    const closeFn = pushDialog(component, props);
    
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
  const { closeDialog } = useContext(DialogContext);

  return {
    closeDialog,
  };
};
