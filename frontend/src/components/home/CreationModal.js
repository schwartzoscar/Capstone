import { useNavigate } from "react-router-dom";
import Modal from "../elements/Modal";

export default function CreationModal(props) {

  const { show, setShow } = props;
  const navigate = useNavigate();

  const createBlog = () => {
    navigate('/blog/new');
    setShow(false);
  }

  const createForum = () => {
    navigate('/forum/new');
    setShow(false);
  }

  return(
    <Modal title="Create a new..." size="lg" show={show} setShow={setShow} hideFooter={true}>
      <div className="d-flex g-20">
        <div className="creation-modal-btn creation-modal-btn-one" onClick={createBlog}>
          <h2>Blog</h2>
          <span className="fas fa-pen-to-square"/>
          <p>Post your thoughts to the world with a blog!</p>
        </div>
        <div className="creation-modal-btn creation-modal-btn-two" onClick={createForum}>
          <h2>Forum</h2>
          <span className="fas fa-users-between-lines"/>
          <p>Start the discussion with a dedication forum!</p>
        </div>
      </div>
    </Modal>
  );
}
