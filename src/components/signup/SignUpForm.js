import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm({ signup }) {
  const navigate = useNavigate();
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
    const status = await signup(formData);
    if (status.message === "success") {
      setTimeout(() => {
        navigate("/");
      }, 500);
    }

    setFormData({ username: "", password: "" });
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>username</label>
          <input
            onChange={handleChange}
            type="text"
            name="username"
            value={formData.username}
          />
        </div>
        <div>
          <label>email</label>
          <input
            onChange={handleChange}
            type="text"
            name="email"
            value={formData.email}
          />
        </div>
        <div>
          <label>password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={formData.password}
          />
        </div>
        <button>sign up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
