import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loading from "../loading/Loading";
import "./LoginForm.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FlashMessage from "../flashMessage/FlashMessage";

function LoginForm({ login }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState(false);
  const [msg, setMsg] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    const status = await login(formData);
    setLoading(false);

    if (status.status === "success") {
      navigate("/");
    }
    if (status.status === "failed") {
      setFlashMessage(true);
      setMsg(status.err);
    }

    setFormData({ username: "", password: "" });
  };
  if (loading) return <Loading />;
  return (
    <div className="login-form">
      <h1>Login</h1>
      {flashMessage ? (
        <FlashMessage alertType={"danger"} message={msg} />
      ) : null}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="LoginForm.Username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            placeholder="myUsername"
            onChange={handleChange}
            type="text"
            name="username"
            value={formData.username}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="LoginForm.Password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            placeholder="my password"
            onChange={handleChange}
            type="password"
            name="password"
            value={formData.password}
            minLength="8"
            maxLength="20"
          />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
}

export default LoginForm;
