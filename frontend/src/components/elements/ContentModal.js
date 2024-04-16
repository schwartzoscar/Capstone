import { useRef, useState, useCallback } from "react";
import { toast } from 'react-toastify';
import Modal2 from "./Modal2";
import Button from "./Button";

export default function PolicyModal(props) {
  return (
    <Modal2 show={props.show} setShow={props.setShow}>
        <h5></h5>
    </Modal2>
  );
}
