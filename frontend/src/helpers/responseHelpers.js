import { toast } from "react-toastify";

export function handleResp(resp, onSuccess = data => {}, onError = null) {
  if(resp.data?.message === "OK") {
    onSuccess(resp.data);
  } else {
    onError ? onError() : toast.error("Something went wrong.");
  }
}
