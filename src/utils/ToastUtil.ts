import { toast, ToastContent } from 'react-toastify';

class ToastUtilsClass {
  constructor() {
    toast.configure({ draggable: false, closeButton: false, hideProgressBar: true });
  }
  error(content: ToastContent) {
    toast.error(content);
  }
}
export default new ToastUtilsClass();
