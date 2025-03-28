import React from 'react';
import Modal from 'react-modal';
import useModal from '../../hooks/useModal';


Modal.setAppElement('#root');

const ModalWrapper: React.FC = () => {
  const { modalState, closeModal } = useModal();

  if (!modalState) return null;

  const { component: Component, componentProps, confirmFunction, closeFunctionCustom } = modalState;

  const handleClose = () => {
    closeModal();
    if (closeFunctionCustom) closeFunctionCustom();
  };

  const handleConfirm = (result: unknown) => {
    if (confirmFunction) confirmFunction(result);
    closeModal();
  };
  
  return (
    <Modal 
      isOpen={true} 
      onRequestClose={handleClose} 
      contentLabel="Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.60)',
          backdropFilter: 'blur(3px)', // Overlay escuro
        },
        content: {
          width: '100%', // Tamanho dinâmico com base no conteúdo
          height:'auto',
          margin: '0 auto', // Centralizando o conteúdo
          backgroundColor: 'transparent', 
          padding: '0',
          border: 'none'
          
        },
      }}           
    >

      <div className="">
        <div className='container '>
        <Component {...(typeof componentProps === 'object' ? {...componentProps, handleClose } : {})} />
        </div>
      </div>
    </Modal>
  );
};

export default ModalWrapper;


