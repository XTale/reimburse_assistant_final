'use strict';

const Controller = require('egg').Controller;
const Utils = require('../utils/index');
class HomeController extends Controller {
  async index() {
    const {ctx} = this;
    await ctx.render('index/index.tpl', {date: Utils.formatDate(new Date(), 'yyyy-MM-dd')});
  }
}

module.exports = HomeController;
