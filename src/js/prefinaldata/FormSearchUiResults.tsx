import React, { useContext, useEffect, Fragment, useState } from "react";
import { Spinner } from "reactstrap";
import { SuggestionsContext } from "../suggestionsContext/SuggestionsContext";
import { Analyze } from "../analyze/Analyze";
import randomWords from "random-words";
import { FormContext } from "../formContext/FormContext";
import { KeywordsContext } from "../keywordsContext/KeywordsContext";
import { ScrollContext } from "../scrollcontext/ScrollContext";
import { BooksList } from "./BooksList";
import SpinnerContext from "../spinnerContext/spinnerContext";
import { PrevSugContext } from "../suggestionsContext/PrevSugContext";

const FormSearchUiResults = () => {
  const [suggestions, setSuggestions] = useContext(SuggestionsContext);
  // eslint-disable-next-line
  const [formContext, setFormContext] = useContext(FormContext);
  // eslint-disable-next-line
  const [keywords, setKeywords] = useContext(KeywordsContext);
  // eslint-disable-next-line
  const [scroll, setScroll] = useContext(ScrollContext);
  const [loadSpiner, setLoadSpinner] = useState(false);
  // eslint-disable-next-line
  const [keywordsConext, setKeyWordsContext] = useContext(KeywordsContext);
  // eslint-disable-next-line
  const [spinner, setSpinner] = useContext(SpinnerContext);
  // eslint-disable-next-line
  const [prevSug, setPrevSug] = useContext(PrevSugContext);
  let i = 0;

  /**
   * this scroll handler sees which books is currently used (NY,google,...)
   * depending on that, will make additional AJAX requests to load more
   * books accordingly. the ScrollContext is used to verify which one is
   * valid to trigger (form search or keyowrds or suggestions or...)
   */
  const handleScrollLoad = () => {
    let el: HTMLDivElement = document.querySelector(".books-list");
    if (window.innerHeight + window.scrollY >= el.offsetHeight) {
      window.removeEventListener("scroll", handleScrollLoad);
      // avoid blank starter obj of suggestionsContext {}
      if (
        scroll.suggestion &&
        scroll.keywords === false &&
        scroll.form === false
      ) {
        // Google Suggestions
        window.removeEventListener("scroll", handleScrollLoad);
        i += 10;
        setLoadSpinner(true);
        Analyze({
          searchProtocol: suggestions.searchProtocol,
          words: suggestions.words,
          startIndex: i,
        }).then((resp: any) => {
          // if current vol is finished do another request for diff words
          if (resp.items !== undefined) {
            let items = suggestions.items;
            items.push(...resp.items);
            setSuggestions({
              kind: suggestions.kind,
              totalItems: suggestions.totalItems,
              items,
              searchProtocol: suggestions.searchProtocol,
              words: suggestions.words,
              apiOrigin: suggestions.apiOrigin,
            });
            setLoadSpinner(false);
          } else {
            setLoadSpinner(true);
            i = 0;
            Analyze({
              searchProtocol: suggestions.searchProtocol,
              words: suggestions.words,
              startIndex: i,
            }).then((resp: any) => {
              let items = suggestions.items;
              items.push(...resp.items);
              setSuggestions({
                kind: suggestions.kind,
                totalItems: suggestions.totalItems,
                items,
                searchProtocol: suggestions.searchProtocol,
                words: randomWords({ min: 2, max: 3, join: "+" }),
                apiOrigin: suggestions.apiOrigin,
              });
              setLoadSpinner(false);
            });
          }

          window.addEventListener("scroll", handleScrollLoad);
        });
      }

      if (
        scroll.form &&
        formContext.searchProtocol !== undefined &&
        formContext.searchProtocol.method === "all-best"
      ) {
        setLoadSpinner(true);
        i += 20;
        // NY Times
        window.removeEventListener("scroll", handleScrollLoad);
        Analyze({
          searchProtocol: formContext.searchProtocol,
          title: formContext.title,
          contributor: formContext.contributor,
          price: formContext.price,
          author: formContext.author,
          publisher: formContext.publisher,
          index: i,
        }).then((resp: any) => {
          if (resp.error) {
            setFormContext(resp);
          } else {
            let items = formContext.results;
            items.push(...resp.results);
            setFormContext({
              results: items,
              searchProtocol: resp.searchProtocol,
              title: resp.title,
              contributor: resp.contributor,
              price: resp.price,
              author: resp.author,
              publisher: resp.publisher,
            });
          }

          setLoadSpinner(false);
          window.addEventListener("scroll", handleScrollLoad);
        });
      }

      if (scroll.keywords) {
        i += 10;
        // Keywords search
        window.removeEventListener("scroll", handleScrollLoad);
        setLoadSpinner(true);
        Analyze({
          searchProtocol: keywords.searchProtocol,
          userText: keywords.userText,
          startIndex: i,
        }).then((resp: any) => {
          // if current vol is not finished
          if (resp.items !== undefined) {
            let items = keywords.items;
            items.push(...resp.items);
            setKeywords({
              kind: keywords.kind,
              totalItems: keywords.totalItems,
              items,
              searchProtocol: { api: "google", method: "standard" },
              userText: keywords.userText,
              apiOrigin: keywords.apiOrigin,
            });
            setLoadSpinner(false);
          } else {
            setLoadSpinner(true);
            // else do another request for diff words
            i = 0;
            Analyze({
              searchProtocol: keywords.searchProtocol,
              words: keywords.words,
              startIndex: i,
            }).then((resp: any) => {
              let items = keywords.items;
              items.push(...resp.items);
              setKeywords({
                kind: keywords.kind,
                totalItems: keywords.totalItems,
                items,
                searchProtocol: keywords.searchProtocol,
                words: randomWords({ min: 2, max: 3, join: "+" }),
                apiOrigin: keywords.apiOrigin,
              });
              setLoadSpinner(false);
            });
          }

          window.addEventListener("scroll", handleScrollLoad);
        });
      }
    }
  };

  // attach scroll event after first render
  useEffect(() => {
    // this will work when scrolling to the end
    window.addEventListener("scroll", handleScrollLoad);
    // remove listener to scroll event when unmounting
    return () => {
      window.removeEventListener("scroll", handleScrollLoad);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div>
        {scroll.suggestion ? (
          <BooksList data={suggestions}></BooksList>
        ) : scroll.form ? (
          <BooksList data={formContext}></BooksList>
        ) : (
          <BooksList data={keywords}></BooksList>
        )}
      </div>

      <div className="row justify-content-center my-4">
        {loadSpiner && <Spinner color="primary" />}
      </div>
    </Fragment>
  );
};

export default FormSearchUiResults;
