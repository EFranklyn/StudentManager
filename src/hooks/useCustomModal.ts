import useModal from './useModal';
interface CustomModalOptions<T> {
  component: React.FC<T>;
  componentProps?: T;
  confirmFunction?: (result: T) => void;
}

const useCustomModal = () => {
  const { openModal } = useModal();

  const openCustomModal = async <T>(options: CustomModalOptions<T>): Promise<T | undefined> => {
    const result = await openModal<T>({
      component: options.component,
      componentProps: options.componentProps ?? ({} as T),
      confirmFunction: options.confirmFunction,
      handleClose: () => {},
    });

    return result;
  };

  return {
    openCustomModal,
  };
};

export default useCustomModal;