const getTooltip = (e,d,date) => {
  // clearTimeout(t1)
  const getDataScale = () => {
    const lastDate = + date - 1
    const res =  d[date] / d[`${ lastDate}`] - 1;
      if(!res || res === Infinity ){
        return 0
      }else if(res>=0){
        return res
    } else {return -res}
    } ;
  const scale = getDataScale()
  const res = document.querySelector('#tooltip');
  // res.style.display = 'none'
  res.innerHTML = null
  const p1 = document.createElement('p');
  const p2 = document.createElement('p');
  const p3 = document.createElement('p');
  const p4 = document.createElement('p');
  const p5 = document.createElement('p');
  const p6 = document.createElement('p');
  const a = document.createElement('a')
  p1.innerHTML = 'category'+ '&nbsp'+ ':' +'&nbsp'+ d['type'];
  p2.innerHTML = 'sub-category' +'&nbsp'+ ':' +'&nbsp'+ d['name'];
  p3.innerHTML = 'year' +'&nbsp'+ ':'+'&nbsp' + date;
  p4.innerHTML = 'growth rate' +'&nbsp'+ ':' +'&nbsp'+ Math.round(scale * 10000) / 100 + '%'
  p5.innerHTML = 'data by' +'&nbsp'+ ':'+'&nbsp' + d['data by'];
  p6.innerHTML = 'metric' +'&nbsp'+ ':'+'&nbsp' + d['metric'];
  a.innerHTML = 'Click any triangle to get detailed information.'
  res.appendChild(p3)
  res.appendChild(p1)
  res.appendChild(p2)
  res.appendChild(p5)
  res.appendChild(p6)
  res.appendChild(p4)
  res.appendChild(a)
  res.style.display = 'block'
  const offset1 = document.querySelector('header').offsetHeight
  const offset2 = res.offsetWidth
  const offset3 = res.offsetHeight
  res.style.left = e.clientX + offset2 * 0.2+ 'px'
  res.style.top = e.clientY - offset1 - offset3 * 0.8+ 'px'
}
const removeTooltip = () => {
  const res = document.querySelector('#tooltip');
  res.style.display = 'none'
};

const getErrTooltip = (d,e) => {
  const res = document.querySelector('#errTooltip');
  res.innerHTML = null;
  const p = document.createElement('p');
  p.innerHTML = d
  res.appendChild(p)
  res.style.display = 'block'
  const offset1 = document.querySelector('header').offsetHeight
  const offset2 = res.offsetWidth
  const offset3 = res.offsetHeight
  res.style.left = e.clientX +'px'
  res.style.top = e.clientY +'px'
};

const removeErrTooltip = () => {
  document.querySelector('#errTooltip').style.display= 'none'
};