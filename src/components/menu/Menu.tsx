import React from "react";

import Search from '../search/Search'
import "./Menu.scss";

const Menu: React.FC = () => {
	return (
		<div className="menu">
			<nav>
				<ul className="left-nav">
					<li className="menu-link">ACCESSORIES</li>
					<li className="menu-link">GROCERIES</li>
					<li className="menu-link">APPAREL</li>
				</ul>
				<ul className="right-nav">
					<li className="search-box"><Search /></li>
					<li className="menu-link">CART</li>
					<li className="menu-link">PROFILE</li>
				</ul>
			</nav>
		</div>
	);
};

export default Menu;
