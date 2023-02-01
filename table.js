const overTriggerTable = (e) => {

  e.target.style.backgroundColor = 'white'
  e.target.style.color = 'black'
};
const leaveTriggerTable = (e) => {
  e.target.style.backgroundColor = 'rgb(155,155,155)'
  e.target.style.color = 'white'
};
const setTable = () => {

  const createTableYear = () => {
    const newData = ['All',...dateYear]
    const target1 = d3.select('.tableYear')
    target1.selectAll('.tableList1')
    .data(newData)
    .enter()
    .append('div')
    .on('mouseover',function(e){
      overTriggerTable(e);
     })
     .on('mouseleave',function(e){
      leaveTriggerTable(e);
     })
     .on('click',function(e){
      const value = e.target.getAttribute('value')  // d3添加的自定义属性，都要通过getAttribute()才能获取 
      document.querySelector('.homeList1').querySelector('p').innerText = value
      const res = document.querySelectorAll('.tableYearList');
      for(let i = 0 ; i < res.length ; i ++){
        res[i].style.display = 'none'
      } 
     })
    .attr('class',`tableYearList`)
    .attr('value',d => d)
    .append('p')
    .text(d => `${d}`)
    target1.on('mouseover',function(e){
      const res = document.querySelectorAll('.tableYearList');
      for(let i = 0 ; i < res.length ; i ++){
        res[i].style.display = 'flex'
      }
    }).on('mouseleave',function(e){
      const res = document.querySelectorAll('.tableYearList');
      for(let i = 0 ; i < res.length ; i ++){
        res[i].style.display = 'none'
      }
    })
  };

  const createTableCategory = () => {
    const target2 = d3.select('.tableCategory')
    const dataType = Object.keys(numberType);
    const newDatatype = ['All',...dataType]
    target2.selectAll('.tableList2')
    .data(newDatatype)
    .enter()
    .append('div')
    .on('mouseover',function(e){
      overTriggerTable(e);
    })
    .on('mouseleave',function(e){
      leaveTriggerTable(e);
    })
    .on('click',function(e){
      const value = e.target.getAttribute('value')  
      document.querySelector('.homeList2').querySelector('p').innerText = value
      const res = document.querySelectorAll('.tableCategoryList');
      for(let i = 0 ; i < res.length ; i ++){
        res[i].style.display = 'none'
      } ;
      document.querySelector('.homeList3').querySelector('p').innerHTML = '--Sub-category--'
    })
    .attr('class',`tableCategoryList`)
    .attr('value',d => d)
    .append('p')
    .text(d => `${d}`) ;
    target2.on('mouseover',function(e){
      const res = document.querySelectorAll('.tableCategoryList')
      for(let i = 0 ; i < res.length ; i ++){
        res[i].style.display = 'flex'
      }
    }).on('mouseleave',function(e){
      const res = document.querySelectorAll('.tableCategoryList')
      for(let i = 0 ; i < res.length ; i ++){
        res[i].style.display = 'none'
      }
    })
  } ;

  const createTableTitle = () => {
   
    const target3 = d3.select('.tableTitle')
    const createDiv = (d) => {
      console.log('创建新表',d);
      target3.selectAll('.tableList3')
      .data(d)
      .enter()
      .append('div')
      .attr('class',`tableTitleList`)
      .attr('value',d => d['name'])
      .on('mouseover',function(e){
        overTriggerTable(e);
      })
      .on('mouseleave',function(e){
        leaveTriggerTable(e);
      })
      .on('click',function(e){
        const value = e.target.getAttribute('value')  
        document.querySelector('.homeList3').querySelector('p').innerText = value
        const res = document.querySelectorAll('.tableTitleList');
        for(let i = 0 ; i < res.length ; i ++){
          res[i].style.display = 'none'
        }})
      .append('p')
      .text(d => `${d['name']}`) ; 
    };

    target3.on('mouseover',function(e){
      const testingValue = document.querySelector('.homeList2').querySelector('p').innerText
      // 监听category的变化，如果有值，则可以出弹框，如果没有值，弹提示框
      if(testingValue==='All' || testingValue==='--Category--'){
       getErrTooltip("Set the second value first. The second value cannot be 'All' and 'Category'.",e) //弹出提示框
      }else{
        const condition = document.querySelector('.tableTitleList')  
        if(!condition){
          const newTitles = dataset.filter(d => d.type===testingValue)
          createDiv(newTitles)
        }
      }
    }).on('mouseleave',function(e){
      removeErrTooltip() ;// 移除提示框
      // 删除titleList
      const set = document.querySelectorAll('.tableTitleList')
      for(let i = 0 ; i < set.length ; i ++){
        set[i].remove()
      } ;
    });

    //监听category的变化，随时清空title
    document.querySelector('.homeList2').querySelector('p').addEventListener('input',function(e){
      console.log(11111111111111);
      upDetailedData(d)
    })
  };
  createTableYear(); // 创建tableYear 
  createTableCategory(); // 创建tableCategory
  createTableTitle(); // 创建tableTitle
}