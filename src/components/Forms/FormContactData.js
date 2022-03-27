import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineSend } from "react-icons/ai";

const FormContactData = (props) => {
  const [validated, setValidated] = useState(false);
  const [btnSubmit, setbtnSubmit] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }else{
      props.validate(true, props.inputs);
      setbtnSubmit(true);
    }
    setValidated(true);
  };
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <h4 className="mb-3">Datos de contacto</h4>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Control
          type="email"
          placeholder="Correo electrónico*"
          onChange={(e) => {
            props.inputs.email = e.target.value;
          }}
        />
        <Form.Control.Feedback type="invalid">
          Porfavor ingresa tu email
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formTel">
        <Form.Control
          type="tel"
          placeholder="Teléfono celular"
          onChange={(e) => {
            props.inputs.telefono = e.target.value;
          }}
        />
      </Form.Group>
      {!btnSubmit && (
      <Button type="submit" className="d-block btn-icon btn-light btn-pink">
        <AiOutlineSend />
      </Button>
      )}
    </Form>
  );
};

export default FormContactData;
