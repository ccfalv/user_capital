// import { HashLink } from "react-router-hash-link";
// import { Link } from "react-router-dom";
import * as React from "react";
import TotalLostRevenue from "./TotalLostRevenue";
import ScrollableAnchor from "react-scrollable-anchor";
import { RouteComponentProps } from "react-router-dom";
import Near from "../near/Near";
import Charts from "./Charts";
export default (props: RouteComponentProps) => {
  const { hash } = window.location;
  const [postM, setPostM] = React.useState("");
  function nearLogin() {
    Near.nearSignin();
  }
  function facebookLogin() {}
  function sendMessage() {
    console.log(postM);
    Near.addMessage(postM);
  }
  function keyup(event: React.KeyboardEvent) {
    if (event.keyCode === 13) {
      sendMessage();
    }
  }
  return (
    <>
      <div className="how-it-works">
        <div className="container">
          <div className="row">
            <div className="columns twelve">
              <h2>How it works</h2>
            </div>
          </div>
          <div className="row">
            <div className="columns four">
              <h5>Connect Facebook</h5>
              <div className="steps-img"></div>
              <p>We're only as strong as our newest member</p>
            </div>
            <div className="columns four">
              <h5>Stop using it</h5>
              <div className="steps-img"></div>
              <p>We're only as strong as our newest member</p>
            </div>
            <div className="columns four">
              <h5>Spread the word</h5>
              <div className="steps-img"></div>
              <p>We're only as strong as our newest member</p>
            </div>
          </div>
        </div>
      </div>
      <div className="log">
        <div className="container">
          <div className="row">
            <div className="columns three sidebar">
              <div className="sidebar-content">
                <div className="campaign-avatar">
                  <div className="facebook-logo"></div>
                </div>
                <h5>Join Boycott</h5>
                <TotalLostRevenue />
                <Charts />
                <ul className="sidebar-menu" role="tablist">
                  {[
                    ["#facebook", "Connect"],
                    ["#near", "Secure"],
                    ["#post", "Post"]
                  ].map(([toHash, word], i) => (
                    <li key={i}>
                      <a
                        href={toHash}
                        role="tab"
                        aria-selected={
                          hash === toHash || (i === 0 && hash === "")
                        }
                      >
                        {word} <span>{i + 1}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <ScrollableAnchor id="facebook">
              <div className="columns nine profile-container">
                <div className="profile-content">
                  <span className="step-number">Step One</span>
                  <h3>Connect Your Account</h3>
                  <p>
                    Connect your Facebook account just like you would with any
                    other app. However, instead of mining your data, Users
                    United will only access your name, avatar and last login to
                    track your boycott.
                  </p>
                  <button className="secondary-btn" onClick={facebookLogin}>
                    Log In With Facebook
                  </button>
                  <aside>
                    <span>
                      <i className="fa fa-asterisk"></i>Yes, the irony of
                      needing to connect Facebook in order boycott Facebook is
                      not lost on us. But as Sun Tzu said, "The opportunity of
                      defeating the enemy is provided by the enemy." ¯\_(ツ)_/¯
                    </span>
                  </aside>
                </div>
              </div>
            </ScrollableAnchor>
            <ScrollableAnchor id="near">
              <div className="columns nine profile-container">
                <div className="profile-content">
                  <span className="step-number">Step Two</span>
                  <h3>Secure Your Account</h3>
                  <p>
                    The future of the web is decentralized. You boycott (and any
                    data associated with it) is stored on a censorship and
                    tamper resistent blockchain powered by the NEAR Protocol, To
                    continue, you'll need to create a username and verify your
                    phone number.
                  </p>
                  <button className="secondary-btn" onClick={nearLogin}>
                    Secure Your Account
                  </button>
                  <aside>
                    <span>
                      <i className="fa fa-asterisk"></i>NEAR is a sharded,
                      developer-friendly, proof-of-stake public blockchain.
                      <a href="#learnmore">Learn more</a>
                    </span>
                  </aside>
                </div>
              </div>
            </ScrollableAnchor>
            <ScrollableAnchor id="post">
              <div className="columns nine profile-container">
                <div className="profile-content">
                  <span className="step-number">Step Three</span>
                  <h3>Post Your Boycott</h3>
                  <p>
                    What are your reasons for boycotting Facebook? Tired of the
                    lack of privacy, disinformation, fake news, your uncle's
                    rants? There's no end, really, so be sure to tell Zuck why
                    you're boycotting Facebook.
                  </p>
                  <input
                    className="u-full-width"
                    type="text"
                    value={postM}
                    onChange={event => setPostM(event.currentTarget.value)}
                    maxLength={50}
                    id="message"
                    placeholder="I am boycotting facebook because..."
                    style={{ flex: 1 }}
                    onKeyUp={keyup}
                  />
                  <button className="secondary-btn" onClick={sendMessage}>
                    Post Boycott
                  </button>
                  <aside>
                    <span>
                      <i className="fa fa-asterisk"></i>Your message will be
                      formatted as <strong>{"{Your Name}"}</strong> is
                      boycotting Facebook because{" "}
                      <strong>{`{your reason}`}</strong>. Surely there is a
                      better way of handling this, but for now it works (fingers
                      crossed).
                    </span>
                  </aside>
                </div>
              </div>
            </ScrollableAnchor>
          </div>
        </div>
      </div>
    </>
  );
};
