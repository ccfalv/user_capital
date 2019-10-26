// import config from "./config";
import * as Nearlib from "nearlib";
import * as NearType from "nearlib/lib/near";
export const MS_IN_ONE_DAY = 24 * 60 * 60 * 1000;
export const MS_IN_ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
export const MS_IN_30_DAYS = 30 * 24 * 60 * 60 * 1000;
export const EARNING_PER_SECOND = 0.068 / 24 / 60 / 60;
export const ROUNDING = 1000000;
export interface MonthsArray {
  monthLabels: string[];
  monthCounters: number[];
}
export interface Methods {
  getRangeMessages: (args: { start: number }) => Promise<any[]>;
  hasCommented: (args: { id: string }) => Promise<boolean>;
  monthCounters: (args: { yearMonth6: string }) => Promise<number[]>;
  getProfile: (args: { id: string }) => Promise<any[]>;
  addMessage: (args: Partial<Message>) => Promise<void>;
}
export interface Message {
  index: number;
  id: string;
  name: string;
  text: string;
  date: string;
  photo: string;
  email: string;
}
export interface Stats {
  last1day: number;
  last7day: number;
  last30day: number;
  totalUser: number;
  totalSec: number;
  timeNow: number;
  messages: any;
}
class NearClass {
  private config = {
    networkId: "default",
    nodeUrl: "https://rpc.nearprotocol.com",
    contractName: "usersunited",
    walletUrl: "https://wallet.nearprotocol.com",
    initialBalance: 100000000
  };
  private Near: NearType.Near | null = null;
  private walletAccount: Nearlib.WalletAccount | null = null;
  private contract: Nearlib.Contract | Methods | null = null;
  private proMethods: Promise<Methods> = new Promise(res => this.getNear(res));
  // constructor() {
  //   // console.log(Nearlib);
  //   // this.getNear();
  // }
  // public methods: Methods = this.contract as Methods;
  public async addMessage(text: string) {
    // FB.api("/me", { fields: ["picture", "name", "email"] }, async function ({
    //   name,
    //   id,
    //   email,
    //   picture
    // }) {
    // const photo = picture.data.url;
    const date = new Date().toISOString();
    const methods = await this.proMethods;
    //id, name, email, photo,
    await methods.addMessage({ text, date });
    // });
  }
  public nearSignin() {
    this.walletAccount!.requestSignIn(
      this.config.contractName,
      "Users United",
      window.location.href,
      window.location.href
    );
  }
  public async monthCounters(): Promise<MonthsArray> {
    const formatter = new Intl.DateTimeFormat("en", { month: "short" });
    const methods = await this.proMethods;
    const theMonth = new Date();
    const months = [];
    const monthLabels = [];
    for (let i = 0; i < 6; i++) {
      months.unshift(theMonth.toISOString().substr(0, 7));
      monthLabels.unshift(formatter.format(theMonth));
      theMonth.setMonth(theMonth.getMonth() - 1);
    }
    const monthCounters = await methods.monthCounters({
      yearMonth6: months.join(",")
    });
    return { monthLabels, monthCounters };
  }
  public async getRangeMessages(): Promise<Stats> {
    const methods = await this.proMethods;
    const messages = await methods.getRangeMessages({ start: 0 });
    const totalUser = messages.length;
    const totalSec = messages.reduce((acc, cur) => {
      const logDate = new Date(cur.date);
      const nowDate = new Date();
      const diffTime = Math.abs(nowDate.getTime() - logDate.getTime());
      const diffSecond = Math.ceil(diffTime / 1000);
      return acc + diffSecond;
    }, 0);
    const timeNow = new Date().getTime();

    const last1day = messages.filter(
      m => timeNow - new Date(m.date).getTime() <= MS_IN_ONE_DAY
    ).length;
    const last7day = messages.filter(
      m => timeNow - new Date(m.date).getTime() <= MS_IN_ONE_WEEK
    ).length;
    const last30day = messages.filter(
      m => timeNow - new Date(m.date).getTime() <= MS_IN_30_DAYS
    ).length;
    return {
      last1day,
      last7day,
      last30day,
      totalUser,
      totalSec,
      timeNow,
      messages
    };
  }
  private async getNear(res: (value?: Methods) => void) {
    this.Near = await Nearlib.connect(
      Object.assign(
        {
          deps: {
            keyStore: new Nearlib.keyStores.BrowserLocalStorageKeyStore()
          }
        },
        this.config
      )
    );
    this.walletAccount = new Nearlib.WalletAccount(this.Near, null);
    // const account = await this.Near.account(this.walletAccount.getAccountId());
    // this.contract = new Nearlib.Contract(account, this.config.contractName, {
    //   viewMethods: [
    //     "getRangeMessages",
    //     "hasCommented",
    //     "monthCounters",
    //     "getProfile"
    //   ],
    //   changeMethods: ["addMessage"]
    // });
    this.contract = await this.Near.loadContract(this.config.contractName, {
      viewMethods: [
        "getRangeMessages",
        "hasCommented",
        "monthCounters",
        "getProfile"
      ],
      changeMethods: ["addMessage"],
      sender: this.walletAccount.getAccountId()
    });
    res((this.contract as unknown) as Methods);
  }
}

export default new NearClass();
