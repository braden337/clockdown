require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var a=e[n]=new t.Module;r[n][0].call(a.exports,i,a,a.exports)}return e[n].exports}function o(){this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({6:[function(require,module,exports) {
const e=864e5,t=/^([0-1]?[0-9]|2[0-4]):?([0-5][0-9])$/,n=e=>String(Math.floor(e)).padStart(2,"0"),o=e=>localStorage.setItem("end",JSON.stringify(e)),i=e=>JSON.parse(localStorage.getItem("end")),r=()=>localStorage.removeItem("end"),a=document.querySelector("#clock"),l=document.querySelector("#end");function u(e){let n=e.target.value;if(n){let e=n.match(t);if(e){let[t,n]=e.splice(1,2),i=d(t,n);console.log(i),o(i),s(),window.timer=m(i)}else s(),r()}}function c(){let e=new Date(i());return[e.getHours(),e.getMinutes()].map(n).join(":")}function d(e,t){let n=new Date;return n.setHours(e),n.setMinutes(t),n.setSeconds(0),n.valueOf()}function s(){clearInterval(window.timer),a.innerText=a.dataset.default}function w(t){let o=t-Date.now();return o<0?o+=e:0==o&&clearInterval(window.timer),[(o/=1e3)/60/60,o/60%60,o%60].map(n).join(":")}function m(e){return l.value=c(),setInterval(function(){a.innerText=document.title=w(new Date(e))},1e3)}l.addEventListener("input",u),window.time=i(),window.time&&(l.value=c(),window.timer=m(window.time));
},{}]},{},[6])