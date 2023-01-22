import React from "react";
import "./Header.css";

export const Header = () => {
    return (
        <header id="header">
            <div id="title">
                <h1>Pointing Poker App</h1>
            </div>
            <div className="social-icons">
                <iframe src="https://ghbtns.com/github-btn.html?user=carlosmedina-io&repo=pointing-poker-app&type=star&count=true&size=large"
                    frameborder="0"
                    scrolling="0"
                    width="150"
                    height="30"
                    title="GitHub">                      
                </iframe>
                <a class="twitter-share-button"
                    target="_blank"
                    href="https://twitter.com/intent/tweet?text=Looking%20into%20this%20awesome%20Pointing%20Poker%20App"
                    data-size="large">
                    Tweet
                </a>
            </div>
        </header>
    );
};
