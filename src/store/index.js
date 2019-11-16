import {action, extendObservable, observable} from 'mobx';
import monent from 'moment';
import axios from '../utils/axios';
import qs from 'qs';


class UserStore {
  @observable user = {
    userName: null,
    userId: null,
    userNameDesc: null,
  };

  @action
  getUser = async () => {
    const res = await axios.get('/login/sys/user');
    if (res.status === 200) {
      for (let [key, value] of Object.entries(res.data)) {
        this.user[key] = value;
      }
    }
    return new Promise((resolve, reject) => {
      if (res.status === 200) {
        resolve(res)
      } else {
        reject(res)
      }
    })
  };

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}

class LoginStore {
  @observable login = {
    username: null,
    password: null,
  };

  @action
  doLogin = async (user) => {
    const res = await axios.post(
      '/login',
      qs.stringify(user),
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
    );
    if (res.data.success) {
      await this.rootStore.UserStore.getUser();
    }
    return new Promise((resolve, reject) => {
      if (res.status === 200) {
        resolve(res)
      } else {
        reject(res)
      }
    })
  };

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}

class HouseStore {
  @observable houses = [
    {
      project: '中关村项目',
      subway: '14号线朝阳公园站附近',
      address: '北京市朝阳区团结湖秀水园小区8号楼205',
      startDate: monent('20190223').format('YYYY-MM-DD'),
      endDate: monent('20200222').format('YYYY-MM-DD'),
      signer: '杨柳',
      user: '王舒雯',
      userProject: '德融二期',
      userProjectAddress: '朝阳区石各庄路99号',
    },
    {
      project: '中关村项目',
      subway: '14号线朝阳公园站附近',
      address: '北京市朝阳区团结湖秀水园小区8号楼205',
      startDate: monent('20190223').format('YYYY-MM-DD'),
      endDate: monent('20200222').format('YYYY-MM-DD'),
      signer: '杨柳',
      user: '张鹤斌',
      userProject: '中关村租赁',
      userProjectAddress: '北京理工大学中关村校区国防科技园',
    },
    {
      project: '中关村项目',
      subway: '14号线朝阳公园站附近',
      address: '北京市朝阳区团结湖秀水园小区8号楼205',
      startDate: monent('20190223').format('YYYY-MM-DD'),
      endDate: monent('20200222').format('YYYY-MM-DD'),
      signer: '杨柳',
      user: '雷玉婷',
      userProject: '斗山租赁',
      userProjectAddress: '北京市霞光里18号佳程广场B座19层EF',
    },
    {
      project: '信达项目',
      subway: '6号和10号线沿线',
      address: '北京市朝阳区呼家楼新街大院15号1001',
      startDate: monent('20190508').format('YYYY-MM-DD'),
      endDate: monent('20200507').format('YYYY-MM-DD'),
      signer: '康龙彪',
      user: '冯冬',
      userProject: '信达租赁',
      userProjectAddress: '北京市东城区东中街29号东环广场B座2层',
    },
  ];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

}

class RootStore {
  constructor() {
    this.HouseStore = new HouseStore(this);
    this.UserStore = new UserStore(this);
    this.LoginStore = new LoginStore(this);
  }
}

export default new RootStore()