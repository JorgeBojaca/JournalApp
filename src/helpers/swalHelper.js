import Swal from 'sweetalert2';

export const swalLoader = (title) => {
  Swal.fire({
    title: title,
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
  });
};

export const swalClose = () => {
  Swal.close();
};
