import React from "react";
import { Link } from "react-router-dom";
export default function Header() {
  return(
    <nav class="navbar navbar-light bg-light px-3">
      <Link to="/"><h3 className="app_header_text">Air Quality Index</h3></Link>
    </nav>
  )
}