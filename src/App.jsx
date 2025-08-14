import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import CreateCard from "./components/CreateCard/CreateCard";


function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/create" element={<CreateCard />} />
      </Routes>
    </Router>
  );
}

export default App;
