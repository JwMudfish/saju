var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
//최종적으로 보내줘야할 객체
let myManse = {};
let myManseInterF = {};

// 실제 작업이 이루어지는 날짜(최종적인 객체는 음력은 음력대로 양력은 양력대로 보내주어야하기 때문 )
let useDate = {};
//양력
let useSolar = {};
//음력
let useLunar = {};

//명식
let usePillar = {};
//오늘명식
let useTodayPillar = {};
//실제 사용하는 절입,중기,절기
let useJulib = {};
//계산에 사용되는 절입
let useRealJulib = {};
//다음절입(대운용)
let useNextJulib = {};
//실제 사용되는 음양오행
let useUmYangOHang = {};
let useTodayUmYangOHang = {};
//실제 사용되는 지장간
let usejijanggan = {};
let useTodayJanggan = {};
//실제사용되는 육신
let useYuksin = {};
let useTodayYuksin = {};
//실제사용되는 지장간 사용판단
let usejijangganUse = {};
let useTodayjijangganUse = {};
let useBasicFunc = {};
let useHapChung = {};
let useRyeong = {};
let useManseSSSG = {};
let useTodayRyeong = {};
let useGyoukProperty = [];
let useGyouk = '';
let useShgj = {};
let useTodayShgj = {};
let useDeunSeun = {};
let useDeunSeunV2 = {};
let useSeunElement = {};
let useWolElement = {};
let useDeunElement = {};
let usePalPum = {};
//전역변수 선언
global.myManse = myManse;
global.myManseInterF = myManseInterF;
global.useDate = useDate;
global.useSolar = useSolar;
global.useLunar = useLunar;
global.usePillar = usePillar;
global.useJulib = useJulib;
global.useRealJulib = useRealJulib;
global.useUmYangOHang = useUmYangOHang;
global.useHapChung = useHapChung;
global.useTodayUmYangOHang = useTodayUmYangOHang;
global.usejijanggan = usejijanggan;
global.useYuksin = useYuksin;
global.useTodayYuksin = useTodayYuksin;
global.useJijangganUse = usejijangganUse;
global.useTodayjijangganUse = useTodayjijangganUse;
global.useBasicFunc = useBasicFunc;
global.useRyeong = useRyeong;
global.useManseSSSG = useManseSSSG;
global.useTodayRyeong = useTodayRyeong;
global.useGyoukProperty = useGyoukProperty;
global.useGyouk = useGyouk;
global.useShgj = useShgj;
global.useTodayShgj = useTodayShgj;
global.useDeunSeun = useDeunSeun;
global.useDeunSeunV2 = useDeunSeunV2;
global.useSeunElement = useSeunElement;
global.useWolElement = useWolElement;
global.useDeunElement = useDeunElement;
global.useNextJulib = useNextJulib;
global.useTodayPillar = useTodayPillar;
global.useTodayJanggan = useTodayJanggan;
global.usePalPum = usePalPum;

// const db = require('./schemas/db.js'); // db 불러오기

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var manse = require('./routes/manse');
//var pillar = require("./routes/pillar");
var daily = require('./routes/daliy');
var specialDay = require('./routes/specificDay');
var test = require('./routes/testResult');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//app.set('trust proxy', true);
// db();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/manse', manse);
//app.use("/manse", pillar);
app.use('/daliy', daily);
app.use('/specialDay', specialDay);
app.use('/test', test);
console.log('ServerStart');
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
