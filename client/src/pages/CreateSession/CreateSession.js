import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { socket } from "@services/socket";
import Header from "@components/header";
import Footer from "@components/footer";

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
        <main className="main-container">
            <Header />
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
        </main>
    );
};
