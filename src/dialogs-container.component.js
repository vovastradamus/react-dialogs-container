import React, { useContext, createElement } from "react";
import { DialogContenxt, DialogsContext } from "./dialog.contexts";

const DialogWrapper = (props) => {
  const {
    component: Component,
    props: componentProps,
    modalID,
    closeModalByID,
  } = props;
  const closeDialog = React.useCallback(() => closeModalByID(modalID), [
    modalID,
    closeModalByID,
  ]);

  return createElement(
    DialogContenxt.Provider,
    {
      key: modalID,
      value: {
        closeDialog,
      },
    },
    createElement(Component, {
      closeDialog: closeDialog,
      ...componentProps,
    })
  );
};

export const DialogsContainer = () => {
  const { modals, closeModalByID } = useContext(DialogsContext);

  const modalsView = modals.map((dialogProps) =>
    createElement(DialogWrapper, {
      key: dialogProps.modalID,
      closeModalByID,
      ...dialogProps,
    })
  );

  return modalsView;
};
