//Module Imports
import Title from "./components/Welcome";
import MainPage from "./components/Feed";
import { Route, Routes } from "react-router-dom";

//Styling
import "./App.css";


function App() {
  document.body.style.background = "#f5f5f5";
  return (
    <>
    <Routes>
        <Route path="/" element={<Title/>} />
        <Route path="feed" element={ <MainPage/>} />
    </Routes>
    </>

  );
}

export default App;
