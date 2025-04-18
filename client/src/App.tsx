import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Footer, Header } from "./components";
import { AboutUs, Home, Pricing } from "./pages";

import "./App.scss";

const App = () => {
  return (
    <div className="app-body">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
