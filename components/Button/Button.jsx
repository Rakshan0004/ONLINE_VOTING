import Style from "./Button.module.css";

const Button = ({ btnName, handleClick, classStyles }) => (
  <button className={StylePropertyMap.button} type= "button" onClick={handleClick}>
    {btnName}
  </button>
);

export default Button;
