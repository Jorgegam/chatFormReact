import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { AiOutlineSend } from "react-icons/ai";

const FormDateBirth = (props) => {
  const [validated, setValidated] = useState(false);
  const [btnSubmit, setbtnSubmit] = useState(false);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const [days, setDays] = useState([]);
  const years = [];

  for (let index = 0; index < 100; index++) {
    years.push(currentYear - index);
  }
  const months = [
    { label: "Enero", value: 0 },
    { label: "Febrero", value: 1 },
    { label: "Marzo", value: 2 },
    { label: "Abril", value: 3 },
    { label: "Mayo", value: 4 },
    { label: "Junio", value: 5 },
    { label: "Julio", value: 6 },
    { label: "Agosto", value: 7 },
    { label: "Septiembre", value: 8 },
    { label: "Octubre", value: 9 },
    { label: "Noviembre", value: 10 },
    { label: "Diciembre", value: 11 },
  ];

  const getNumberOfDays = (month, year) => {
    let number = new Date(year, month, 0).getDate();
    let daysAux = [];
    for (let index = 0; index < number; index++) {
      daysAux.push({
        value: index + 1,
        label: index + 1,
      });
    }
    console.log(year, month);
    setDays(daysAux);
  };

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
      <h4 className="mb-3">¿Cuál es tu fecha de nacimiento?</h4>
      <Form.Group className="mb-3">
        <Form.Select
          aria-label="Año"
          disabled={btnSubmit}
          required
          onChange={(e) => {
            props.inputs.year = e.target.value;
          }}
        >
          <option value="" selected={true} disabled>Año</option>
          {years.map((year, i) => {
            return <option value={year} key={i}>{year}</option>
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Select
          aria-label="Mes"
          disabled={btnSubmit}
          required
          onChange={(e) => {
            props.inputs.month = e.target.value;
            getNumberOfDays(props.inputs.month, props.inputs.year);
          }}
        >
          <option value="" selected={true} disabled>Mes</option>
          {months.map((month, i) => {
            return <option value={month.value} key={i}>{month.label}</option>
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Select
          aria-label="Día"
          disabled={btnSubmit}
          required
          onChange={(e) => {
            props.inputs.day = e.target.value;
          }}
        >
          <option value="" selected={true} disabled>Día</option>
          {days.map((day, i) => {
            return <option value={day.value} key={i}>{day.label}</option>
          })}
        </Form.Select>
      </Form.Group>
      {!btnSubmit && (
      <Button type="submit" className="d-block btn-icon btn-light btn-pink">
        <AiOutlineSend />
      </Button>
      )}
    </Form>
  );
};
// getNumberOfDays(month,year);
export default FormDateBirth;
