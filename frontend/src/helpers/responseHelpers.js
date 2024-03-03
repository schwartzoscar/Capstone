import { toast } from 'react-toastify';

export function handleResp(resp, onSuccess = data => {}, onError = () => {}) {
  if(resp.message === "Success") {
    onSuccess(resp.data);
  } else {
    toast.error("Something went wrong.");
    onError();
  }
}
