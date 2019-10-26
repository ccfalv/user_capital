import * as React from "react";
import { Link } from "react-router-dom";
import TotalLostRevenue from "./TotalLostRevenue";
import UserAcquisition from "./UserAcquisition";
import Charts from "./Charts";
import { RouteComponentProps } from "react-router-dom";
import Context from "../near/Context";
import {
  MS_IN_ONE_DAY,
  Message,
  EARNING_PER_SECOND,
  ROUNDING
} from "../near/Near";
import useInterval from "use-interval";
export default ({ history }: RouteComponentProps) => {
  const stat = React.useContext(Context);
  function toMain() {
    history.push("join");
  }
  const [second, setSecond] = React.useState(0);
  useInterval(() => setSecond(second + 1), 1000);
  const trs = stat.messages.map((m: Message, i: number) => {
    const index = i + 1;
    const logDate = new Date(m.date);
    const nowDate = new Date();
    const diffTime = Math.abs(nowDate.getTime() - logDate.getTime());
    const diffSecond = Math.ceil(diffTime / 1000) + second;
    const diffDays = Math.ceil(diffTime / MS_IN_ONE_DAY);
    return (
      <tr key={index}>
        <td>
          <div className="avatar">
            <img src={m.photo} alt="img" />
          </div>
        </td>
        <td>
          <span>
            <Link className="user-num" to={`/user#${index}`}>
              #{index}
            </Link>
            {m.name} is boycotting Facebook because {m.text}
          </span>
        </td>
        <td>
          <span className="u-pull-right">
            <label className="user-num">{diffDays}</label>Days
          </span>
        </td>
        <td>
          <span className="u-pull-right">
            <label className="user-sum">
              $
              {Math.round(diffSecond * EARNING_PER_SECOND * ROUNDING) /
                ROUNDING}
            </label>
            Boycott Value
          </span>
        </td>
      </tr>
    );
  });
  return (
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
              <button onClick={toMain} id="joinBtn">
                Join Boycott
              </button>
            </div>
          </div>
          <div className="columns nine ledger">
            <table className="u-full-width">
              <tbody id="near-tbody">{trs}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
