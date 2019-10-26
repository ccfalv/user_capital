import * as React from "react";
import Context from "../near/Context";
import useInterval from "use-interval";
import { EARNING_PER_SECOND, ROUNDING } from "../near/Near";
export default () => {
  const { totalSec, totalUser } = React.useContext(Context);
  const [sum, setSum] = React.useState(0);
  const [second, setSecond] = React.useState(totalSec);
  useInterval(() => {
    setSecond(second + totalUser);
    const totalSum =
      Math.round((second + 1 + totalSec) * EARNING_PER_SECOND * ROUNDING) /
      ROUNDING;
    setSum(totalSum);
  }, 1000);
  return (
    <p>
      We are <strong className="total-boycott-sum">{totalUser}</strong> Users
      United boycotting Facebook resulting in
      <strong className="total-boycott-sum" id="earning-total">
        {` $${sum} `}
      </strong>
      lost revenue.
    </p>
  );
};
