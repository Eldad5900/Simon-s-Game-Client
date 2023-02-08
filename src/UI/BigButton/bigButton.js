import { useEffect, useState } from "react";
import "./bigButton.scss";


export const BigButton = (props) => {
 
    return(
        <>
          <button className="btn" {...props}>{props.children}</button>
        </>
    )
}