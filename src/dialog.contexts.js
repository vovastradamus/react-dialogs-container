import { createContext, createElement } from "react";
import { useDialogs } from "./dialog.hooks";

const createAlertCall = (text) => console.warn(text);
const callOutsideContextTemplate = (fnName) =>
  `Try to call ${fnName} outside Provider`;

export const DialogContenxt = createContext({
  closeDialog: createAlertCall(callOutsideContextTemplate("closeDialog")),
});

export const DialogsContext = createContext({
  dialogs: [],
  pushDialog: createAlertCall(callOutsideContextTemplate("pushDialog")),
  closeDialogByID: createAlertCall(
    callOutsideContextTemplate("closeDialogByID")
  ),
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
