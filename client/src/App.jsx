import React, { useState } from "react";
import Title from "./components/Welcome";
import MainPage from "./components/Feed";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const renderMainPage = () => {
    if (isSubmitted) {
      return <MainPage />;
    } else {
      return <Navigate to="/" />;
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Title setIsSubmitted={setIsSubmitted} />} />
      <Route path="/feed" element={renderMainPage()} />
    </Routes>
  );
}

export default App;
