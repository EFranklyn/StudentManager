import { useState } from 'react';
import Swal from 'sweetalert2';

type AlertType = 'success' | 'error' | 'warning' | 'info';


const useSweetAlert = () => {
  const [result, setResult] = useState<boolean | null>(null);
  const isDarkTheme = () => {
    return document.documentElement.getAttribute('data-bs-theme') === 'dark';
  };

  const getBackgroundColor = () => {
    return isDarkTheme() ? '#343a40' : '#ffffff';
  };

  const getTextColor = () => {
    return isDarkTheme() ? '#f8f9fa' : '#212529';
  };

  const showAlert = async (message: string, type: AlertType = 'info') => {
    const swalResult = await Swal.fire({
      title: 'Atenção!',
      text: message,
      icon: type,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      background: getBackgroundColor(),
      color: getTextColor(),
      customClass: {
        confirmButton: 'btn btn-primary fw-bold', 
        cancelButton: 'btn btn-danger text-white fw-bold',
        actions: 'd-flex col-8 justify-content-between'
      }
    });

    setResult(swalResult.isConfirmed);
    return swalResult.isConfirmed;
  };


  const showToast = (message: string, type: AlertType = 'info') => {
    const bgColor = {
      'success': 'success',
      'error': 'danger',
      'warning': 'warning',
      'info': 'info'
    }
    Swal.fire({
      toast: true,
      position: 'top',
      icon: type, 
      title: message, 
      showConfirmButton: false, 
      timer: 7000, 
      timerProgressBar: true,
      customClass: {
        popup: `d-flex align-items-center bg-${bgColor[type]}`,
        title: `text-white me-2`,
      },
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer); 
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
  };

  return {
    result,
    showAlert,
    showToast
  };
};

export default useSweetAlert;