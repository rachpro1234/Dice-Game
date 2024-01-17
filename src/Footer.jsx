/* eslint-disable no-unused-vars */
import React from 'react';
import { FaLinkedin , FaGithub, FaXTwitter, FaLocationArrow  } from "react-icons/fa6";


function Footer() {
    return (
        <footer>
            <div  className="footer-container">
                <p className="link">
                    <a href="https://github.com/rachpro1234" rel="noreferrer" target='_blank'><FaGithub /></a>
                    <span className="tooltip">github</span>
                </p>
                <p className="link">
                    <a href="https://www.linkedin.com/in/rachid-el-barqouqy-945783262/" rel="noreferrer" target='_blank'><FaLinkedin /></a>
                    <span className="tooltip">linkedIn</span>
                </p>
                <p className="link">
                    <a href="https://twitter.com/rachelbarqouqy" rel="noreferrer" target='_blank'><FaXTwitter /></a>
                    <span className="tooltip">twitter</span>
                </p>
                <p className="link">
                    <a href="https://rachpro1234.github.io/rachid-portfolio/#home" target='_blank' rel='noreferrer'><FaLocationArrow  /></a>
                    <span className="tooltip">my portfolio</span>
                </p> 
            </div>
        </footer>
    )
}

export default Footer;

// download cv => navigate to email