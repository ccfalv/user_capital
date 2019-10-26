import * as React from "react";
import { Link } from "react-router-dom";
export default () => {
  function fbShare() {
    alert("fbShare");
  }
  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="columns three">
            <nav role="navigation">
              <div id="menuToggle">
                <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>

                <ul id="menu">
                  <div className="uu-logo-mark"></div>
                  <Link to="/">
                    <li>Home</li>
                  </Link>
                  <Link to="/">
                    <li>About</li>
                  </Link>
                  <Link to="/">
                    <li>Info</li>
                  </Link>
                  <Link to="/">
                    <li>Contact</li>
                  </Link>
                </ul>
              </div>
            </nav>
            <div className="uu-logo">
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <strong>USERS</strong>UNITED
              </Link>
            </div>
            <div className="mobile-login-btn">
              <span>
                <i className="fa fa-lock"></i>
              </span>
            </div>
          </div>
          <div className="menu columns nine">
            <span>
              #BOYCOTT<strong>FACEBOOK</strong>
            </span>
            <ul className="u-pull-right">
              <li className="menu-btn">
                <div onClick={fbShare} style={{ cursor: "pointer" }}>
                  <span>SHARE</span>
                  <i className="fa fa-share"></i>
                </div>
              </li>
              <li className="menu-btn" id="loginBtn">
                <Link to="/join">
                  <span>Login</span>
                  <i className="fa fa-lock"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
