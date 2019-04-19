/**
 * Created by Administrator on 2019/1/28.
 */
const Service = require('egg').Service;
const Utils = require('../utils/index');
class loginService extends Service {
  async index(userInfo) {
    const {config, ctx} = this;
    const {serverUrl, queryUserUrl} = config.urlConfig;
    // ctx.curl用于发出网络请求
    
    const {headers} = await ctx.curl(`${serverUrl}/rest/user/login?${Date.now()}`, {
      method: 'post',
      contentType: 'application/x-www-form-urlencoded',
      data: {
        email: userInfo.username,
        password: userInfo.password,
        remember: false,
        forceToNetwork: false,
        redirectUrl: '',
        accountType: ''
      },
      dataType: 'json'
    });
    
    if (!headers || !headers['set-cookie']) {
      return [];
    }
    const cookieStr = headers['set-cookie'].join(',') || '';
    const cookie = Utils.getCookie(cookieStr);
    
    const teams = await ctx.curl(`${serverUrl}/rest/teamaccount/showteams`, {
      headers: {
        cookie
      },
      method: 'get',
      dataType: 'json'
    });
    
    const userId = teams.data.teams[0].userId;
    
    const signInfo = await ctx.curl(`${serverUrl}/rest/app/getlightappurl`, {
      headers: {
        cookie
      },
      method: 'get',
      data: {
        appId: '10243',
        originType: 'web',
        '_=': Date.now()
      },
      dataType: 'json'
    });
  
    const lightAppUrl = signInfo.data.lightAppUrl;
    const ticket = Utils.urlParam(lightAppUrl).ticket;
    const limit = Utils.getDaysByDateString(userInfo.startDate, userInfo.endDate);
    const userList = await ctx.curl(`${queryUserUrl}`, {
      method: 'get',
      headers: {
        cookie
      },
      data: {
        startDate: userInfo.startDate,
        endDate: userInfo.endDate,
        userId: userId,
        status: '',
        page: 1,
        limit: limit,
        sort: '-day',
        lappName: 'attendance',
        ticket: ticket
      },
      dataType: 'json'
    });
    
    const list = userList.data.data.list;
    
    let finalData = [], dataArray = [], dataObj = {}, dataList = [];

    for (let data of list) {
      // 过滤数据，获取必须的几个字段
      dataObj = this.filterData(data);
      dataArray.push(dataObj);
    }
    // 将item为undefined的数据过滤掉
    dataList = dataArray.filter(item => item);
    for (let val of dataList) {
      // 过滤掉金额为0的数据
      if (val.money !== 0) {
        finalData.push(Object.values(val));
      }
    }
    return finalData;
  }
  
  // 格式化数据,只截取需要导出的那部分
  filterData(obj) {
    if(!obj) return;
    if(obj.workLong === 0) return;
    /**
     * department: 业务产品部
     * userName: 王卓淇
     * workLong: 工作时长(12.49)
     * startWork: 最早签到时间'07:51 深圳金蝶软件园'
     * endWork: 最晚签到时间 '07:51 深圳金蝶软件园'
     * money: 每天的补贴金额
     *
     * 记钱规则：
     * 1. 周一到周五每天8点后签到并且到岗时长大于8个小时有15块钱
     * 2. 周末签到满2个小时15块, 满四个小时30块。
     * 3. 特殊情况，签到时间超过24点并且小于第二天6点的，工作时长大于8个小时，有15块补贴。（通宵到6点已经够要命的了，应该没有更恐怖的了吧）
     */
      // 定义一个所需要的字段的对象
    let needFields = {
        department: obj.department,
        userName: obj.userName,
        date: Utils.formatDate(new Date(obj.day), 'yyyy-MM-dd EE'),
        startWork: obj.startWork ? obj.startWork.substr(0, 5) : obj.startWork,
        endWork: obj.endWork ? obj.endWork.substr(0, 5) : obj.endWork,
        workLong: obj.workLong,
        money: 15,
      };
    
    // 周末的计算规则
    if ((needFields.date.substr(needFields.date.length - 1) === '六' || needFields.date.substr(needFields.date.length - 1) === '日')) {
      if (needFields.workLong < 4) {
        needFields.money = 0;
      } else if (needFields.workLong >= 8){
        needFields.money = 30
      } else {
        needFields.money = 15;
      }
    } else { // 工作日的计算规则
      let time = needFields.endWork.substr(0, 5).split(':');
      let hour = parseInt(time[0]), minute = parseInt(time[1]);
      if ((hour >= 20 && minute >= 0 || hour <= 6) && needFields.workLong > 8) {
        needFields.money = 15;
      } else {
        needFields.money = 0;
      }
    }
    
    return needFields;
  }
  
  isUserEmpty(user) {
    if (!user.username || user.username === '' || !user.password || user.password === '') {
      return true;
    }
    return false;
  }
  
}

module.exports = loginService;