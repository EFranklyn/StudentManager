import React from "react";
import Modal from "react-modal";
import useModal from "../../hooks/useModal";

Modal.setAppElement("#root");

const ModalWrapper: React.FC = () => {
  const { modalState, closeModal } = useModal() as {
    modalState: {
      component: React.ComponentType<{ handleClose?: () => void }>;
      componentProps?: Record<string, unknown>;
      closeFunctionCustom?: () => void;
    };
    closeModal: () => void;
  };

  if (!modalState) return null;

  const {
    component: Component,
    componentProps,
    closeFunctionCustom,
  }: {
    component: React.ComponentType<{ handleClose?: () => void }>;
    componentProps?: Record<string, unknown>;
    closeFunctionCustom?: () => void;
  } = modalState;

  const handleClose = () => {
    closeModal();
    if (closeFunctionCustom) closeFunctionCustom();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={handleClose}
      contentLabel="Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.60)",
          backdropFilter: "blur(3px)",
          overflow: "hidden",
        },

        content: {
          height: "auto",
          backgroundColor: "transparent",
          padding: "0",
          border: "none",
        },
      }}
    >
      <div
        className="d-flex justify-content-center align-items-center m-0 p-0"
        style={{ overflow: "hidden" }}
      >
        <div>
          <Component
            {...(typeof componentProps === "object"
              ? { ...componentProps, handleClose }
              : {})}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalWrapper;
