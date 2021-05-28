import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { firebaseAuth } from '../provider/AuthProvider';

import Navlinks from './Navlinks';

const MobileMenu = ({
  isOpen,
  setIsOpen
}) => {
  const { user } = useContext(firebaseAuth);
  const history = useHistory();

  const closeMenu = (event) => {
    setIsOpen(false);
  }

  return (
    <div className={isOpen ? "mobile-menu open" : "mobile-menu"}>
      <Navlinks closeMenu={closeMenu} />
    </div>
  )
}

export default MobileMenu;