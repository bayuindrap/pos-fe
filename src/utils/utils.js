
import Swal from 'sweetalert2';
import loadgif from '../assets/images/loading.gif'
import { CImage } from '@coreui/react';



// function toast(icon, title) {
//   const Toast = Swal.mixin({
//     toast: true,
//     position: "top",
//     showConfirmButton: false,
//     timer: 3000,
//     timerProgressBar: false,
//     didOpen: (toast) => {
//       toast.onmouseenter = Swal.stopTimer;
//       toast.onmouseleave = Swal.resumeTimer;
//     }
//   });

//   Toast.fire({
//     icon,
//     title
//   });
// }

function toast(icon, title) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    customClass: {
      popup: 'flexible-toast'
    }
  });
  Toast.fire({
    icon,
    title,
    html: `
      <style>
        .flexible-toast {
          max-width: 400px;
          min-width: 200px;
          width: auto !important;
          height: auto !important;
          min-height: 50px;
          font-size: 0.9em !important;
          padding: 10px 20px;
        }
        .flexible-toast .swal2-html-container {
          margin: 0 !important;
        }
        .flexible-toast .swal2-title {
          margin: 0 0 0 10px;
          padding: 0;
          display: flex;
          align-items: center;
        }
      </style>
    `
  });
}

function formattedDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}

function formattedDate2(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const formattedDate = `${day}-${month}-${year} - ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

const formatDateTime = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

function formatCurrency(amount) {
  const formattedAmount = amount.toLocaleString('id-ID');
  return `Rp. ${formattedAmount}`;
}


function renderLoading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "200px",
      }}
    >
      <CImage
        src={loadgif}
        alt="Loading"
        style={{ width: "65px", height: "65px" }}
      />
      <p>Loading...</p>
    </div>
  );
}



export {toast, formattedDate, renderLoading, formattedDate2, formatDateTime, formatCurrency};
