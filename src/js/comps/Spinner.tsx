/** @jsx jsx */
import { Spinner } from "reactstrap";
import { jsx, css } from "@emotion/core";
import { FunctionComponent } from "react";

const spinner: FunctionComponent = () => {
  return (
    <h1
      css={css`
        text-align: center;
      `}
    >
      <Spinner color="primary" />
    </h1>
  );
};

export default spinner;
