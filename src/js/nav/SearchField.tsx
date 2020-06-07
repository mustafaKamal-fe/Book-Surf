import React from "react";
import { useState, useContext, useRef, KeyboardEvent, MouseEvent } from "react";
import { KeywordsContext } from "../keywordsContext/KeywordsContext";
import { FormContext } from "../formContext/FormContext";
import { Analyze } from "../analyze/Analyze";
import SpinnerContext from "../spinnerContext/spinnerContext";
import { SuggestionsContext } from "../suggestionsContext/SuggestionsContext";
import { ScrollContext } from "../scrollcontext/ScrollContext";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ScrollPosContext from "../scrollPositionContext/scrollPosContext";
import BackButton from "../comps/BackButton";

const useStyles = makeStyles({
  input: {
    borderRadius: "30px",
    width: "90%",
    "&:focus": {
      outline: "none",
      boxShadow: "none",
      borderColor: "#ced4da",
    },
  },
});
const SearchWrapper = styled.div`
  width: 325px;

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyInput = styled(TextField)``;

export const SearchField = () => {
  // eslint-disable-next-line
  const [scrollPos, setScrollPos] = useContext(ScrollPosContext);
  const classes = useStyles();
  let history = useHistory();
  const [userText, setUserText] = useState("");

  // eslint-disable-next-line
  const [keywords, setKeywords] = useContext(KeywordsContext);
  // eslint-disable-next-line
  const [form, setForm] = useContext(FormContext);
  // eslint-disable-next-line
  const [spinner, setSpinner] = useContext(SpinnerContext);
  // eslint-disable-next-line
  const [suggestions, setSuggestions] = useContext(SuggestionsContext);
  // eslint-disable-next-line
  const [scroll, setScroll] = useContext(ScrollContext);

  const submitSerach = (
    e:
      | KeyboardEvent<HTMLInputElement>
      | MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    // on search nav back to home page to show results (in case user is at "/books")
    history.push("/");
    setSpinner({ spin: true });
    // grab api data
    Analyze({
      searchProtocol: { api: "google", method: "standard" },
      userText,
    }).then((res) => {
      window.scrollTo(0, 0);
      setUserText("");
      setKeywords(res);
      setScroll({ suggestions: false, keywords: true, form: false });
      setForm({});
      setSuggestions({});
      setSpinner({ spin: false });
    });
  };

  const searchFieldInput = useRef(null);

  return (
    <SearchWrapper className="search-wrapper">
      <BackButton />
      <MyInput
        innerRef={searchFieldInput}
        value={userText.split("+").join(" ")}
        onChange={(e: any) => {
          setUserText(e.target.value);
        }}
        type="text"
        id="serach-input"
        title="Simply just type anything and books will show"
        placeholder="Book Name, Author, Topic"
        className={classes.input}
        onKeyDown={(e: any) => {
          // tell compiler what target is
          let target = e.target as HTMLInputElement;
          if (
            e.key === "Enter" &&
            target.value.length !== 0 &&
            target.value !== "" &&
            !target.value.split("").every((e: string) => e === " ")
          ) {
            // submit
            submitSerach(e);
          }
        }}
      />
    </SearchWrapper>
  );
};
