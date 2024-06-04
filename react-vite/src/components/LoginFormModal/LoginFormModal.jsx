import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/products")
      closeModal();
    }
  };

  const demoUser = async (e) => {
    e.preventDefault()
    const demoLogin = await dispatch(
      thunkLogin({
        email: "johndoe123@example.com",
        password: "password1"
      })
    )
    if (demoLogin) setErrors(demoLogin)
    else {
      navigate("/products")
      closeModal()
    }
  }

  return (
    <div className="login-modal-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="form-login-container">
        <div className="input-container">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="email-pass"
          />
          <label htmlFor="email" className="floating-label">Email</label>
          <div className="error-message">
            {errors.email && <p className="errors-login">{errors.email}</p>}
          </div>
        </div>
        <div className="input-container">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="email-pass"
          />
          <label htmlFor="password" className="floating-label">Password</label>
          <div className="error-message">
            {errors.password && <p className="errors-login">{errors.password}</p>}
          </div>
        </div>
        <button type="submit" className="login-buttons">Log In</button>
        <button onClick={demoUser} className="login-buttons">Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
