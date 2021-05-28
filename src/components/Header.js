import React from 'react';

const Header = ({
  title,
  children
}) => {
  return (
    <header className="card-header">
      <p>
        {title}
      </p>
      <div>
        {children}
      </div>
    </header>
  )
}

export default Header;