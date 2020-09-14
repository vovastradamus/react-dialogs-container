import { createContext, createElement } from "react";
import { noop } from "./dialog.shared";
import { useDialogs } from "./dialog.hooks";

export const DialogContenxt = createContext({
  closeDialog: noop,
});

export const DialogsContext = createContext({
  modals: [],
  pushModal: noop,
  closeModalByID: noop,
});

export const DialogsProvider = (props) => {
  const { children } = props;
  const modalData = useDialogs();

  return createElement(
    DialogsContext.Provider,
    { value: { ...modalData } },
    children
  );
};
