/* eslint no-console: 0 */
import Cookies from 'js-cookie'
import UaParser from 'ua-parser-js'

// D2Admin 版本
const version = process.env.VUE_APP_ICE_VERSION

const util = {
  cookies: {}
}

/**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} setting cookie setting
 */
util.cookies.set = function cookiesSet (name = 'default', value = '', setting = {}) {
  const cookieSetting = {
    expires: 1
  }
  Object.assign(cookieSetting, setting)
  Cookies.set(`d2admin-ice-${version}-${name}`, value, cookieSetting)
}

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
util.cookies.get = function cookiesGet (name = 'default') {
  return Cookies.get(`d2admin-ice-${version}-${name}`)
}

/**
 * @description 拿到 cookie 全部的值
 */
util.cookies.getAll = function cookiesGetAll () {
  return Cookies.get()
}

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
util.cookies.remove = function cookiesRemove (name = 'default') {
  return Cookies.remove(`d2admin-ice-${version}-${name}`)
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function title (titleText) {
  window.document.title = `${process.env.VUE_APP_TITLE}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 获取所有的 UA 信息
 */
util.ua = function ua () {
  return new UaParser().getResult()
}

/**
 * @description 判断是否在其内
 * @param {*} ele element
 * @param {Array} targetArr array
 */
util.isOneOf = function isOneOf (ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
    return true
  }
  return false
}

/**
 * @description 打印一个 “胶囊” 样式的信息
 * @param {String} title title text
 * @param {String} info info text
 */
util.logCapsule = function logCapsule (title, info) {
  console.log(
    `%c ${title} %c ${info} %c`,
    'background:#29384b; padding: 1px; border-radius: 3px 0 0 3px; color: #fff',
    'background:#3488ff; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
    'background:transparent'
  )
}

/**
 * @description 显示版本信息
 */
util.showInfo = function showInfo () {
  util.logCapsule('D2Admin ICE', `v${version}`)
  console.log('Github https://github.com/d2-projects/d2-admin')
  console.log('Doc    http://d2admin.fairyever.com/zh/')
}

/**
 * 获取url参数
 * @param name
 * @returns {*}
 */
util.getUrlParam = function (name) {
  let search = document.location.search
  // alert(search);
  let pattern = new RegExp('[?&]' + name + '=([^&]+)', 'g')
  let matcher = pattern.exec(search)
  let items = null
  if (matcher != null) {
    try {
      items = decodeURIComponent(decodeURIComponent(matcher[1]))
    } catch (e) {
      try {
        items = decodeURIComponent(matcher[1])
      } catch (e) {
        items = matcher[1]
      }
    }
  }
  return items
}

util.getPar = function(par){
  //获取当前URL
  var local_url = document.location.href;
  //获取要取得的get参数位置
  var get = local_url.indexOf(par +"=");
  if(get == -1){
    return false;
  }
  //截取字符串
  var get_par = local_url.slice(par.length + get + 1);
  //判断截取后的字符串是否还有其他get参数
  var nextPar = get_par.indexOf("&");
  var nextjin = get_par.indexOf("#");

  if(nextPar != -1){
    get_par = get_par.slice(0, nextPar);
  }else if(nextjin != -1){
    get_par = get_par.slice(0, nextjin);
  }
  return decodeURI(get_par);
},

//json 转 url
util.jsonToUrl = function(ojson) {
  var s='',name, key;
  for(var p in ojson) {
    //if(!ojson[p]) {return null;}
    if(ojson.hasOwnProperty(p)) { name = p };
    key = ojson[p];
    s += "&" + name + "=" + encodeURIComponent(key);
  };
  return s.substring(1,s.length);
};
/**
 * 日期格式化
 * @param dateObj
 * @param format
 * @returns {*}
 */
util.dateFormat = function (dateObj, format) {
  if (!dateObj) return;
  if (!(dateObj instanceof Date)) {
    dateObj = new Date(dateObj);
  }
  let o = {
    "M+": dateObj.getMonth() + 1, //month
    "d+": dateObj.getDate(), //day
    "h+": dateObj.getHours(), //hour
    "m+": dateObj.getMinutes(), //minute
    "s+": dateObj.getSeconds(), //second
    "q+": Math.floor((dateObj.getMonth() + 3) / 3), //quarter
    "S": dateObj.getMilliseconds() //millisecond
  };

  if (!format || format === "") {
    format = "yyyy-MM-dd hh:mm:ss";
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (let k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}

util.setUrlK = function (ojson) {
  var s='',name, key;
  for(let p in ojson) {
    // if(!ojson[p]) {return null;}
    if(ojson.hasOwnProperty(p)) { name = p };
    key = ojson[p];
    s += "&" + name + "=" + encodeURIComponent(key);
  };
  return s.substring(1,s.length);
};

export default util
