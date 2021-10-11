import { Link } from '@reach/router';
import React from 'react';
import { HiHome } from 'react-icons/hi';
import { MdWidgets } from 'react-icons/md';
import { FormattedMessage } from 'react-intl';
import './styles.scss';

export default function Navbar() {
  return (
    <div className="nav" id="navbar">
      <nav className="navContainer">
        <div>
          <div className="navTitle">
            <span className="navSubTitle">
              <FormattedMessage id="nav.title" />
            </span>
          </div>
          <div className="navList">
            <div className="navItems">
              <Link className="navLink active" to="/">
                <HiHome className="navIcon" />
                <span className="navLogo-name"><FormattedMessage id="nav.subtitle.dashboard" /></span>
              </Link>
              <Link className="navLink active" to="/issues">
                <MdWidgets className="navIcon" />
                <span className="navLogo-name"><FormattedMessage id="nav.subtitle.issues" /></span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
