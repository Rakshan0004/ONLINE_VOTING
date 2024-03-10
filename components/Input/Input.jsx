import React, {useContext} from 'react';

//internal import
import Style from "./Input.module.css";

const Input = ({inputType, title, placehandle, handleClick }) => {
  return (
    <div className={Style.input}>
      <p>{title}</p>
      {inputType === "text" ? (
        <div className={Style.input__box}>
        <input
          type="text"
          className={Style.input__box__form}
          placeholder={placeholder}  
          onChange={handleClick} />
          </div>
      ): (
        "" //if file tag is not text we dont want to render anything
      )} 
    </div>
  )
};

export default Input
