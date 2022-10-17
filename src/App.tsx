import React from "react";
import { Routes, Route } from "react-router-dom";

import { Footer, Header } from "./components";
import { Home, Cart } from "./pages";

function App() {
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
