import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitterSquare, faGithubSquare } from "@fortawesome/free-brands-svg-icons";

import "./Footer.css";

export const Footer = () => {
    return (
        <footer className="footer">
            <div>
                <a href="" target="_blank">
                    <FontAwesomeIcon icon={faTwitterSquare} className="faicon" />
                </a>
                <a href="https://github.com/carlosmedina-io/pointing-poker-app" target="_blank">
                    <FontAwesomeIcon icon={faGithubSquare} className="faicon" />
                </a>
            </div>
        </footer>
    );
};
