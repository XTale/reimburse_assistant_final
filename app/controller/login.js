/**
 * Created by Administrator on 2019/1/26.
 */
'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const {ctx} = this;
    const userInfo = ctx.request.body;// post请求的内容从body中寻找

    if (ctx.service.login.isUserEmpty(userInfo)) {
      return await ctx.render('error.tpl', {message: '用户名或者密码为空！'});
    }
    const data = await ctx.service.login.index(userInfo);

    let content = '由于账号密码错误或者云之家数据为空，该账号没有数据。';
    if (data && data.length > 0) {
      content = '\uFEFF部门, 姓名, 工作日期, 最早签到时间, 最晚签到时间, 工作时长, 加班餐费';

      for (let val of data) {
        content += `\n${val[0]}, ${val[1]}, ${val[2]},${val[3]}, ${val[4]}, ${val[5]}, ${val[6]}`;
      }

      let fileName = userInfo.username;
      const dis = 'attachment;filename=' + encodeURI(fileName) + '.csv';
      // 设置相应头
      ctx.set({
        'Content-Description': 'File Transfer',
        'Content-Type': 'application/csv;charset=UTF-8',
        'Content-Disposition': dis,
        Expires: '0',
        'Cache-Control': 'must-revalidate',
      });
      ctx.body = content;
    } else {
      return await ctx.render('error.tpl', {message: content});
    }
  }
}

module.exports = LoginController;