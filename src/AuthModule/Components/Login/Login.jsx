/** @format */

import { Col, Container, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

import Form from "react-bootstrap/Form";
import {
  faLock,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";

import logo from "../../../assets/images/authLogo.png";

const Login = () => {
  return (
    <Container fluid className="auth-container">
      <Row className="bg-overlay vh-100 justify-content-center align-items-center ">
        <Col md={6} className="">
          <div className="form-box p-4 rounded">
            <div className="logo-box  ">
              <img className="w-50 " src={logo} alt="" />
            </div>

            <h2>Login</h2>
            <p className="text-muted ">
              Welcome Back! Please enter your details
            </p>
            <Form>
              <InputGroup className="mb-3" size="md">
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faMobileScreenButton} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <InputGroup className="mb-2" size="md">
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faLock} />{" "}
                </InputGroup.Text>
                <Form.Control
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <div className="d-flex justify-content-between mb-4">
                <span>Register Now?</span>
                <span className="text-green  ">Forgot Password?</span>
              </div>
              <div className="d-grid gap-2 my-2">
                <Button variant="success" size="md">
                  <span>Login</span>
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
