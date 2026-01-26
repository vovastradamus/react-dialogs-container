import { createContext, createElement, ReactNode, ComponentType, ReactElement, ComponentPropsWithoutRef, useState, useMemo } from "react";
import { dialogIDGenerator } from "./dialog.shared";
import { DialogItem, CloseDialogFn } from "./dialog.types";

const createAlertCall = (text: string): (() => void) => () => console.warn(text);
const createAlertCallReturningCloseFn = (text: string): {
  <P extends ComponentType<any>>(
    component: P,
    props?: Omit<ComponentPropsWithoutRef<P>, "closeDialog">
  ): CloseDialogFn;
  (component: ReactElement): CloseDialogFn;
} => {
  const fn = (() => {
    console.warn(text);
    return () => { };
  }) as any;
  return fn;
};
const callOutsideContextTemplate = (fnName: string): string =>
  `Try to call ${fnName} outside Provider`;

export interface DialogContextValue {
  closeDialog: () => void;
}

export interface DialogsContextValue {
  dialogs: DialogItem[];
  pushDialog: {
    <P extends ComponentType<any>>(
      component: P,
      props?: Omit<ComponentPropsWithoutRef<P>, "closeDialog">
    ): CloseDialogFn;
    (component: ReactElement): CloseDialogFn;
  };
  closeDialogByID: (dialogID: number) => void;
}

export const DialogContext = createContext<DialogContextValue>({
  closeDialog: createAlertCall(callOutsideContextTemplate("closeDialog")),
});

export const DialogsContext = createContext<DialogsContextValue>({
  dialogs: [],
  pushDialog: createAlertCallReturningCloseFn(callOutsideContextTemplate("pushDialog")),
  closeDialogByID: createAlertCall(
    callOutsideContextTemplate("closeDialogByID")
  ),
});

export interface DialogsProviderProps {
  children: ReactNode;
}

const useDialogsRoot = () => {
  const [dialogsById, setDialogs] = useState<Record<string, DialogItem>>(() => ({}));
  const dialogs = useMemo(() => Object.values(dialogsById), [dialogsById]);

  const closeDialogByID = (dialogID: number): void => {

    setDialogs((prev) => {
      const newState = { ...prev };
      delete newState[`d${dialogID}`];
      return newState;
    });
  };

  function pushDialog<P extends ComponentType<any>>(
    component: P,
    props?: Omit<ComponentPropsWithoutRef<P>, "closeDialog">
  ): CloseDialogFn;
  function pushDialog(component: ReactElement): CloseDialogFn;
  function pushDialog<P extends ComponentType<any>>(
    component: P | ReactElement,
    props?: P extends ComponentType<any> ? Omit<ComponentPropsWithoutRef<P>, "closeDialog"> : never
  ): CloseDialogFn {
    const newDialog: DialogItem = {
      component,
      props: props || {},
      dialogID: dialogIDGenerator(),
    };

    setDialogs((prevState) => ({ ...prevState, [`d${newDialog.dialogID}`]: newDialog }));

    return () => {
      closeDialogByID(newDialog.dialogID);
    };
  }

  return {
    dialogs,
    pushDialog,
    closeDialogByID,
  };
};

export const DialogsProvider = (props: DialogsProviderProps) => {
  const { children } = props;
  const dialogData = useDialogsRoot();

  return createElement(
    DialogsContext.Provider,
    { value: { ...dialogData } },
    children
  );
};
