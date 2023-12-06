/** @format */

// import RecipesTable from "./RecipesTable";
import noData from "../assets/images/nodata.png";

import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const DeleteModal = (props) => {
  return (
    <>
      <div className="delete-item ">
        <Modal
          show={props.show === "modal-delete"}
          onHide={props.handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            {/* <Modal.Title>Delete Category</Modal.Title> */}
          </Modal.Header>
          <Form
          //   onSubmit={handleSubmit(handleDeleteCategory)}
          >
            <Modal.Body>
              <div className="text-center">
                <img src={noData} alt="Delete Category" />
                <p className="fs-2 fw-bold">Delete This Category</p>
                <p className="text-muted ">
                  are you sure you want to delete this item ? if you are sure
                  just click on delete it
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-danger"
                type="submit"
                // onClick={handleDeleteCategory}
              >
                Delete This Item
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default DeleteModal;
