import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export const AlertMessage: React.FC<AlertMessageProps> = (
  props: AlertMessageProps
) => {
  return (
    <ToastContainer  className="alert">
      <Toast show={props.show} bg={props.bg} onClose={props.toggleShow}>
        <Toast.Header>
          
          <strong className="me-auto">{props.title}</strong>
        </Toast.Header>
        <Toast.Body>{props.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

interface AlertMessageProps {
  title: string;
  message: string;
  show: boolean;
  bg: string;
  toggleShow: () => void;
}
