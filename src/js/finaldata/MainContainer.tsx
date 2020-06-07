/** @jsx jsx */
import { useEffect, useContext, useState } from "react";
import { Home } from "../comps/Home";
import { Contribute } from "../comps/Contribute";
import { About } from "../comps/About";
import { Switch, Route } from "react-router-dom";
import { SuggestionsContext } from "../suggestionsContext/SuggestionsContext";
import { PrevSugContext } from "../suggestionsContext/PrevSugContext";
import { UserForm } from "../form/userForm";
import { Analyze } from "../analyze/Analyze";
import randomWords from "random-words";
import SpinnerContext from "../spinnerContext/spinnerContext";
import { FormContext } from "../formContext/FormContext";
import { KeywordsContext } from "../keywordsContext/KeywordsContext";
import { ScrollContext } from "../scrollcontext/ScrollContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { css, jsx } from "@emotion/core";
import GoogleBooks from "./GoogleBooks";
import { PrevFormContext } from "../formContext/PrevFormContext";
import nyAllBestBook from "./nyAllBestBook";
import nyOtherBooks from "./nyOtherBooks";
import NotFoundPage from "../comps/NotFoundPage";
import styled from "styled-components";
import OverlayContext, {
  CollapseFromOverLay,
} from "../overlayContext/OverlayContext";
import Container from "@material-ui/core/Container";

/**
 * this is where the middle of the page sits
 * depending on route, comps will be rendered
 * also, the first suggested list of books is loaded here,
 *
 */
const Overlay = styled.div<{ overlay: string }>`
  display: ${(props) => (props.overlay === "true" ? "block" : "none")};
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: black;
  opacity: ${(props) => (props.overlay === "true" ? "0.8" : "1")};
  z-index: 5000;
  transition: all 2s linear 3s;
`;

const Slide = styled.div<{ overlay: string }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: ${(props) => (props.overlay === "true" ? "0" : "-200%")};
  background-color: white;
  width: 25vw;
  transition: all 0.5s ease-in-out;
  z-index: 5001;
  overflow: auto;
  @media (max-width: 900px) {
    width: 45%;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const MainContainer = () => {
  // eslint-disable-next-line
  const [clickedFromOverlay, setClickedFromOverlay] = useContext(
    CollapseFromOverLay
  );
  // eslint-disable-next-line
  const [overlay, setOverlay] = useContext(OverlayContext);
  // eslint-disable-next-line
  const [suggestions, setSuggestions] = useContext(SuggestionsContext);
  // eslint-disable-next-line
  const [spinner, setSpinner] = useContext(SpinnerContext);
  const [formcontext, setFormContext] = useContext(FormContext);
  // eslint-disable-next-line
  const [keywordsConext, setKeyWordsContext] = useContext(KeywordsContext);
  // eslint-disable-next-line
  const [scroll, setScroll] = useContext(ScrollContext);
  // eslint-disable-next-line
  const [prevSug, setPrevSug] = useContext(PrevSugContext);

  // eslint-disable-next-line
  const [prevForm, setPrevForm] = useContext(PrevFormContext);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 760 ? true : false
  );

  useEffect(() => {
    setPrevForm(formcontext);
  });
  // show sugg on first load
  useEffect(() => {
    setSpinner({ spin: true });
    // gab api data of suggested books
    Analyze({
      searchProtocol: { api: "google", method: "random" },
      words: randomWords({ min: 2, max: 3, join: "+" }),
    })
      .then((res) => {
        // update suggestions context
        setSuggestions(res);
        setFormContext({});
        setKeyWordsContext({});
        setScroll({ suggestion: true, keywords: false, form: false });
        setSpinner({ spin: false });
      })
      .catch((e) => {
        setSuggestions(e);
        setFormContext({});
        setKeyWordsContext({});
        setScroll({ suggestion: true, keywords: false, form: false });
        setSpinner({ spin: false });
      });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (suggestions.apiOrigin !== undefined) {
      setPrevSug(suggestions);
    }
    // eslint-disable-next-line
  });

  useEffect(() => {
    setIsMobile(window.innerWidth < 760 ? true : false);
  }, [isMobile]);

  return (
    <Container maxWidth="md">
      <div
        css={css`
          margin-top: 10rem;
        `}
      >
        <Slide overlay={overlay ? "true" : "false"}>
          <div
            css={css`
              display: flex;
              justify-content: flex-end;
              padding: 1rem;
              @media (min-width: 500px) {
                display: none;
              }
            `}
          >
            <FontAwesomeIcon
              css={css`
                transition: transform 0.2s ease;

                &:hover {
                  transform: rotate(180deg);
                }
              `}
              icon="times"
              size="2x"
              onClick={(e) => {
                setClickedFromOverlay(true);
                setOverlay(!overlay);
                window.setTimeout(() => {
                  setClickedFromOverlay(false);
                }, 500);
              }}
            />
          </div>
          <UserForm />
        </Slide>
        <Overlay
          overlay={overlay ? "true" : "false"}
          onClick={(e) => {
            setClickedFromOverlay(true);
            setOverlay(!overlay);
            window.setTimeout(() => {
              setClickedFromOverlay(false);
            }, 500);
          }}
        />

        <div
          className="middle"
          css={css`
            width: 100%;
            position: relative;
          `}
        >
          <main
            className="main-layout"
            css={css`
              z-index: -1;
            `}
          >
            {/* show content at center */}
            <div className="main-layout-search-results pt-4">
              <Switch>
                <Route
                  path="/books/ny/allbest"
                  component={nyAllBestBook}
                ></Route>
                <Route
                  path="/books/ny/otherbooks"
                  component={nyOtherBooks}
                ></Route>
                <Route path="/books/:id" component={GoogleBooks}></Route>
                <Route path="/about/:aboutId" component={About} />
                <Route path="/contribute" component={Contribute} />
                <Route exact path="/" component={Home}></Route>
                <Route
                  path="*"
                  render={() => {
                    return <NotFoundPage />;
                  }}
                ></Route>
              </Switch>
            </div>
          </main>
        </div>
      </div>
    </Container>
  );
};
