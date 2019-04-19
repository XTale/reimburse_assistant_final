## 快速入门

<!-- add docs here for user -->
 egg文档直通车：[egg docs][egg] 
### 开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:8010/
（本地开发端口8010可配置更换,具体查看egg.js官方文档）
```

### 应用部署

```bash
安装egg-scripts模块：npm i egg-scripts --save
项目启动：egg-scripts start --port=8010 --daemon --title=egg-server-showcase
项目停止：egg-scripts stop [--title=egg-server]
```
[egg]: https://eggjs.org
