import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { HeaderNavbar } from "./nav/HeaderNavBar";
import { MainContainer } from "./finaldata/MainContainer";
import SpinnerContext from "./spinnerContext/spinnerContext";
import "fontsource-roboto";
import { NyList, names } from "./NyContext/NyContext";
import { FormContext } from "./formContext/FormContext";
import { KeywordsContext } from "./keywordsContext/KeywordsContext";
import { SuggestionsContext } from "./suggestionsContext/SuggestionsContext";
import { PrevSugContext } from "./suggestionsContext/PrevSugContext";
import { ScrollContext } from "./scrollcontext/ScrollContext";
import ViewBookContext from "./view/book";
import { PrevKeysContext } from "./keywordsContext/PrevKeysContext";
import { PrevFormContext } from "./formContext/PrevFormContext";
import ScrollPosContext from "./scrollPositionContext/scrollPosContext";
import { createGlobalStyle } from "styled-components";
import { LastLocationProvider } from "react-router-last-location";
import { ThemeProvider } from "styled-components";
import lightTheme from "./my-theme";

import OverlayContext, {
  CollapseFromOverLay,
} from "./overlayContext/OverlayContext";
import "fontsource-roboto";
import "../style/final.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
// import all free brands
import { fab } from "@fortawesome/free-brands-svg-icons";
// import any icon to use through the entire APP
import {
  faSearch,
  faExternalLinkAlt,
  faCheckCircle,
  faTimesCircle,
  faDollarSign,
  faBook,
  faShoppingCart,
  faArrowUp,
  faArrowLeft,
  faHome,
  faPaintBrush,
  faStream,
  faPlus,
  faUserEdit,
  faGlasses,
  faLink,
  faUser,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  fab,
  faSearch,
  faExternalLinkAlt,
  faCheckCircle,
  faTimesCircle,
  faDollarSign,
  faBook,
  faShoppingCart,
  faArrowUp,
  faArrowLeft,
  faHome,
  faPaintBrush,
  faStream,
  faPlus,
  faUserEdit,
  faGlasses,
  faLink,
  faUser,
  faTimes
);

const GlobalStyles = createGlobalStyle`
   body,
    html,
    #root {
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
    }
body{
  font-family: Roboto;
  background-color: #fafafa;
  color: black;
     position: relative;
}

ul {
  list-style: none;
}
a{
  color: #826666;
  text-decoration:none;
  &:hover{
    text-decoration:none;
  }
}
select{
    border-radius: 0;
    border: none;
    border-bottom: 1px solid;
    outline: 0;
    box-shadow: none;

}

*::-webkit-scrollbar {
      width: 10px;
      border-radius: 10px;
      background-color: #eee8e8;
    }

    *::-webkit-scrollbar-button {
      display: none;
    }
    *::-webkit-scrollbar-thumb {
      height: 25px;
      background-color: #c4c4d4;
      border-radius: 10px;
    }

    *::-webkit-scrollbar-track {
      background-color: rgb(243, 241, 241);
      border-radius: 10px;
    }

    ::placeholder {
      font-size: 12px;
    }
    ::-webkit-input-placeholder {
      font-size: 12px;
    }
    :-ms-input-placeholder {
      font-size: 12px;
    }
    a {
      text-decoration: none;
    }
    a:hover {
      text-decoration: none;
    }
    @media (min-width: 592px) {
      ::placeholder {
        font-size: 14px;
      }
      ::-webkit-input-placeholder {
        font-size: 14px;
      }
      :-ms-input-placeholder {
        font-size: 14px;
      }
    }

`;

function App() {
  // /ui theme
  const theme = useState(lightTheme);
  const formContext = useState({});
  const keywordsContext = useState({});
  const suggestionsContext = useState({});
  const scrollContext = useState({
    suggestion: true,
    keywords: false,
    form: false,
  });
  const nyLists = useState([]);
  const spinner = useState({ spin: false });
  const viewCurrentBook = useState("default value");
  const prevSugContext = useState({});
  const prevKeysContext = useState({});
  const prevFormContext = useState({});
  const scrollPos = useState(0);
  const overlay = useState(false);
  const collapseFromOverlay = useState(false);

  useEffect(() => {
    //  get NY Lists
    names.then((resp) => {
      if (resp.error) {
        formContext[1](names);
      } else {
        nyLists[1](
          resp.map((name) => {
            return name.display_name;
          })
        );
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <LastLocationProvider>
        <GlobalStyles />
        <OverlayContext.Provider value={overlay}>
          <ScrollPosContext.Provider value={scrollPos}>
            <PrevFormContext.Provider value={prevFormContext}>
              <PrevKeysContext.Provider value={prevKeysContext}>
                <PrevSugContext.Provider value={prevSugContext}>
                  <ScrollContext.Provider value={scrollContext}>
                    <NyList.Provider value={nyLists[0]}>
                      <FormContext.Provider value={formContext}>
                        <KeywordsContext.Provider value={keywordsContext}>
                          <SuggestionsContext.Provider
                            value={suggestionsContext}
                          >
                            <ViewBookContext.Provider value={viewCurrentBook}>
                              <SpinnerContext.Provider value={spinner}>
                                <CollapseFromOverLay.Provider
                                  value={collapseFromOverlay}
                                >
                                  <ThemeProvider theme={theme[0]}>
                                    <HeaderNavbar />
                                    <MainContainer />
                                  </ThemeProvider>
                                </CollapseFromOverLay.Provider>
                              </SpinnerContext.Provider>
                            </ViewBookContext.Provider>
                          </SuggestionsContext.Provider>
                        </KeywordsContext.Provider>
                      </FormContext.Provider>
                    </NyList.Provider>
                  </ScrollContext.Provider>
                </PrevSugContext.Provider>
              </PrevKeysContext.Provider>
            </PrevFormContext.Provider>
          </ScrollPosContext.Provider>
        </OverlayContext.Provider>
      </LastLocationProvider>
    </BrowserRouter>
  );
}

export default App;
