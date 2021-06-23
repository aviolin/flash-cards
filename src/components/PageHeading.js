/**
 * Displays a heading with a subtitle.
 */

import React from 'react';

const PageHeading = ({
  title,
  subtitle,
  heading="h1"
}) => {
  let titleElement = null;
  if (heading === "h1") {
    titleElement=<h1>{title}</h1>
  } else {
    titleElement=<h2>{title}</h2>
  }

  return (
    <header className="page-heading">
      {titleElement}
      <p className="subtitle">{subtitle}</p>
    </header>
  )
}

export default PageHeading;