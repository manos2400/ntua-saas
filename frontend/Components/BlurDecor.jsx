'use client';

import React from 'react'
import '@/Styles/blurdecor.css'

const BlurDecor = ({color, strength, position}) => {
    //color specifies color -> values 1(main color) , 2(selection alt)
    //strength -> 1 little 2 more
    //position - > 1 left, 2 right
    let classCSS = '';
    
    if(color === 1){
        classCSS = classCSS.concat('main');
    }
    else{
        classCSS = classCSS.concat('alt');
    }

    if(strength === 1){
        classCSS = classCSS.concat('low');
    }
    else{
        classCSS = classCSS.concat('high');
    }

    if(position === 1){
        classCSS = classCSS.concat('left');
    }
    else{
        classCSS = classCSS.concat('right');
    }
  

  return (
    <div className={classCSS}/>
  )
}

export default BlurDecor
