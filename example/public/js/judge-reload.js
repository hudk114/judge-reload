(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.judgeReload = factory());
}(this, (function () { 'use strict';

  // easy random
  function setCookie(name, value) {
    let d = new Date();
    d.setHours(d.getHours() + 6);
    // cookie默认保留6小时
    document.cookie = `${name}=${value}; expires=${d.toString()}`;
  }

  function getCookie(name) {
    let cookie = document.cookie.split(';').map(c => c.trim()).find(c => {
      let x = c.split('=');
      return x[0] === name;
    });

    if (cookie && cookie.split('=').length > 1) {
      return cookie.split('=')[1].trim();
    } else {
      return null;
    }
  }

  // TODO name可能被占用的情况
  function Random() {
    let a = Math.random().toString().split('.');
    return a.length > 1 ? a[1] : a[0];
  }

  let reload = false;
  let RELOAD_TIME = 10 * 1000;

  window.onload = function () {
    // 如果没有window.name，说明是新页面
    if (!window.name) {
      window.name = Random();
      reload = false;
      return;
    }

    const t = Number(getCookie(window.name));
    console.log(Date.now());
    console.log(t);
    console.log(Math.abs(Date.now() - t));
    // 刷新10s总够了吧
    if (t && Math.abs(Date.now() - t) < RELOAD_TIME) {
      reload = true;
    } else {
      reload = false;
    }
  };

  window.onbeforeunload = function () {
    // 在结束前将当前的date存到localstorage里面
    setCookie(window.name, Date.now());
  };

  var judgeReload = {
    get reloadFlag() {
      return reload;
    }
  };

  /**
   * 库代码入口
   */

  return judgeReload;

})));
