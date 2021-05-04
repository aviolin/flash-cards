import React from 'react';

const Header = (props) => {
  return (
    <header>
      <h1>{props.title}</h1>
      {props.children 
        ? 
        <div className="buttons">
          {props.children}
        </div> 
        : 
        null
      } 
    </header>
  )
}

export default Header;