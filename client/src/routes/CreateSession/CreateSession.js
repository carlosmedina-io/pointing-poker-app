import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitterSquare, faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import { socket } from "../../services/socket";

import './CreateSession.css';

export const CreateSession = () => {
    const history = useHistory();

    const handleCreateNewSession = () => {
        socket.emit("CREATE_SESSION_EVENT");
    };

    useEffect(() => {
        const sessionCreatedEventHandler = (data) => {
            history.push("/" + data);
        };
        
        socket.on("SESSION_CREATED_EVENT", sessionCreatedEventHandler);

        return () => {
            socket.off("SESSION_CREATED_EVENT", sessionCreatedEventHandler);
        };
    }, []);

    return (
        <>
            <header className="header">
              <section className="neon-title">
                  <div className="text">
                      <h1>Pointing Poker App</h1>
                      <h1>Pointing Poker App</h1>
                  </div>
              </section>
            </header>
            <section>
                <section className='box'>
                    <section className="neon-button">
                          <button
                            className="btn btn-neon btn-fast"
                            onClick={handleCreateNewSession}>
                                <span></span>
                                <span></span>           
                                <span></span>
                                <span></span>
                                create session
                          </button>
                    </section>
                </section>
          </section>
          <footer className="footer">
              <FontAwesomeIcon icon={faTwitterSquare} className="faicon" />
              <FontAwesomeIcon icon={faGithubSquare} className="faicon" />
          </footer>
        </>
    );
};
