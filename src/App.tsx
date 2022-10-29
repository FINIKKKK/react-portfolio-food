import React from "react";
import { Routes, Route } from "react-router-dom";

import { Footer, Header } from "./components";
import { Home, Cart } from "./pages";

function App() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
