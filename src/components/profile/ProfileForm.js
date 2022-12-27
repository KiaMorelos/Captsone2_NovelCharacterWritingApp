import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { WritingAPI } from "../../api/writingApi";
import AuthContext from "../context/AuthContext";
import FlashMessage from "../flashMessage/FlashMessage";
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
      let message = { message: err };
      setStatus(message);
      setLoading(false);
    }
  };

  if (!activeUser) return <Loading />;
  return (
    <div>
      <h1 className="upper-margin">
        <FontAwesomeIcon icon={faUserAstronaut} /> My Profile
      </h1>
      {status && status.message === "Successfully updated profile" ? (
        <h2>
          username: {status.username} <br /> email: {status.email}
        </h2>
      ) : (
        <h2>
          username: {activeUser.username}
          <br />
          email: {activeUser.email}
        </h2>
      )}

      {!status ? (
        <p className="alert alert-danger profile-form">
          If you make changes here, you'll have to use your updated
          username/password the next time you login.
        </p>
      ) : null}
      {status ? (
        <>
          {status.message === "Successfully updated profile" ? (
            <div className="upper-margin profile-form">
              <FlashMessage alertType={"success"} message={status.message} />
            </div>
          ) : (
            <div className="upper-margin profile-form">
              <FlashMessage alertType={"warning"} message={status.message} />
            </div>
          )}
        </>
      ) : null}
      {loading ? <Loading /> : null}
      <div className="profile-form">
        <h3>Update my information</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="Profile.Username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              placeholder="Enter new or current username"
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
              placeholder="Enter new or current email"
              onChange={handleChange}
              type="email"
              name="email"
              value={formData.email}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Profile.Password">
            <Form.Label>Confirm Password</Form.Label>
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
