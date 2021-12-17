import React from "react";
import { Link } from "react-router-dom";
export default function Breadcrumb(props) {
  return(
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to={props.prevLink}>{props.prevTitle}</Link></li>
        <li class="breadcrumb-item active" aria-current="page">{props.current}</li>
      </ol>
    </nav>
  )
}