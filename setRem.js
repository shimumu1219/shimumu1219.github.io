function setRem() {
  var ui_w = 1920 // ui设计稿的尺寸
  // 获取屏幕的宽度
  var clientWidth = document.documentElement.clientWidth ||                document.body.clientWidth;
 
//  if (clientWidth >= 750) {
//   clientWidth = 750
//   }
// 设置最小宽度 (需要限制宽度时添加)
if (clientWidth <= 600) {
  clientWidth = 600
}
  // 通过js动态改变html根节点字体大小
  let html_ = document.getElementsByTagName('html')[0];
  html_.style.fontSize = (clientWidth/ui_w)*16 +'px';
}
// window.onresize 浏览器被重置大小执行事件
setRem()  // 直接执行一次，之后每次变化再执行
window.onresize = setRem;