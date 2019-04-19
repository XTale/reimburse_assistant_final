<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  <style>
    .content {
        height: 100%;
        background: url('/public/image/background.jpg') no-repeat fixed top left;
        background-size: cover;
    }
    .panel {
        position: relative;
        top: 120px;
        margin: 0 auto;
        width: 360px;
        height: 100px;
        background-color: #fcf8e3;
        border-color: #faebcc;
        text-align: center
    }
    .alert {
        height: 40px;
        color: red;
        border-bottom: none;
    }
    .a {
        display: block;
    }
  </style>
</head>
<body>
  <div class="content">
    <div class="panel">
        <div class="alert alert-warning" role="alert">{{message}}</div>
        <a href="/"><button type="button" class="btn btn-default">返回</button></a>
    </div>
  </div>

  <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
</body>
</html>