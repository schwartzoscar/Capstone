import RBModal from 'react-bootstrap/Modal';
import Button from "./Button";

export default function Modal(props) {

  const closeModal = () => {
    props.setShow(false);
    if(props.hasOwnProperty('onClose')) props.onClose();
  }

  return(
    <RBModal show={props.show} onHide={closeModal} size={props.size ?? "lg"}>
      <RBModal.Header closeButton>
        <RBModal.Title>{props.title}</RBModal.Title>
      </RBModal.Header>
      <RBModal.Body>
        {props.children}
      </RBModal.Body>
      <RBModal.Footer>
        <Button className="btn-secondary" onClick={closeModal} {...props.closeBtnProps}>Close</Button>
        {props.onSave && <Button className="btn-primary" onClick={props.onSave} {...props.saveBtnProps}>Save</Button>}
      </RBModal.Footer>
    </RBModal>
  );
}
