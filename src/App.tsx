import React from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import s from "./App.module.scss";
import Basket from "./components/Basket";

function App() {
  const [isBasketOpen, setBasketOpen] = React.useState(false); // Перемещено сюда

  return (
    <div className="App">
      {isBasketOpen && (
        <div className={s.overlay} onClick={() => setBasketOpen(false)}>
          <div className={s.basket_container}>
            <Basket />
          </div>
        </div>
      )}
      <Header isBasketOpen={isBasketOpen} setBasketOpen={setBasketOpen} />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
