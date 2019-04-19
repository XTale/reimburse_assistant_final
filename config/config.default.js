'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1548494326322_1671';

    // add your config here
    config.middleware = [];

    config.view = {
      defaultViewEngine: 'nunjucks',
      mapping: {
        '.tpl': 'nunjucks',
      },
    };

    config.urlConfig = {
      serverUrl: 'https://www.yunzhijia.com/space/c',
      queryUserUrl: 'https://www.yunzhijia.com/attendance/rest/web-record/clockInUsers',
    };

    config.cluster = {
      listen: {
        port: 8010,
      }
    }
    return config;
};

