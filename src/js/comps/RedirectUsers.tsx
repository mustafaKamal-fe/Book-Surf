import React, { Fragment, useEffect, useState, FunctionComponent } from "react";
import { Redirect } from "react-router-dom";

export const RedirectUsers: FunctionComponent = () => {
  const [reDirect, setReDirect] = useState(false);

  useEffect((): void => {
    setTimeout(() => setReDirect(true), 5000);
  }, []);

  return (
    <Fragment>
      <div style={{ width: "100%", height: "100%" }}>
        404! Page not Found!! You will be redirected to the home page in 5
        seconds.
      </div>
      <div>{reDirect && <Redirect to="/" />}</div>
    </Fragment>
  );
};
