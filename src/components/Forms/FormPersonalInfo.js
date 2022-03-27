import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineSend } from "react-icons/ai";

const FormPersonalInfo = (props) => {
  const [validated, setValidated] = useState(false);
  const [btnSubmit, setbtnSubmit] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      props.validate(true, props.inputs);
      setbtnSubmit(true);
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <h4 className="mb-3">¿Cuál es tu nombre?</h4>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Control
          required
          type="text"
          placeholder="Nombre*"
          onChange={(e) => {
            props.inputs.name = e.target.value;
          }}
        />
        <Form.Control.Feedback type="invalid">
          Porfavor ingresa tu nombre
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formSecondName">
        <Form.Control
          type="text"
          placeholder="Segundo Nombre"
          onChange={(e) => {
            props.inputs.secondName = e.target.value;
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formFirstName">
        <Form.Control
          type="text"
          placeholder="Apellido paterno*"
          required
          onChange={(e) => {
            props.inputs.lastName = e.target.value;
          }}
        />
        <Form.Control.Feedback type="invalid">
          Porfavor ingresa tu apellido
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLastNa,e">
        <Form.Control
          type="text"
          placeholder="Apellido materno"
          onChange={(e) => {
            props.inputs.lastName2 = e.target.value;
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

export default FormPersonalInfo;
