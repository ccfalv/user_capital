import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Threads from "./components/Threads";
import Join from "./components/Join";
import User from "./components/User";
import Near, { Stats } from "./near/Near";
import Context, { defaultStat } from "./near/Context";
const App: React.FC = () => {
  const [stat, setStat] = React.useState<Stats>(defaultStat);
  React.useEffect(() => {
    Near.getRangeMessages().then(setStat);
  }, []);
  return (
    <Context.Provider value={stat}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <Switch>
          <Route path="/" exact component={Threads} />
          <Route path="/join" component={Join} />
          <Route path="/user" component={User} />
        </Switch>
      </BrowserRouter>
    </Context.Provider>
  );
};

export default App;
