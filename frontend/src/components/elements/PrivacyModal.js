import { useRef, useState, useCallback } from "react";
import { toast } from 'react-toastify';
import Modal2 from "./Modal2";
import Button from "./Button";

export default function ContentModal(props) {
  return (
    <Modal2 show={props.show} setShow={props.setShow}>
              <br></br>
        <h3>How We Use Your Information</h3>
              <br></br>
          <h5>We may use the information we collect for various purposes, including:</h5>
            <h5>To provide and maintain the Site</h5>
            <h5>To communicate with you about your account or our services</h5>
            <h5>To personalize your experience on the Site</h5>
            <h5>To analyze how the Site is used and improve our services</h5>
            <h5>To comply with legal obligations</h5>
              <br></br>
        <h3>Information Sharing</h3>
              <br></br>
            <h5>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this Privacy Policy or as required by law.</h5>
              <br></br>
        <h3>Security</h3>
              <br></br> 
            <h5>We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.</h5>
              <br></br>

    </Modal2>
  );
}