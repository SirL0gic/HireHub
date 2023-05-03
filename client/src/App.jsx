import React, { useState, useEffect } from "react";
import Title from "./components/Welcome";
import MainPage from "./components/Feed";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMobileDevice = /Mobi|Android/i.test(
      navigator.userAgent
    );

    if (isMobileDevice) {
      setIsMobile(true);
      alert("Please use a desktop or laptop computer to access this website.");
    }
  }, []);

  const renderMainPage = () => {
    if (isSubmitted) {
      return <MainPage />;
    } else {
      return <Navigate to="/" />;
    }
  };

  return (
    <>
      {isMobile && (
        <div className="mobile-alert">
          <p>Please use a desktop or laptop computer to access this website.</p>
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={<Title setIsSubmitted={setIsSubmitted} />}
        />
        <Route path="/feed" element={renderMainPage()} />
      </Routes>
    </>
  );
}

export default App;
