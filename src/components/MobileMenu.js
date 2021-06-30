/**
 * Displays the mobile menu.
 */

import React from 'react';
import Navlinks from './Navlinks';
import Nav from './Nav';

const MobileMenu = ({
  isOpen,
  setIsOpen,
  handleButtons
}) => {

  const closeMenu = () => {
    setIsOpen(false);
  }

  return (
    <div className={isOpen ? "mobile-menu open" : "mobile-menu"}>
      <Nav onClick={handleButtons} isMenuOpen={isOpen} mobile={true}/>
      <Navlinks closeMenu={closeMenu} />
    </div>
  )
}

export default MobileMenu;