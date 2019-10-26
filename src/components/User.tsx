import * as React from "react";
import { Link } from "react-router-dom";
import UserAcquisition from "./UserAcquisition";
import TotalLostRevenue from "./TotalLostRevenue";
import { RouteComponentProps } from "react-router-dom";
import Charts from "./Charts";
import { Message } from "../near/Near";
import Context from "../near/Context";
import OnePersonCostCounter from "./OnePersonCostCounter";
import { ROUNDING, EARNING_PER_SECOND } from "../near/Near";
export default (props: RouteComponentProps) => {
  const { messages } = React.useContext(Context);
  const { hash } = window.location;
  const user = React.useMemo(() => {
    const userNo = Number(hash.substring(1));
    let user: Message;
    if (messages.length < 1) {
      return null;
    }
    if (userNo > 0) {
      user = messages[userNo - 1];
    } else {
      user = messages[0];
    }
    const logDate = new Date(user.date);
    const nowDate = new Date();
    const diffTime = Math.abs(nowDate.getTime() - logDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalCost =
      Math.round((diffTime / 1000) * EARNING_PER_SECOND * ROUNDING) / ROUNDING;
    return {
      ...user,
      totalCost,
      diffDays,
      userNo
    };
  }, [hash, messages]);
  if (!user) {
    return null;
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
                <TotalLostRevenue />
                <Charts />
                <UserAcquisition />
                <button onClick={() => props.history.push("/")}>
                  Leaderboard
                </button>
              </div>
            </div>
            <div id="profile" className="columns nine profile-container">
              <div className="profile-content">
                <div className="profile-header">
                  <div className="avatar">
                    <img
                      src={user.photo}
                      alt="img"
                      style={{ width: "inherit" }}
                    />
                  </div>
                  <section>
                    <h3>{user.name}</h3>
                    <a
                      href={`https://facebook.com/${user.id}`}
                      className="url-address"
                    >
                      https://facebook.com/{user.id}
                    </a>
                  </section>
                </div>
                <section className="user-stats">
                  <div>
                    <h3>
                      <Link to={`/#${user.userNo}`}>#{user.userNo}</Link>
                    </h3>
                    <span>User Number</span>
                  </div>
                  <div>
                    <h3>{user.diffDays}</h3>
                    <span>Days Boycotting</span>
                  </div>
                  <div>
                    <h3>
                      $<OnePersonCostCounter value={user.totalCost} />
                    </h3>
                    <span>Boycott Value</span>
                  </div>
                </section>
                <p>I am boycotting Facebook until {user.text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
