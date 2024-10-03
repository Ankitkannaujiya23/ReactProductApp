import Swal from 'sweetalert2'

const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  export default toast;

//   Toast.fire({
//     icon: "success",
//     title: "Signed in successfully"
//   });

export const showToast = (data) => {
  const { message, isSuccess } = data;
  toast.fire({
    icon: isSuccess? "success": "error",
    title: message
  });

}