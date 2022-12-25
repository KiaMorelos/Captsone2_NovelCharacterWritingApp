import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAstronaut,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { WritingAPI } from "../../api/writingApi";
import AuthContext from "../context/AuthContext";
import Loading from "../loading/Loading";
import "./ProfileForm.css";

function ProfileForm() {
  const { activeUser } = useContext(AuthContext);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    newPassword: "",
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
    try {
      setLoading(true);
      if (!formData.newPassword) formData.newPassword = formData.password;
      const res = await WritingAPI.updateUser(activeUser.userId, formData);
      setStatus(res);
      setLoading(false);
      setFormData({ username: "", email: "", password: "", newPassword: "" });
    } catch (err) {
      console.log(err);
    }
  };

  if (!activeUser) return <Loading />;
  return (
    <div>
      <h1 className="upper-margin">
        <FontAwesomeIcon icon={faUserAstronaut} /> My Profile
      </h1>
      {!status ? (
        <p className="alert alert-danger profile-form">
          If you make changes here, you'll have to use your updated
          username/password the next time you login.
        </p>
      ) : null}

      {loading ? <Loading /> : null}
      {status ? (
        <div>
          <p className="alert alert-success profile-form">
            <FontAwesomeIcon icon={faCircleCheck} /> {status.message}
            <br />
            Your updated username is: '{status.username}' and your updated email
            is: '{status.email}'
            <br /> Use these credentials next time you login.
          </p>
        </div>
      ) : null}
      <div className="profile-form">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="Profile.Username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              placeholder={activeUser.username}
              onChange={handleChange}
              type="text"
              name="username"
              value={formData.username}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Profile.Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              placeholder={activeUser.email}
              onChange={handleChange}
              type="text"
              name="email"
              value={formData.email}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Profile.Password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              placeholder="enter existing password to make changes"
              onChange={handleChange}
              type="password"
              name="password"
              value={formData.password}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Profile.NewPassword">
            <Form.Label>enter new password, (optional)</Form.Label>
            <Form.Control
              placeholder="new password"
              onChange={handleChange}
              type="password"
              name="newPassword"
              value={formData.newPassword}
            />
          </Form.Group>
          <Button type="submit">Update Profile</Button>
        </Form>
      </div>
    </div>
  );
}

export default ProfileForm;
