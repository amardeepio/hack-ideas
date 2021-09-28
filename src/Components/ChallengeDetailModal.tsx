import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormFields, ChallengeDetailModalProps } from "../interfaces/form";
import { saveData, updateData } from "../functions";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AlertMessage } from "./AlertMessage";

export const ChallengeDetailModal: React.FC<ChallengeDetailModalProps> = (
  props: ChallengeDetailModalProps
) => {
  const { show, toggleModal, title, data, id, updateList } = props;
  const [showAlert, setShowAlert] = useState(false);
  const initialValues: FormFields = {
    title: data?.title || "",
    description: data?.description || "",
    tags: data?.tags.join(",") || "",
  };
  const [user] = useLocalStorage("user", "");
  const handleFormSubmit = async (values: FormFields) => {
    
    setShowAlert(true);
    if (id) {
      await updateData(id, {
        ...values,
        tags: values.tags.split(","),
      });
      toggleModal();
      setShowAlert(false)
      updateList && updateList();
    } else {
      await saveData({
        ...values,
        createdAt: new Date(),
        upvotes: 0,
        tags: values.tags.split(","),
        userId: user,
      });
      toggleModal();
      window.location.reload();
    }
  };

  const isDisabled = () => {
    if (id && data?.userId !== user) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Modal show={show} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            title: Yup.string()
              .min(3, "Must be 3 characters or more")
              .required("Add a title for your idea"),
            description: Yup.string()
              .min(20, "Must be 20 characters or more")
              .required("Provide a description for your idea"),
            tags: Yup.string(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            handleFormSubmit(values);
          }}
          enableReinitialize
        >
          {(formik) => (
            <>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="titleElement">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      {...formik.getFieldProps("title")}
                      placeholder="What's on your mind?"
                      disabled={isDisabled()}
                    />

                    {formik.touched.title && formik.errors.title ? (
                      <Form.Text className="text-danger">
                        {formik.errors.title}
                      </Form.Text>
                    ) : null}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="descriptionElement">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      {...formik.getFieldProps("description")}
                      placeholder="Describe your idea"
                      as="textarea"
                      rows={3}
                      disabled={isDisabled()}
                    />

                    {formik.touched.description && formik.errors.description ? (
                      <Form.Text className="text-danger">
                        {formik.errors.description}
                      </Form.Text>
                    ) : null}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="tagsElement">
                    <Form.Label>Tags</Form.Label>
                    <Form.Control
                      {...formik.getFieldProps("tags")}
                      placeholder="Add multiple tags seperated by commas"
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={toggleModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => formik.handleSubmit()} disabled={showAlert}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </>
          )}
        </Formik>
      </Modal>
      <AlertMessage
        title="Success"
        message="Challenge detail Saved"
        bg="success"
        show={showAlert}
        toggleShow={() => setShowAlert(!showAlert)}
      />
    </>
  );
};
