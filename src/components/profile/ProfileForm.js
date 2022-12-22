import { useContext, useState } from "react";
import { WritingAPI } from "../../api/writingApi";
import AuthContext from "../context/AuthContext";
import Loading from "../loading/Loading";

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
      const res = await WritingAPI.updateUser(activeUser.userId, formData);
      setStatus(res);
      setLoading(false);
      setFormData({ username: "", email: "", password: "", newPassword: "" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>My Profile</h1>
      <p>
        If you make changes here, you'll have to use your updated
        username/password the next time you login
      </p>
      {loading ? <Loading /> : null}
      {status ? (
        <div>
          <p>{status.message}</p>
          <p>
            Your updated username is: '{status.username}' and your updated email
            is: '{status.email}'
          </p>
        </div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <div>
          <label>username</label>
          <input
            placeholder="enter new or current username"
            onChange={handleChange}
            type="text"
            name="username"
            value={formData.username}
          />
        </div>
        <div>
          <label>email</label>
          <input
            placeholder="enter new or current email"
            onChange={handleChange}
            type="text"
            name="email"
            value={formData.email}
          />
        </div>
        <div>
          <label>current password</label>
          <input
            placeholder="enter existing password to make changes"
            onChange={handleChange}
            type="password"
            name="password"
            value={formData.password}
          />
        </div>
        <div>
          <label>enter new password, (optional)</label>
          <input
            placeholder="new password"
            onChange={handleChange}
            type="password"
            name="newPassword"
            value={formData.newPassword}
          />
        </div>
        <button>Update Profile</button>
      </form>
    </div>
  );
}

export default ProfileForm;
