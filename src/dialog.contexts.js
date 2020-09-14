import { createContext, createElement } from "react";
import { noop } from "./dialog.shared";
import { useDialogs } from "./dialog.hooks";

export const DialogContenxt = createContext({
  closeDialog: noop,
});

export const DialogsContext = createContext({
  dialogs: [],
  pushDialog: noop,
  closeDialogByID: noop,
});

export const DialogsProvider = (props) => {
  const { children } = props;
  const dialogData = useDialogs();

  return createElement(
    DialogsContext.Provider,
    { value: { ...dialogData } },
    children
  );
};
