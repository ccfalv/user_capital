import React from "react";
import { Stats } from "../near/Near";
export const defaultStat: Stats = {
  last1day: 0,
  last7day: 0,
  last30day: 0,
  totalUser: 0,
  totalSec: 0,
  timeNow: 0,
  messages: []
};
const Context = React.createContext<Stats>(defaultStat);
export default Context;
