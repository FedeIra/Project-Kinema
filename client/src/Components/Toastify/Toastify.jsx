import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export function ToastifyMessage(message, type){
    Toastify({
        text: message,
        duration: type === "success" ? 2000 : 2000,
        close: true,
        className: "info",
        offset: {
            y: 70
          },
        gravity: "bottom", 
        position: "center", 
        style: {
          background: type === "success" ?  "green" :  "red",
          borderRadius: "10px",
          width: "max-content"
          
        }
      }).showToast();
}
