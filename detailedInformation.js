const getDetailedInformation = (params) => {
  
 
  // 先对参数进行检验
  let newData
  if(params['year']){

    newData = dataset.find(d => d['name'] === params['title']) 
  }else{ newData = params }

  const width = document.querySelector('main').clientWidth;
  const height = document.querySelector('main').clientHeight;

  if(document.querySelector('#detailed')){document.querySelector('#detailed').remove() } // 先删除之前的svg
  const svg = d3.select('#detailedInformation').append('svg').attr('width','100%').attr('height','100%').attr('id','detailed')
// 创建外环
  const clockRing = svg.append('circle')
  .attr('cx',`${width*0.5}`)
  .attr('cy',`${height*0.5}`)
  .attr('r',`${height*0.41}`)
  .attr('stroke','white')
  .attr('stroke-width',1)
  .attr('fill','none'); 
  
  //创建刻度
  const getScale = () => {

    const x = width*0.5;
    const y = height*0.5;
    const r = height*0.32
    const g = svg.append('g').attr('class','scale')
    g.append('circle')
    .attr('cx',x)
    .attr('cy',y)
    .attr('r',r)
    .attr('stroke','white')
    .attr('stroke-width',1)
    .attr('fill','none');

    for(let i = 0 ;  i <= 50 ; i ++ ){

      if( i===0 || i===10 || i===20 || i===30 || i===40 || i===50){
        g.append('line')
        .attr('x1',x)
        .attr('y1',`${y-r - height*0.01}`)
        .attr('x2',x)
        .attr('y2',`${y - r - height*0.04}`)
        .attr('stroke','white')
        .attr('stroke-width',2)
        .attr('stroke-linecap','round')
        .attr('transform',`rotate(${3.6 * i},${x} ${y})`);

        if(i===10 || i===20 || i===30 || i===40 ){
          g.append('line')
          .attr('x1',x)
          .attr('y1',`${y- height*0.105}`)
          .attr('x2',x)
          .attr('y2',`${y - r }`)
          .attr('stroke','white')
          .attr('stroke-width',1)
          .attr('stroke-linecap','round')
          .attr('transform',`rotate(${3.6 * i},${x} ${y})`)
          .attr('stroke-dasharray','5')
          .attr('opacity','0.8')
        }
      }else if (i===5 || i===15 || i===25 || i===35 || i===45){
        g.append('line')
        .attr('x1',x)
        .attr('y1',`${y-r- height*0.01}`)
        .attr('x2',x)
        .attr('y2',`${y - r - height*0.025}`)
        .attr('stroke','white')
        .attr('stroke-width',1.5)
        .attr('stroke-linecap','round')
        .attr('transform',`rotate(${3.6 * i},${x} ${y})`)
      }else {
        g.append('line')
        .attr('x1',x)
        .attr('y1',`${y-r- height*0.02}`)
        .attr('x2',x)
        .attr('y2',`${y - r - height*0.01}`)
        .attr('stroke','white')
        .attr('stroke-width',0.7)
        .attr('stroke-linecap','round')
        .attr('transform',`rotate(${3.6 * i},${x} ${y})`)
      }
    }
  }
  
  const getPath = () => {
    const g = svg.append('g').attr('class','path');
    const date = 2011
    const thisData = []
    const endAngle =   Math.PI / 180 * 180 
    // console.log(newData);
    for(let i = 0 ; i < 10 ; i ++){
      const res = {}
      const newDate = date + i
      res.data = newData[newDate]
      res.year = newDate
      thisData.push(res)
    }

    const createFootPath = (d,i) => {
      const innerRadius = height*0.105 + height*i*0.02;
      const outerRadius = innerRadius - height*0.006 ;
      const startAngle = Math.PI / 180 * 0 ;
      const angle = { startAngle : startAngle , endAngle : endAngle};
      const arcPath = d3.arc() 
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      return arcPath(angle)
    }
    // 添加底部path
    g.selectAll('hello')
    .data(thisData)
    .enter()
    .append('g')
    .attr('class','infoPath')
    .append('path')
    .attr('d',function(d,i){
      return createFootPath(d,i)})
    .attr('transform',`translate(${width*0.5},${height*0.5})`)
    .attr('fill','white')
    .attr('opacity','.2')
    .attr('class','footPath')
    .attr('id',`path${date}`)

      const getArcPath = (d,i) => {
        // console.log(d);
        const k = i
        const res = d.data / newData['value']
        const innerRadius = height*0.105 + height*k*0.02;
        console.log(innerRadius);
        const outerRadius = innerRadius - height*0.006 ;
        const startAngle = Math.PI / 180 * 0 ;
        const angle = { startAngle : startAngle , endAngle : endAngle * res};
        // console.log(res,i,angle);
        const arcPath = d3.arc() 
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        return arcPath(angle)
      }
      // 添加数据path
      g.selectAll('.infoPath')
      .data(thisData)
      .append('path')
      .attr('d',function(d,i){
        return getArcPath(d,i)})
      .attr('fill','none')
      .attr('transform',`translate(${width*0.5},${height*0.5})`)
      .attr('fill',function(d){
        return colorType[newData['type']]
      })
      .attr('class','infoDataPath')
      .on('mouseover',function(e,d){
        // console.log(d,newData['metric']);
        // console.log('kandaole');
        const res = d.data + newData['metric']
        // console.log(res);
        getErrTooltip(res,e)
      })
      .on('mouseleave',function(e){
        removeErrTooltip()
      })
      
      const x = width*0.5;
      const y = height*0.5;
  
      g.selectAll('.infoPath')
      .data(thisData)
      .append('text')
      .text(function(d,k){
        return dateYear[k]})
      .attr('x',x)
      .attr('y',function(d,i){
        return `${y - height*0.105 - height*i*0.02}`
      })
      .attr('fill','white')
      .attr('text-anchor','end')
      .attr('transform',`translate(-${width*0.004} ${height*0.009})`)
      .attr('font-size','10')

      function createText(){
        const t = newData['d2'].split(',')
        console.log(t);
        svg.append('g').attr('class','textInfo')
        .selectAll('hello')
        .data(t)
        .enter()
        .append('text')
        .text(d => d)
        .attr('x',`${width*0.5-width*0.003}`)
        .attr('y',`${height*0.5 - height*0.37 }`)
        .attr('stroke','white')
        .attr('stroke-width',.5)
        .attr('fill','white')
        .attr('id','textScale')
        .attr('transform',function(d,i){
          return `rotate(${36 * i},${x} ${y})`}
        );
      }
      createText()
  }
  const createBackButton = () => {
    document.querySelector('.button').style.display = 'flex'
    const callback = () => {
      console.log(11111);
      document.querySelector('#detailedInformation').style.display = 'none'
      document.querySelector('#detailedInformation').querySelector('svg').remove()
      document.querySelector('#clock').style.display = 'flex'
      document.querySelector('.clockDate').style.display = 'flex'
      document.querySelector('#backButton').removeEventListener('click',callback)
      document.querySelector('.button').style.display = 'none'
      document.querySelector('.homeList2').querySelector('p').innerHTML = 'All'
    }
    document.querySelector('#backButton').addEventListener('click',callback) 
  }

  getScale() // 创建刻度
  getPath() // 创建数据图形
  createBackButton () // 创建返回按钮

 
};
// const upDetailedData = (name) => {
//   //  console.log('更新子页面图表',name);
//    const width = document.querySelector('main').clientWidth;
//    const height = document.querySelector('main').clientHeight;
//    const newData = dataset.find(d => d['name']===name)
//   //  console.log(newData);
//     const date = 2011
//     const thisData = []
//     const endAngle =   Math.PI / 180 * 180 
//     // console.log(newData);
//     for(let i = 0 ; i < 10 ; i ++){
//       const res = {}
//       const newDate = date + i
//       res.data = newData[newDate]
//       res.year = newDate
//       thisData.push(res)
//     }
 
//    d3.selectAll('.infoDataPath')
//    .data(thisData)
//   //  .transition()
//   //  .duration(1000)
//    .attr('d',function(d,i){
//     return getArcPath(d,i)})

//     function getArcPath (d,i){
//       console.log(d);
//       const k = i
//       const res = d.data / newData['value']
//       // console.log(d.data,newData['value']);
//       const innerRadius = height*0.105 + height*k*0.02;
//       const outerRadius = innerRadius - height*0.006 ;
//       const startAngle = Math.PI / 180 * 0 ;
//       const angle = { startAngle : startAngle , endAngle : endAngle * res};
//       // console.log(res,i,angle);
//       const arcPath = d3.arc() 
//       .innerRadius(innerRadius)
//       .outerRadius(outerRadius)
//       return arcPath(angle)
//     }
// }
