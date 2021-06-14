import React from "react";
import "./Card.css";

function Buttons(props) {
  return (
    <div className="buttons">
      <div className="button">
        <button className="login-form__button" type="submit">
          {props.button}
        </button>
      </div>
    </div>
  );
}

export default Buttons;
