import { toast } from "react-toastify";

export function handleResp(resp, onSuccess = data => {}, onError = errors => {}) {
  if(resp.data?.message === "OK") {
    onSuccess(resp.data);
  } else {
    onError ? onError(resp.data?.errors ?? []) : toast.error("Something went wrong.");
  }
}
