import React from "react";
import logo from "../../assets/logo.png";
import s from "./Header.module.scss";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  return (
    <div className="header">
      <div className={s.header_container}>
        <div className="logo_container">
          <img src={logo} height={250} width={250} alt="coffe-logo" />
        </div>
        <div className={s.navigation_container}>
          <p>COFFE</p>
          <p>TEA</p>
          <p>MENU</p>
        </div>
        <div className={s.search_container}>
          <input
            type="text"
            placeholder="Search..."
            className={s.search_input}
          />
        </div>
        <div className={s.basket_container}>
          <p>MY BASKET</p>
          <MenuIcon />
        </div>
      </div>
    </div>
  );
};

export default Header;
