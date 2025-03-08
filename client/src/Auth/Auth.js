import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
} from "react-bootstrap/esm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { signup, signin } from "../actions/auth.js";
import Alert from "../components/common/Alert/Alert";
import "./Auth.css";

function Auth({ isSignup, setIsSignup }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  const setAlertAndClearSpinner = (data) => {
    setAlert(data);
    setShowSpinner(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShowSpinner(true);

    let { firstName, lastName, email, password, confirmPassword } = formData;

    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    if (!firstName || !lastName || !email || !password || !confirmPassword)
      return setAlertAndClearSpinner("Please fill in all fields");
    if (password !== confirmPassword)
      return setAlertAndClearSpinner("Passwords must match");
    if (!email.includes("@") || !email.includes("."))
      return setAlertAndClearSpinner("Please use valid email address");

    dispatch(
      signup(
        {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          name: `${firstName} ${lastName}`,
        },
        navigate,
        setError,
        setShowSpinner,
      ),
    );
  };

  const handleSignin = async (e) => {
    setShowSpinner(true);

    e.preventDefault();

    let { email, password } = formData;

    email = email.trim();
    password = password.trim();

    if (!formData.email || !formData.password)
      return setAlertAndClearSpinner("Please fill in both fields");
    if (!formData.email.includes("@") || !formData.email.includes("."))
      return setAlertAndClearSpinner("Please use valid email address");
    dispatch(signin({ email, password }, navigate, setError, setShowSpinner));
  };

  return (
    <div className="Auth animate-grow-in">
      <Row>
        <Col xs={12}>
          <h3 className="Auth__title">{isSignup ? "Sign Up" : "Sign In"}</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {isSignup ? (
            <>
              <Form className="main-form">
                <Form.Group className="mb-10">
                  <Form.Control
                    type="name"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-10">
                  <Form.Control
                    type="name"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-10">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value.toLowerCase(),
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-10">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Form>
              <Row className="switch-form-btn-container">
                <Col xs={12}>
                  <Button
                    className="full-width-btn Auth__submit-btn"
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="switch-form-btn-container mb-10">
                  <span className="switch-form-label">
                    Already have an account?
                  </span>
                  <a
                    className="switch-form-btn"
                    onClick={() => setIsSignup(false)}
                  >
                    Sign In
                  </a>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Form className="main-form">
                <Form.Group className="mb-10">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value.toLowerCase(),
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </Form.Group>
              </Form>
              <Row>
                <Col>
                  <Button className="full-width-btn" onClick={handleSignin}>
                    Sign In
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col className="switch-form-btn-container mb-10">
                  <span />
                  <span className="switch-form-label">
                    Don't have an account?
                  </span>
                  <a
                    className="switch-form-btn"
                    onClick={() => setIsSignup(true)}
                  >
                    Sign Up
                  </a>
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {showSpinner && (
            <Spinner
              animation="border"
              variant="primary"
              style={{ marginRight: "auto" }}
            />
          )}
          <Alert
            variant="danger"
            content={error}
            onClose={() => setError("")}
          />
          <Alert
            variant="warning"
            content={alert}
            onClose={() => setAlert("")}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Auth;
