import * as React from "react";
import Context from "../near/Context";
export default () => {
  const { last1day, last30day, last7day } = React.useContext(Context);
  return (
    <>
      <section>
        <span>
          <aside>LAST</aside>24 HOURS
        </span>
        <span className="total-boycott-sum">{last1day}</span>
      </section>
      <section>
        <span>
          <aside>LAST</aside>7 DAYS
        </span>
        <span className="total-boycott-sum">{last7day}</span>
      </section>
      <section>
        <span>
          <aside>LAST</aside>30 DAYS
        </span>
        <span className="total-boycott-sum">{last30day}</span>
      </section>
    </>
  );
};
