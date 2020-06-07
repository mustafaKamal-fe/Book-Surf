import React, { useContext, Fragment } from "react";
import values from "lodash.values";
import Spinner from "./Spinner";
import SpinnerContext from "../spinnerContext/spinnerContext";
import { FormContext } from "../formContext/FormContext";
import { KeywordsContext } from "../keywordsContext/KeywordsContext";
import FormSearchUiResults from "../prefinaldata/FormSearchUiResults";

export const Home = () => {
  const [formContext] = useContext(FormContext);
  const [keywordsContext] = useContext(KeywordsContext);
  // eslint-disable-next-line
  const spinnerContext = useContext(SpinnerContext);

  if (!values(formContext).every((e) => e === null || e === "")) {
    return (
      <Fragment>
        <div>
          {spinnerContext[0].spin ? (
            <Spinner />
          ) : (
            <Fragment>
              <FormSearchUiResults />
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  } else if (!values(keywordsContext).every((e) => e === null || e === "")) {
    return (
      <Fragment>
        <div>
          {spinnerContext[0].spin ? (
            <Spinner />
          ) : (
            <Fragment>
              <FormSearchUiResults />
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {spinnerContext[0].spin ? (
          <Spinner />
        ) : (
          <Fragment>
            <div data-type="suggestions">
              <FormSearchUiResults />
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
};
