/**
 * Displays the footer.
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer>
      <a href="https://github.com/aviolin/flash-cards/"><FontAwesomeIcon icon={faGithub} /> View the source on GitHub.</a>
      <p>&copy; Copyright 2021, Arlo Adams.</p>
    </footer>
  );
}

export default Footer;