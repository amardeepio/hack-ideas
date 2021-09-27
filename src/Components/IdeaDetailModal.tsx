import { Modal, Button, Form } from "react-bootstrap";
import React from "react";
import { FieldProps, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { FormFields, IdeaDetailModalProps } from "../interfaces/form";
import { saveData, updateData } from "../functions";
import { useLocalStorage } from "../hooks/useLocalStorage";
const initialValues: FormFields = {
  title: "",
  description: "",
  tags: "",
};

export const IdeaDetailModal: React.FC<IdeaDetailModalProps> = (
  props: IdeaDetailModalProps
) => {
  const { show, toggleModal, title, data, id } = props;
  const [user, setUser] = useLocalStorage("user", "");
  const handleFormSubmit = async (values: FormFields) => {
    if (id) {
      await updateData(id, {
        ...values,
        tags: values.tags.split(","),
      });
      toggleModal();
    } else {
      await saveData({
        ...values,
        createdAt: new Date(),
        upvotes: 0,
        tags: values.tags.split(","),
        userId: user,
      });
      toggleModal();
    }
  };

  return (
    <Modal show={show} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={data || initialValues}
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
              <Button variant="primary" onClick={() => formik.handleSubmit()}>
                Save Changes
              </Button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </Modal>
  );
};
