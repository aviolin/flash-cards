import React from 'react';

const Header = (props) => {
  return (
    <header>
      <div>
        {props.children}
      </div>
    </header>
  )
}

export default Header;