/* eslint-disable react/prop-types */
import { Link } from '@reach/router';
import React from 'react';
import { HiHome } from 'react-icons/hi';
import {MdWidgets} from 'react-icons/md';
import { FaPencilRuler } from 'react-icons/fa';
import './styles.scss';

export default function Navbar() {
  return (
    <div className="nav" id="navbar">
      <nav className="navContainer">
        <div>
          <div className="navTitle">
            <span className="navSubTitle">
              Menú
            </span>
          </div>
          <div className="navList">
            <div className="navItems">
              <Link className="navLink active" to="/">
                <HiHome className="navIcon" />
                <span className="navLogo-name">Home</span>
              </Link>
              <Link className="navLink active" to="/rules">
                <FaPencilRuler className="navIcon" />
                <span className="navLogo-name">Rules</span>
              </Link>
              <Link className="navLink active" to="/widgets">
                <MdWidgets className="navIcon" />
                <span className="navLogo-name">Widgets</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
