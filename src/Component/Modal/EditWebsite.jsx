import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { toast } from "react-toastify";
import { customErrorHandler } from "../../Utils/helper";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const EditWebsite = ({ ID, webName, show, setShow }) => {
  const auth = useAuth();

  const [name, setName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (show) {
      setName("");
    }
  }, [show]);

  const handleSubmit = () => {
    const data = { websiteName: name };
    AccountService.EditWebsite(data, ID, auth.user)
      .then((response) => {
        toast.success(response.data.message);
        handleClose();
      })
      .catch((error) => {
        toast.error(customErrorHandler(error));
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Provide New Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Present Name</Form.Label>
              <Form.Control
                type="text"
                value={webName}
                disabled
                className="font-weight-bold"
                style={{ fontSize: "15px" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Edit By</Form.Label>
              <Form.Control
                type="text"
                value={auth.user.userName}
                disabled
                className="font-weight-bold"
                style={{ fontSize: "15px" }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>New Website Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Enter new website name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Change
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditWebsite;
