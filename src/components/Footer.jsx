import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
      <div className="container_footer">
        <h4 style={{ color: "white" }}>© Academlo 2023</h4>
        <div className="container_social_media">
          <div className="container_icons_social">
            <i className="bx bxl-instagram bx-lg"></i>
          </div>
          <div className="container_icons_social">
            <a
              href="https://www.linkedin.com/in/erickjimenezcruz/
            "
              target="_blank"
              rel="Linkedln">
              <i className="bx bxl-linkedin bx-lg"></i>
            </a>
          </div>
          <div className="container_icons_social">
            <a href="https://github.com/erfajc97" target="_blank">
              <i className="bx bxl-github bx-lg"></i>
            </a>
          </div>
        </div>
      </div>
    );
};

export default Footer;