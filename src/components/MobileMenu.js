/**
 * Displays the mobile menu.
 */

import React from 'react';
import Navlinks from './Navlinks';

const MobileMenu = ({
  isOpen,
  setIsOpen
}) => {

  const closeMenu = () => {
    setIsOpen(false);
  }

  return (
    <div className={isOpen ? "mobile-menu open" : "mobile-menu"}>
      <Navlinks closeMenu={closeMenu} />
    </div>
  )
}

export default MobileMenu;