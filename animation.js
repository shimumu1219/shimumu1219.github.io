const animation = () => {
  return
  let endTimer = setTimeout(() => {}, 100000);
  for (let i = 0; i <= endTimer; i++) {
    // 清除setInterval创建的定时器
    clearInterval(i)
    // 清除setTimeout创建的定时器
    clearTimeout(i)
  }
  const nodes = document.querySelector('.clockDate').childNodes
  // console.log(nodes);
  const number = testing();// 检测白字的序号 
  changeColor(number) // 按时间和序号变颜色
  let time

  function testing(){
    for(let i = 0 ; i < nodes.length ; i ++){
      const res =  nodes[i].style.color
      if(res === 'white'){
        return i
      }
    }
  };
  function changeColor(n){
    let number = n + 1;
    const timer = setInterval(callback,2000)
    function callback(){
      for(let i = 0 ; i < nodes.length ; i ++){
        nodes[i].style.color = 'black'
        nodes[number].style.color = 'white'
      }
      number += 1 
      if(number>9){
      number = 0
      }
    }
  };
}
