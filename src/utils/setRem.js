/**
 * rem大小设置方法
 * 以1920设计图为标准，其余尺寸请自行调整
 */
export default function setRem () {
  var oHtml = document.documentElement
  var hWdith = oHtml.getBoundingClientRect().width
  oHtml.style.fontSize = hWdith / 19.2 + 'px'
}

