const getNowYear = () => {
  let nowYear
  const res = document.querySelector('.clockDate').childNodes;
  for(let i = 0 ; i < res.length ; i ++){
    if(res[i].style.color==='white'){
     nowYear = res[i].querySelector('p').innerHTML
    } 
  }
  return nowYear
}  

const getParams = () => {
  const params = {}
  let res1 = document.querySelector('.homeList1').childNodes[0].innerHTML
  const res2 = document.querySelector('.homeList2').childNodes[0].innerHTML
  const res3 = document.querySelector('.homeList3').childNodes[0].innerHTML
  params['year'] = res1
  params['category'] = res2
  params['title'] = res3
  return params
}