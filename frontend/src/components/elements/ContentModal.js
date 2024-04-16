import { useRef, useState, useCallback } from "react";
import { toast } from 'react-toastify';
import Modal2 from "./Modal2";
import Button from "./Button";

export default function ContentModal(props) {
  return (
    <Modal2 show={props.show} setShow={props.setShow}>
        <h5>General Guidelines
            Respectful Communication: All users must engage respectfully with others, avoiding language that is harmful, threatening, or offensive. Harassment, bullying, and hate speech are strictly prohibited.

            Authenticity: We encourage users to share content that is genuine and original. Impersonation, misleading information, or any form of intellectual property theft will not be tolerated.

            Safety: Content promoting dangerous or illegal activities, including but not limited to physical harm, fraud, or illegal substance abuse, is forbidden.

            Privacy: Users must respect the privacy of others and should not share personal information about someone without their explicit consent.

            Intellectual Property: Users should only post content for which they own the rights, or for which they have obtained necessary permissions. Copyrighted material must not be used without authorization from the copyright owner.

            Content Restrictions
            No posting of copyrighted material unless you have the legal right to do so.
            No posting of content that involves nudity, sexual acts, or exploits minors in any way.
            No posting of content that promotes or incites violence against individuals or groups based on race, ethnicity, religion, gender, sexual preference, disability, or any other characteristic.
            No posting of content that supports or glorifies hate groups.
            Enforcement and Reporting
            We reserve the right to remove any content that violates these guidelines and to suspend or terminate accounts involved in severe or repeated offenses.</h5>
    </Modal2>
  );
}
