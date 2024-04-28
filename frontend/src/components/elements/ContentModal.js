import Modal from "./Modal";

export default function ContentModal(props) {
  return (
    <Modal show={props.show} setShow={props.setShow}>
                <br></br>
        <h3>General Guidelines</h3>
                <br></br>
            <h5>Respectful Communication: All users must engage respectfully with others, avoiding language that is harmful, threatening, or offensive. Harassment, bullying, and hate speech are strictly prohibited.</h5>
            <h5>Authenticity: We encourage users to share content that is genuine and original. Impersonation, misleading information, or any form of intellectual property theft will not be tolerated.</h5>
            <h5>Safety: Content promoting dangerous or illegal activities, including but not limited to physical harm, fraud, or illegal substance abuse, is forbidden.</h5>
            <h5>Privacy: Users must respect the privacy of others and should not share personal information about someone without their explicit consent.</h5>
            <h5>Intellectual Property: Users should only post content for which they own the rights, or for which they have obtained necessary permissions. Copyrighted material must not be used without authorization from the copyright owner.</h5>
                <br></br>
        <h3>Content Restrictions</h3>
                <br></br>
            <h5>No posting of copyrighted material unless you have the legal right to do so.</h5>
            <h5>No posting of content that involves nudity, sexual acts, or exploits minors in any way.</h5>
            <h5>No posting of content that promotes or incites violence against individuals or groups based on race, ethnicity, religion, gender, sexual preference, disability, or any other characteristic.</h5>
            <h5>No posting of content that supports or glorifies hate groups.</h5>
                <br></br>
        <h3>Enforcement and Reporting</h3>
                <br></br>
            <h5>We reserve the right to remove any content that violates these guidelines and to suspend or terminate accounts involved in severe or repeated offenses.</h5>
    </Modal>
  );
}
