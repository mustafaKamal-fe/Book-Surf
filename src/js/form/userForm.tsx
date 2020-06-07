/**@jsx jsx */
import {
  useState,
  useEffect,
  useContext,
  Fragment,
  lazy,
  Suspense,
} from "react";
import { jsx, css } from "@emotion/core";
import { Form, FormGroup, Button, Spinner } from "reactstrap";
import { FormContext } from "../formContext/FormContext";
import { KeywordsContext } from "../keywordsContext/KeywordsContext";
import SpinnerContext from "../spinnerContext/spinnerContext";
import { Analyze } from "../analyze/Analyze";
import { useHistory } from "react-router-dom";
import { SuggestionsContext } from "../suggestionsContext/SuggestionsContext";
import { ScrollContext } from "../scrollcontext/ScrollContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrevKeysContext } from "../keywordsContext/PrevKeysContext";
import { PrevFormContext } from "../formContext/PrevFormContext";
const NyForm = lazy(() => import("./NyForm"));
const ContributeMessage = lazy(() => import("./ContributeMessage"));

export const UserForm = () => {
  // select Library google, ny,.. or Contribute to the project
  const [nyTimes, setNyTimes] = useState(false);
  const [contribute, setContribute] = useState(false);
  // show and hide the Contribute btn
  const [showContBtn, setContBtn] = useState("block");
  // Current lib name

  // final form data
  const [formData, setFormData] = useState(undefined);

  const [formContextDefault, uploadFormDataToApp] = useContext(FormContext);
  const [keywords, setKeywords] = useContext(KeywordsContext);
  // eslint-disable-next-line
  const [spinner, setSpinner] = useContext(SpinnerContext);
  const history = useHistory();
  // eslint-disable-next-line
  const [suggestion, setSuggestions] = useContext(SuggestionsContext);
  // eslint-disable-next-line
  const [scroll, setScroll] = useContext(ScrollContext);
  // eslint-disable-next-line
  const [prevKeyWords, setPrevKeyWords] = useContext(PrevKeysContext);
  // eslint-disable-next-line
  const [prevForm, setPrevForm] = useContext(PrevFormContext);
  // attach listener on window.resize to disable mobile search form on wide screens
  useEffect(() => {
    window.addEventListener("resize", (e) => {
      e.preventDefault();
      if (history.location.pathname === "/search") {
        if (
          window.innerWidth >= 992 &&
          history.location.pathname === "/search"
        ) {
          history.push("/");
        }
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setPrevKeyWords(keywords);
  });

  // onsubmit..update Fromcontext
  useEffect(() => {
    if (formData !== undefined) {
      // on mobile navigate back to: '/' from: '/search'
      history.push("/");
      // reset keywords serach if any
      setKeywords({});
      setScroll({ suggestion: false, keywords: false, form: true });
      setSuggestions({});

      setSpinner({ spin: true });
      //update context with api data
      Analyze(formData).then((res) => {
        uploadFormDataToApp(res);
        setSpinner({ spin: false });
      });
    }
    // eslint-disable-next-line
  }, [formData]);

  useEffect(() => {
    setPrevForm(formContextDefault);
  });

  return (
    <Fragment>
      {/* FormSelector */}
      <Form className="d-flex d-flex-column justify-content-center mt-4">
        <FormGroup
          tag="fieldset"
          css={css`
            display: flex;
            justify-content: center;
          `}
        >
          <legend className="text-center">
            <FontAwesomeIcon icon="stream" /> Library:{" "}
          </legend>
          <FormGroup
            check
            className="mt-2"
            css={css`
              padding-left: 0;
            `}
          >
            <select
              value={nyTimes ? "ny" : "reset"} //this expression should grow as library options grow to descide wich to select
              name="library"
              id="library"
              onChange={(e) => {
                e.preventDefault();
                if (e.target.value === "ny") {
                  // render ny
                  setNyTimes(true);
                  // unmount the rest
                  setContribute(false);
                  // show Cont Btn
                  setContBtn("block");
                }
                if (e.target.value === "reset") {
                  setNyTimes(false);
                  setContribute(false);
                  setContBtn("block");
                }
              }}
            >
              <option value="reset">Select Library</option>
              <option value="ny">New York Times</option>
            </select>
          </FormGroup>
          {/* Contribute Link and Msg */}

          <Button
            size="sm"
            color="primary"
            className="mt-3 mx-auto"
            css={css`
              display: ${showContBtn};
            `}
            onClick={(e) => {
              // show contribution Msg
              setContribute(true);
              // hide the rst
              setNyTimes(false);
              // hide Add+ Button
              setTimeout(() => {
                setContBtn("none");
              }, 10);
            }}
          >
            Add <FontAwesomeIcon icon="plus" size="1x" />
          </Button>
        </FormGroup>
      </Form>
      <Suspense
        fallback={
          <div
            css={css`
              display: flex;
              justify-content: center;
            `}
          >
            <Spinner color="primary" />
          </div>
        }
      >
        {/* Render selected publisher form */}
        {nyTimes && <NyForm setFormData={setFormData} />}
        {contribute && <ContributeMessage />}
      </Suspense>
    </Fragment>
  );
};
