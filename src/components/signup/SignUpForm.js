import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loading from "../loading/Loading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm({ signup }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

    if (status.message === "success") {
      navigate("/");
    }

    setFormData({ username: "", email: "", password: "" });
  };
  if (loading) return <Loading />;

  return (
    <>
      <h1>Sign Up</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="LoginForm.Username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            name="username"
            value={formData.username}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="email"
            name="email"
            value={formData.email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="password"
            name="password"
            value={formData.password}
          />
        </Form.Group>
        <Button type="submit">login</Button>
      </Form>
    </>
  );
}

export default SignUpForm;
