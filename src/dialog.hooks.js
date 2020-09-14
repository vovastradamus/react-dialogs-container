import { useState, useContext } from "react";
import { dialogIDGenerator } from "./dialog.shared";
import { DialogsContext, DialogContenxt } from "./dialog.contexts";

export const useDialogs = () => {
  const [modals, setModals] = useState([]);

  const pushModal = (component, props = {}) => {
    const newModal = {
      component,
      props,
      modalID: dialogIDGenerator(),
    };

    setModals((m) => [...m, newModal]);

    return newModal;
  };

  const closeModalByID = (modalID) => {
    setModals((m) => m.filter((modal) => modal.modalID !== modalID));
  };

  return {
    modals,
    pushModal,
    closeModalByID,
  };
};

export const useDialogsContainer = () => {
  const { pushModal, closeModalByID } = useContext(DialogsContext);

  return {
    pushModal,
    closeModalByID,
  };
};

export const useDialog = () => {
  const { closeDialog } = useContext(DialogContenxt);

  return {
    closeDialog,
  };
};
