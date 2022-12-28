import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loading from "../loading/Loading";
import FlashMessage from "../flashMessage/FlashMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpForm.css";

function SignUpForm({ signup }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState(false);
  const [msg, setMsg] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
    const status = await signup(formData);
    setLoading(false);

    if (status.status === "success") {
      navigate("/");
    }
    if (status.status === "failed") {
      setFlashMessage(true);
      setMsg(status.err);
    }

    setFormData({ username: "", email: "", password: "" });
  };
  if (loading) return <Loading />;

  return (
    <div className="signup-form">
      <h1>Sign Up</h1>
      {flashMessage ? (
        <FlashMessage alertType={"warning"} message={msg} />
      ) : null}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="LoginForm.Username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={handleChange}
            placeholder="exampleUser"
            type="text"
            name="username"
            required
            value={formData.username}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            placeholder="writer@fic.com"
            onChange={handleChange}
            type="email"
            name="email"
            minLength="6"
            maxLength="60"
            value={formData.email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Password (must be at least 8 characters long)</Form.Label>
          <Form.Control
            required
            placeholder="Enter a password that is at least 8 characters long"
            onChange={handleChange}
            type="password"
            name="password"
            minLength="8"
            maxLength="20"
            value={formData.password}
          />
        </Form.Group>
        <Button type="submit">Sign Up</Button>
      </Form>
    </div>
  );
}

export default SignUpForm;
