import Toastify from 'toastify-js';

export default function showToast(message: string, error: boolean) {
  const toastColor = error
    ? 'linear-gradient(to right, #da5e5e, #ff0400)'
    : 'linear-gradient(to right, #00b09b, #3a5f25)';

  Toastify({
    text: message,
    duration: 3000,
    gravity: 'top', // `top` or `bottom`
    position: 'left', // `left`, `center` or `right`
    offset: {
      x: '0',
      y: '10vh',
    },
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: toastColor,
      position: 'fixed',
      width: 'fit-content',
      padding: '20px',
      right: '50px',
    },
  }).showToast();
}
