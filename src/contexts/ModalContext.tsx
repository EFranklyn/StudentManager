
import React, { createContext, useState, ReactNode } from 'react';

interface ModalProps<T> {
  component: React.FC<T>; 
  componentProps: T;      
  confirmFunction?: (result: T) => void; 
  closeFunctionCustom?: () => void;
  handleClose: () => void;
}

interface ModalContextType {
  openModal: <T>(props: ModalProps<T>) => Promise<T | undefined>;
  closeModal: () => void;
  modalState: ModalProps<unknown> | null; 
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modalState, setModalState] = useState<ModalProps<any> | null>(null);

  const openModal = <T,>(props: ModalProps<T>): Promise<T | undefined> => {
    return new Promise<T | undefined>((resolve) => {
      setModalState({
        ...props,
        confirmFunction: (result: T) => {
          resolve(result);
        },
      });
    });
  };

  const closeModal = () => {
    setModalState(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalState }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
export type {ModalProps}