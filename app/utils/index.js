/**
 * Created by Administrator on 2019/1/28.
 */
module.exports = {
  getCookie: (str) => {
    if (!str) return;
    let params = str.split(';'), cookieObj = {}, cookie = "";
    params.forEach((item) => {
      let param = item.split('=');
      // 有个httpOnly字段不知道是干嘛的,直接去掉
      if (param[0].indexOf('HttpOnly') > -1) {
        param[0] = param[0].replace('HttpOnly,', '');
      }
      cookie += (param[0] + "=" + decodeURIComponent(param[1]) + ";");
    });
    return cookie;
  },
  
  urlParam: (url) => {
    let theRequest = {};
    if (url.indexOf("?") != -1) {
      var str = url.substr(url.indexOf('?') + 1);
      strs = str.split("&");
      for(var i = 0, len = strs.length; i < len; i ++) {
        param = strs[i].split("=");
        theRequest[param[0]]=decodeURIComponent(param[1]);
      }
    }
    return theRequest;
  },
  
  formatDate: (date, fmt) => {
    if (!fmt || !date) return; // 参数不存在的话不执行函数
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1, // 月份,由于月份从0开始，所以要加1
      'd+': date.getDate(), // 天
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分钟
      's+': date.getSeconds() // 秒钟
    };
  
    let week = {
      "0": "日",
      "1": "一",
      "2": "二",
      "3": "三",
      "4": "四",
      "5": "五",
      "6": "六"
    };
  
    if(/(E+)/.test(fmt)){
      fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "星期" : "周") : "")+week[date.getDay()+""]);
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) { // 注意RegExp.$1匹配的是正则表达式的第一个子串，凡是被括号包裹起来的才是子串。
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
      }
    }
    return fmt;
  },
  
  getDaysByDateString: (date1,date2) => {
    let  startDate=Date.parse(date1.replace('/-/g','/'));
    let  endDate=Date.parse(date2.replace('/-/g','/'));
    let diffDate=(endDate-startDate)+1*24*60*60*1000;
    let days=diffDate/(1*24*60*60*1000);
    return  days;
  }
}