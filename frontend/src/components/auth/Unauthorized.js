import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Unauthorized.css";

function Unauthorized() {
  return (
    <div className="Unauthorized">
      <p>
        You need to be <Link to="/login">Logged In</Link> to use this feature
      </p>
    </div>
  );
}

export default Unauthorized;
