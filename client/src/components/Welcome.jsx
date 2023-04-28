import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

let Title = ({ setIsSubmitted }) => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
      setIsSubmitted(true);
    }
  }, [setIsSubmitted]);

  const validateEmail = (email) => {
    const re =
      // Regular expression for email validation
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateEmail(email);
    setIsEmailValid(isValid);
    if (isValid) {
      localStorage.setItem("email", email);
      setIsSubmitted(true);
      navigate("/feed");
    }
  };

  return (
    <div className="center-box">
      <h1>HireHub</h1>
      <h3>Revolutionizing the way you hire</h3>
      <form onSubmit={handleSubmit}>
        <input
        className="welcome-email-input"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
        {!isEmailValid && (
          <p style={{ color: "red" }}>Please enter a valid email address</p>
        )}
        <button className="entry-button" type="submit">Try Now</button>
      </form>
    </div>
  );
};

export default Title;
