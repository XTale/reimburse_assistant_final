<html>
<head>
    <title>琪琪报销助手</title>
    <link href="/public/css/reset.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link href="https://cdn.bootcss.com/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.min.css" rel="stylesheet">
    <link href="/public/css/index.css" rel="stylesheet">
    <body>
        <div class="content">
            <div class="panel panel-default">
              <div class="panel-body">
                <form class="navbar-form navbar-left" method="post" action="/login">
                  <div class="form-group">
                    <div class="form-item">
                        <span class="label"><label for="username">账号：</label></span>
                        <input type="text" class="form-control" placeholder="请输入您的云之家账号" id="username" name="username">
                    </div>
                    <div class="form-item">
                        <span class="label"><label for="password">密码：</label></span>
                        <input type="password" class="form-control" placeholder="请输入您的云之家密码" id="password" name="password">
                    </div>
                    <div class="form-item">
                        <span class="label"><label for="startDate">起始日期：</label></span>
                        <input type="text" class="form-control" id="startDate" name="startDate" placeholder="请输入您的报销开始日期" value={{date}}>
                        <span class="add-on"><i class="icon-th"></i></span>
                    </div>
                    <div class="form-item">
                        <span class="label"><label for="endDate">结束日期：</label></span>
                        <input type="text" class="form-control" id="endDate" name="endDate" placeholder="请输入您的报销结束日期" value={{date}}>
                        <span class="add-on"><i class="icon-th"></i></span>
                    </div>
                  <button type="submit" class="btn btn-default">导出</button>
                  </div>
                </form>
              </div>
            </div>
            <div class="notice">
               <div class="title">公告栏(版本2.0发布相关)</div>
               <div class="notice-content">
                <ul class="notice-items">
                  <li class="notice-item">1.版本2.0只支持IE9以及以上浏览器使用,推荐使用谷歌浏览器.</li>
                  <li class="notice-item">2.与1.0相比,琪琪报销助手进行了后台全新升级与前端界面的全新改版,同时取消原始版,懒人版选项,
                    用户可以直接选择日期进行导出.</li>
                  <li class="notice-item">3.新增公告栏功能,所有版本迭代与发布信息均在此发布.</li>
                  <li class="notice-item">4.导出文件格式修改为csv格式,不再是xls格式.</li>
                  <li class="notice-item">5.修复1.0版本中在笔记本电脑中样式错乱问题.</li>
                  <li class="notice-item">6.将1.0版本中导出字段金额修改为加班餐费,使导出信息更友好.</li>
                  <li class="notice-item">7.修复1.0版本中加班超过24点时无法导出错误.</li>
                  <li class="notice-item">8.感谢各位的使用与反馈,希望您能喜欢本产品.</li>
                </p>
               </div>
            </div>
        </div>

        <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <script src="/public/js/moment.js"></script>
        <script src="https://cdn.bootcss.com/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js"></script>
        <script src="/public/js/zh-cn.js"></script>

        <script>
            let config = {
              format: 'YYYY-MM-DD',
              locale: moment.locale('zh-cn')
            }
            $('#startDate, #endDate').datetimepicker(config);
            $('.notice').hover(function() {
                $('.notice').removeClass('upflow').addClass('downflow');
                $('.notice-content').fadeIn(3000);
            }, function() {
                $('.notice').removeClass('downflow').addClass('upflow');
                $('.notice-content').fadeOut(1000);
            });
        </script>
    </body>
</head>
</html>