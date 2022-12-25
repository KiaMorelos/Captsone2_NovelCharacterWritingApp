import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loading from "../loading/Loading";
import "./LoginForm.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ login }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

    if (status.message === "success") {
      navigate("/");
    }

    setFormData({ username: "", password: "" });
  };
  if (loading) return <Loading />;
  return (
    <div className="login-form">
      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="LoginForm.Username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
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
            onChange={handleChange}
            type="password"
            name="password"
            value={formData.password}
          />
        </Form.Group>
        <Button type="submit">login</Button>
      </Form>
    </div>
  );
}

export default LoginForm;
