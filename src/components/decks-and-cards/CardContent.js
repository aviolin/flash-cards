/**
 * Displays a simple p tag.
 */

import React from 'react';

const CardContent = ({
  text
}) => {
  return (
    <>
      <p className="content">
        {text}
      </p>
    </>
  );
}

export default CardContent;