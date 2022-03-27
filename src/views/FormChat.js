import React, { useState } from "react";
import { Button, Row, Col, Image } from "react-bootstrap";
import { chatContactApi } from "../api/chatContactApi";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FormChat.css";
import "./responsiveFormChat.css";

// COMPONENTS
import FormPersonalInfo from "../components/Forms/FormPersonalInfo";
import FormContactData from "../components/Forms/FormContactData";
import FormDateBirth from "../components/Forms/FormDateBirth";

const FormChat = () => {
  const [loanding, setLoanding] = useState(false);
  const [name, setName] = useState("");
  const [secondName, setsecondName] = useState("");
  const [lastName, setlastName] = useState("");
  const [lastName2, setlastName2] = useState("");
  const [flagfullName, setflagfullName] = useState(false);
  const infoData = {
    name,
    secondName,
    lastName,
    lastName2,
  };

  const validateFormInfoData = (flag, data) => {
    setName(data.name);
    setsecondName(data.secondName);
    setlastName(data.lastName);
    setlastName2(data.lastName2);
    setflagfullName(true);
  };

  // BIRTHDATE
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [flagdateBirth, setflagdateBirth] = useState(false);
  const [dateString, setDateString] = useState("");
  const dateBirth = {
    year,
    month,
    day,
  };
  const validateFormBirthDate = (flag, data) => {
    setYear(data.year);
    setMonth(data.month);
    setDay(data.day);
    setflagdateBirth(true);
    const event = new Date(Date.UTC(data.year, data.month, data.day));
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };
    setDateString(event.toLocaleDateString(undefined, options));
  };

  // DATA CONTACT
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [flagDataContact, setflagDataContact] = useState(false);
  const contactData = {
    email,
    telefono,
  };
  const validateFormContactData = (flag, data) => {
    setEmail(data.email);
    setTelefono(data.telefono);
    setflagDataContact(true);
  };

  // INSERT DATA
  const insertInfoContact = async () => {
    try {
      setLoanding(true);
      const postData = {
        firstName: name,
        lastNameP: lastName,
        lastNameM: lastName2,
        birthdate: `${year}-${month}-${day}`,
        email,
        tel: telefono,
      };
      const response = await chatContactApi.post("/api/users", postData);
      if (response.data.response) {
        setLoanding(false);
        await Swal.fire({
          title: "Excelente!",
          text: "Datos registrados",
          icon: "success",
          confirmButtonText: "Ok",
        });
        window.location.reload(false);
      } else {
        setLoanding(false);
        await Swal.fire({
          title: "Algo salio mal!",
          text: "Intentalo más tarde",
          icon: "warning",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      setLoanding(false);
      await Swal.fire({
        title: "Algo salio mal!",
        text: "Intentalo más tarde",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <main className="d-flex justify-content-center align-items-center my-4">
      <div
        id="form"
        className="mx-auto shadow bg-body rounded border-radius py-4 px-3"
      >
        {loanding && (
          <div class="block_page">
            <div class="spinner-border text-pink" role="status">
              <span class="sr-only"></span>
            </div>
          </div>
        )}
        <Row className="mb-4 justify-content-end">
          <Col xs={3}>
            <div className="position-relative">
              <Image className="image-wraper" src="/images/user_chat.jpg" />
              <div className="label-icon"></div>
            </div>
          </Col>
          <Col xs={9}>
            <FormPersonalInfo
              inputs={infoData}
              validate={validateFormInfoData}
            />
          </Col>
          {flagfullName && (
            <Col xs={10}>
              <div className="card-info">
                {`${infoData.name} ${infoData.secondName} ${infoData.lastName} ${infoData.lastName2}`}
              </div>
            </Col>
          )}
        </Row>
        {flagfullName && (
          <Row className="mb-4 justify-content-end">
            <Col xs={3}>
              <div className="position-relative">
                <Image className="image-wraper" src="/images/user_chat.jpg" />
                <div className="label-icon"></div>
              </div>
            </Col>
            <Col xs={9}>
              <FormDateBirth
                inputs={dateBirth}
                validate={validateFormBirthDate}
              />
            </Col>
            {flagdateBirth && (
              <Col xs={10}>
                <div className="card-info">{`${dateString}`}</div>
              </Col>
            )}
          </Row>
        )}
        {flagdateBirth && (
          <Row className="mb-4 justify-content-end">
            <Col xs={3}>
              <div className="position-relative">
                <Image className="image-wraper" src="/images/user_chat.jpg" />
                <div className="label-icon"></div>
              </div>
            </Col>
            <Col xs={9}>
              <FormContactData
                inputs={contactData}
                validate={validateFormContactData}
              />
            </Col>
            {flagDataContact && (
              <Col xs={10}>
                <div className="card-info">
                  <p>Correo electrónico: {email}</p>
                  <p>Teléfono celular: {telefono}</p>
                </div>
              </Col>
            )}
          </Row>
        )}
        {flagDataContact && (
          <Button
            variant="primary"
            id="button-submit"
            onClick={insertInfoContact}
            className="d-block btn-pink btn-block"
          >
            Iniciar
          </Button>
        )}
      </div>
    </main>
  );
};

export default FormChat;
