import React from 'react';
import { FormattedMessage } from 'react-intl';
import Navbar from './Navbar';
import './styles.scss';

export default function Header() {
  return (
    <>
      <header className="header">
        <div className="headerContainer">
          <span className="headerLogo">
            <FormattedMessage id="header.title" />
          </span>
        </div>
      </header>
      <Navbar show />
    </>
  );
}
