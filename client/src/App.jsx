//Module Imports
import Title from "./components/Welcome";
import MainPage from "./components/Feed";
import { Route, Routes } from "react-router-dom";

//Styling
import "./App.css";


function App() {
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
