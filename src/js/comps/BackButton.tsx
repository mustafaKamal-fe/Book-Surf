/**@jsx jsx */
import SpinnerContext from "../spinnerContext/spinnerContext";
import { PrevSugContext } from "../suggestionsContext/PrevSugContext";
import { ScrollContext } from "../scrollcontext/ScrollContext";
import { SuggestionsContext } from "../suggestionsContext/SuggestionsContext";
import { useLocation } from "react-router-dom";
import { useContext, createRef, useEffect, useState } from "react";
import { FormContext } from "../formContext/FormContext";
import { KeywordsContext } from "../keywordsContext/KeywordsContext";
import { css, jsx } from "@emotion/core";
import NavBack from "./Navback";
const NavLine = () => {
  // eslint-disable-next-line
  const [spinner, setSpinner] = useContext(SpinnerContext);
  const location = useLocation();
  // eslint-disable-next-line
  const [suggestions, setSuggestions] = useContext(SuggestionsContext);
  // eslint-disable-next-line
  const [prevSug, setPrevSug] = useContext(PrevSugContext);
  // eslint-disable-next-line
  const [formcontext, setFormContext] = useContext(FormContext);
  // eslint-disable-next-line
  const [keywordsConext, setKeyWordsContext] = useContext(KeywordsContext);
  // eslint-disable-next-line
  const [scroll, setScroll] = useContext(ScrollContext);
  // eslint-disable-next-line
  const [isPageScroleld, setIsPageScrolled] = useState(false);
  const suggestionsArrow = createRef<HTMLDivElement>();
  const navigateToSuggestions = () => {
    setSuggestions(prevSug);
    // clear form context
    setFormContext({});
    // clear search context
    setKeyWordsContext({});
    setScroll({ suggestion: true, form: false, keywords: false });
  };

  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      e.preventDefault();
      if (window.scrollY > 0 && isPageScroleld !== true) {
        setIsPageScrolled(true);
      }
      if (window.scrollY < 0 && isPageScroleld !== false) {
        setIsPageScrolled(false);
      }
    });
    // eslint-disable-next-line
  }, []);
  return (
    <div
      className="navigation-line"
      css={css`
        display: inline-block;
        position: static;
        padding: 0;
        margin-top: 0.5rem;
      `}
    >
      {location.pathname === "/" && (
        <div>
          {/* show nav back on all searches except suggestions*/}
          {scroll.suggestion !== true && spinner.spin !== true && (
            <NavBack
              onMobile="true"
              handleClick={navigateToSuggestions}
              refTo={suggestionsArrow}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default NavLine;
