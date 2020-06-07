import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

const NotFoundPage = () => {
  const [navBackToHome, setNavBackToHome] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setNavBackToHome(true);
    }, 3000);
  });
  return (
    <div className="lead">
      WHAT!!... <b>404</b> Page not Found.
      <small>
        You will be redirected to home page in a few seconds...
        {navBackToHome && <Redirect to="/" />}
      </small>
    </div>
  );
};
export default NotFoundPage;
