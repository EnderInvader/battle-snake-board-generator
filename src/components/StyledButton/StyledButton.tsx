import React from "react";
import "./StyledButton.css";

export const StyledButton: React.FC<React.ButtonHTMLAttributes<{}> & React.AnchorHTMLAttributes<{}>> = (props) => {
  if (props.href) {
    return <a {...props}>
      <button tabIndex={-1} className="styled-button">
        {props.children}
      </button>
    </a>
  } else {
    return <button className="styled-button" {...props}>{props.children}</button>
  }
}