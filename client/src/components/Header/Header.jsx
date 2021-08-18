import React from 'react';
import Navbar from '../Navbar/Navbar';
import './styles.scss';
export default function Header() {

  return (
		<>
			<header className="header" >
				<div className="header__container">
					<span className="header__logo">
						Sistema de alertas automáticas basado en FIWARE
          </span>
				</div>
			</header>
			<Navbar show />
		</>
  );
}