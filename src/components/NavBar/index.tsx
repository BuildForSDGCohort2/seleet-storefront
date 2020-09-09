import React, { useState } from "react";
import { ReactSVG } from "react-svg";

import "./index.scss";
import userSvg from "../../images/user.svg";
import cartSvg from "../../images/cart.svg";
import hamburgerSvg from "../../images/hamburger.svg";
import hamburgerHoverSvg from "../../images/hamburger-hover.svg";

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <nav className={open ? "menu open" : "menu closed"}>
        <ReactSVG
          src={open ? hamburgerHoverSvg : hamburgerSvg}
          onClick={() => setOpen(!open)}
          className={open ? "burger open" : "burger closed"}
        />
        <ul className="left-nav">
          <li className="menu-link">ACCESSORIES</li>
          <li className="menu-link">GROCERIES</li>
          <li className="menu-link">APPAREL</li>
        </ul>
        <ul className="right-nav">
          <li className="menu-link">
            <ReactSVG src={cartSvg} />
          </li>
          <li className="menu-link">
            <ReactSVG src={userSvg} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
