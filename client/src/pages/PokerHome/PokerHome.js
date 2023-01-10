import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitterSquare, faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import { v4 as uuidv4 } from "uuid";
import { socket } from "../../services/socket";

import Header from "@components/header";
import { Footer } from "../../components/footer/Footer";

export const PokerHome = () => {
    const { sessionId } = useParams();
    
    const [connected, setConnected] = useState(false);
    const [userName, setUserName] = useState("");
    const [userJoined, setUserJoined] = useState(false);
    const [userList, setUserList] = useState([]);
    const [userListLength, setUserListLength] = useState(0);
    const [winNumber, setWinNumber] = useState("");

    const [showVotes, setShowVotes] = useState(false);

    const handleUserNameEnterKey = (event) => {
        if (event.key === "Enter") {
            handleJoinToSession();
        }
    };

    const handleJoinToSession = () => {
        if (userName.trim() === "") {
            alert("Insert your name first");
        } else {
            const userId = uuidv4();
            localStorage.setItem("ppa_user_id", userId);
            localStorage.setItem("ppa_user_name", userName);
            socket.emit("JOIN_USER_TO_SESSION_EVENT", {
                sessionId,
                userId,
                userName,
            });
        }
    };

    const handleVote = (event) => {
        const valueToVote = event.currentTarget.attributes.data.nodeValue;
        socket.emit("SET_USER_VOTE_EVENT", {
            userId: localStorage.getItem("ppa_user_id"),
            valueToVote,
        });
    };

    const handleClearVotes = () => {
        socket.emit("CLEAR_USER_VOTES_EVENT");
    };

    const handleShowVotes = () => {
        socket.emit("SHOW_USER_VOTES_EVENT");
    };

    useEffect(() => {
        socket.emit("USER_OPENED_PAGE_EVENT");

        const welcomeUserEventHandler = (data) => {
            setUserList(data);
            setUserListLength(data.length);
            setUserJoined(() => {
                return data.some(element =>
                    element.userId === localStorage.getItem("ppa_user_id")
                );
            });
            setConnected(true);
        };

        socket.on("WELCOME_USER_EVENT", welcomeUserEventHandler);

        const userJoinToSessionEventHandler = (data) => {
            setUserList(previous => {
                setUserJoined(() => {
                    return [...previous, data].some(element =>
                        element.userId === localStorage.getItem("ppa_user_id")
                    );
                });
                return [...previous, data];
            });
            setUserListLength(previous => previous + 1);
        };

        socket.on("USER_JOINED_TO_SESSION_EVENT", userJoinToSessionEventHandler);

        const refreshUserVotesEventHandler = (data) => {
            setUserList(data);
        };

        socket.on("REFRESH_USER_VOTES_EVENT", refreshUserVotesEventHandler);

        const showUserVotesEventHandler = (data) => {
            const userLength = data.length;
            const sumeOfVotes = data.filter(element => element.vote !== undefined)
                .map(element => parseInt(element.vote))
                .reduce((current, next) => current + next, 0);
            if (userLength === 0 || sumeOfVotes === 0) {
                setShowVotes(false);
                return;
            }
            const winNumber = Math.floor(sumeOfVotes / userLength);
            setWinNumber(`WIN: ${winNumber}`);
            setShowVotes(true);

        };

        socket.on("SHOW_USER_VOTES_EVENT", showUserVotesEventHandler);

        const clearedUserVotesEventHandler = (data) => {
            setWinNumber("");
            setShowVotes(false);
            setUserList(data);
        };

        socket.on("CLEARED_USER_VOTES_EVENT", clearedUserVotesEventHandler);

        return () => {
            socket.off("WELCOME_USER_EVENT", welcomeUserEventHandler);
            socket.off("USER_JOINED_TO_SESSION_EVENT", userJoinToSessionEventHandler);
        };
    }, []);

    return (
        <>
            <section className="container">
                <Header />
                <hr className="rounded"></hr>
                {!userJoined &&
                <section className="join-to-poker">
                    <div className="input-join-to-poker">
                        <input
                            type="text"
                            maxLength={30}
                            placeholder="What's your name?"
                            value={userName}
                            onChange={(event) => setUserName(event.target.value)}
                            onKeyDown={handleUserNameEnterKey}
                        />
                    </div>
                    <div className="neon-button">
                        <button
                            className="btn btn-neon"
                            style={{"width":"100%"}}
                            onClick={handleJoinToSession}>
                            Join
                        </button>
                    </div>
                </section>
                }
                {userJoined &&
                <section className="welcome-user-joined">
                    <div>WELCOME: {localStorage.getItem("ppa_user_name").toUpperCase()}</div>
                </section>
                }
                <hr className="rounded"></hr>
                <section className="user-names-container">
                    {connected && userList.map((user, index) => {
                        let showHideVote = "userNameItem";
                        if (user.vote) {
                            if (localStorage.getItem("ppa_user_id") === user.userId) {
                                showHideVote = "userNameItemShowed";
                            } else {
                                showHideVote = "userNameItemShowOthers";
                            }
                            if (showVotes) {
                                showHideVote = "userNameItemShowed";
                            }
                        }
                        return (
                            <div key={user.userId} className="userItemVotes">
                                <div className={showHideVote}>{user.userName} <span>{user.vote}</span></div>
                            </div>
                        )
                    })}
                </section>
                <section className="neon-button neon-button-container show-clear-buttons">
                    <button className="btn btn-neon btn-fast" onClick={handleShowVotes}>SHOW VOTES</button>
                    <button className="btn btn-neon btn-fast" onClick={handleClearVotes}>CLEAR VOTES</button>
                </section>
                <section className="poker-cards-container">
                    <div className={!showVotes ? "card" : "show-win"} onClick={handleVote} data="none">
                        {winNumber}
                    </div>
                    <div className="card" onClick={handleVote} data="1"></div>
                    <div className="card" onClick={handleVote} data="2"></div>
                    <div className="card" onClick={handleVote} data="3"></div>
                    <div className="card" onClick={handleVote} data="5"></div>
                    <div className="card" onClick={handleVote} data="8"></div>
                </section>
                <hr className="rounded"></hr>
                <Footer />
            </section>
        </>
      );
};