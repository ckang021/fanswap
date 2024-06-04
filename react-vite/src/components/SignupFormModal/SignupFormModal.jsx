import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


  const validateForm = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First Name is required";
    if (!lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6 || password.length > 20) {
      newErrors.password = "Password must be 6-20 characters long";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        first_name: firstName,
        last_name: lastName,
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="sign-up-container">
      <h1>Sign Up</h1>
      {errors.server && <p className="error-message">{errors.server}</p>}
      <form onSubmit={handleSubmit} className="sign-up-form-container">
        <div className="input-container">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="signup-inputs"
          />
          <label htmlFor="firstName" className="floating-label">First Name</label>
          <div className="error-message">
            {errors.firstName && <p className="errors-signup">{errors.firstName}</p>}
          </div>
        </div>
        <div className="input-container">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="signup-inputs"
          />
          <label htmlFor="lastName" className="floating-label">Last Name</label>
          <div className="error-message">
            {errors.lastName && <p className="errors-signup">{errors.lastName}</p>}
          </div>
        </div>
        <div className="input-container">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-inputs"
          />
          <label htmlFor="email" className="floating-label">Email</label>
          <div className="error-message">
            {errors.email && <p className="errors-signup">{errors.email}</p>}
          </div>
        </div>
        <div className="input-container">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="signup-inputs"
          />
          <label htmlFor="username" className="floating-label">Username</label>
          <div className="error-message">
            {errors.username && <p className="errors-signup">{errors.username}</p>}
          </div>
        </div>
        <div className="input-container">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-inputs"
          />
          <label htmlFor="password" className="floating-label">Password</label>
          <div className="error-message">
            {errors.password && <p className="errors-signup">{errors.password}</p>}
          </div>
        </div>
        <div className="input-container">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="signup-inputs"
          />
          <label htmlFor="confirmPassword" className="floating-label">Confirm Password</label>
          <div className="error-message">
            {errors.confirmPassword && <p className="errors-signup">{errors.confirmPassword}</p>}
          </div>
        </div>
        <button type="submit" className="login-buttons">Sign Up</button>
      </form>
    </div>

  );
}

export default SignupFormModal;
