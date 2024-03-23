import RBModal from 'react-bootstrap/Modal';
import Button from "./Button";

export default function Modal(props) {

  const closeModal = () => {
    props.setShow(false);
    if(props.hasOwnProperty('onClose')) props.onClose();
  }

  return(
    <div className="modal show d-block">
      <RBModal.Dialog show={props.show} onHide={closeModal}>
        <RBModal.Header closeButton>
          <RBModal.Title>{props.title}</RBModal.Title>
        </RBModal.Header>
        <RBModal.Body>
          {props.children}
        </RBModal.Body>
        <RBModal.Footer>
          <Button className="btn-secondary" onClick={closeModal}>onCancel</Button>
          <Button className="btn-primary" onClick={props.onSave}>Save</Button>
        </RBModal.Footer>
      </RBModal.Dialog>
    </div>
  );
}
