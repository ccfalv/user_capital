import * as React from "react";
import useInterval from "use-interval";
import { EARNING_PER_SECOND, ROUNDING } from "../near/Near";
export default ({ value }: { value: number }) => {
  const [second, setSecond] = React.useState(0);
  useInterval(() => setSecond(second + 1), 1000);
  return (
    <>
      {Math.round((value + EARNING_PER_SECOND * second) * ROUNDING) / ROUNDING}
    </>
  );
};
