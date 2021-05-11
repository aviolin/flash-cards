import React from 'react';

const Header = ({
  title,
  children
}) => {
  return (
    <header>
      <h2>
        {title}
      </h2>
      <div>
        {children}
      </div>
    </header>
  )
}

export default Header;