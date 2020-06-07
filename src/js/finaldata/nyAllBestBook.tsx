/**this component is rendered when NY AllBest books search
 * is clicked for more details..
 * the url path is changed to '/ny/allbest'
 */
import React, { useContext, createRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ViewBookContext from "../view/book";
import { SuggestionsContext } from "../suggestionsContext/SuggestionsContext";
import { useHistory, Redirect } from "react-router-dom";
import { FormContext } from "../formContext/FormContext";
import { KeywordsContext } from "../keywordsContext/KeywordsContext";
import { ScrollContext } from "../scrollcontext/ScrollContext";
import { PrevFormContext } from "../formContext/PrevFormContext";
import NavBack from "../comps/Navback";
import ScrollPosContext from "../scrollPositionContext/scrollPosContext";
import { makeStyles } from "@material-ui/core/styles";
import { TableContainer, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const NyAllBestBook = () => {
  const [currentBook] = useContext(ViewBookContext);
  const [scrollPos] = useContext(ScrollPosContext);
  let history = useHistory();
  // eslint-disable-next-line
  const [suggestions, setSuggestions] = useContext(SuggestionsContext);
  // eslint-disable-next-line
  const [formcontext, setFormContext] = useContext(FormContext);
  // eslint-disable-next-line
  const [keywordsConext, setKeyWordsContext] = useContext(KeywordsContext);
  const suggestionsArrow = createRef<HTMLDivElement>();
  // eslint-disable-next-line
  const [scroll, setScroll] = useContext(ScrollContext);
  // eslint-disable-next-line
  const [prevForm, setPrevForm] = useContext(PrevFormContext);
  const [details, setDetails] = useState([]);

  const navigateToSuggestions = () => {
    setFormContext(prevForm);
    // clear search context
    setKeyWordsContext({});
    setSuggestions({});
    setScroll({ suggestion: false, form: true, keywords: false });

    window.setTimeout(() => {
      history.push("/");
      document.querySelector(`#${scrollPos}`).scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }, 0);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const classes = useStyles();

  useEffect(() => {
    if (typeof currentBook !== "string") {
      // <FontAwesomeIcon icon="times-circle" color="red" />
      setDetails([
        {
          title: () =>
            currentBook.title !== undefined ? (
              currentBook.title
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },
        {
          description: () =>
            currentBook.description !== undefined &&
            currentBook.description !== "" ? (
              currentBook.description
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },
        {
          contributor: () =>
            currentBook.contributor !== undefined &&
            currentBook.contributor !== "" ? (
              currentBook.contributor
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },
        {
          "contributor note": () =>
            currentBook.contributor_note !== undefined &&
            currentBook.contributor_note !== "" ? (
              currentBook.contributor_note
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },
        {
          date: () =>
            currentBook.ranks_history.length > 0 ? (
              <div>
                {`${new Date(
                  currentBook.ranks_history[0].published_date
                ).getFullYear()}-${
                  new Date(
                    currentBook.ranks_history[0].published_date
                  ).getMonth() + 1
                }-${new Date(
                  currentBook.ranks_history[0].published_date
                ).getDate()}`}
              </div>
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },
        {
          contributor: () =>
            currentBook.contributor_note !== "" ? (
              currentBook.contributor_note
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },

        {
          "contributor note": () =>
            currentBook.contributor_note !== "" ? (
              currentBook.contributor_note
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },

        {
          category: () =>
            currentBook.ranks_history.length ? (
              currentBook.ranks_history[0].display_name
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },
        {
          "Best Seller Date": () =>
            currentBook.ranks_history.length > 0 ? (
              currentBook.ranks_history.length
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },

        {
          "weeks on list": () =>
            currentBook.weeks_on_list !== undefined ? (
              currentBook.weeks_on_list
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },

        {
          rank: () =>
            currentBook.ranks_history.length > 0 &&
            currentBook.ranks_history[0].rank !== null &&
            currentBook.ranks_history[0].rank !== undefined &&
            currentBook.ranks_history[0].rank !== "" ? (
              currentBook.ranks_history[0].rank
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },
        {
          "rank last week": () =>
            currentBook.ranks_history.length > 0 &&
            currentBook.ranks_history[0].ranks_last_week !== null ? (
              currentBook.ranks_history[0].ranks_last_week
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },

        {
          "weeks on list": () =>
            currentBook.ranks_history.length > 0 &&
            currentBook.ranks_history[0].weeks_on_list !== null ? (
              currentBook.ranks_history[0].weeks_on_list
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },

        { publisher: () => currentBook.publisher },

        {
          review: () =>
            currentBook.reviews.length > 0 &&
            currentBook.reviews[0].book_review_link !== undefined &&
            currentBook.reviews[0].book_review_link !== "" &&
            currentBook.reviews[0].book_review_link !== null ? (
              <a target="_new" href={currentBook.reviews[0].book_review_link}>
                <FontAwesomeIcon icon="external-link-alt" />
              </a>
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },

        {
          "first Chapter ": () =>
            currentBook.reviews.length > 0 &&
            currentBook.reviews[0].first_chapter_link !== undefined &&
            currentBook.reviews[0].first_chapter_link !== "" &&
            currentBook.reviews[0].first_chapter_link !== null ? (
              <a target="_new" href={currentBook.reviews[0].first_chapter_link}>
                <FontAwesomeIcon icon="external-link-alt" />
              </a>
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },

        {
          "sunday review": () =>
            currentBook.reviews.length > 0 &&
            currentBook.reviews[0].sunday_review_link !== undefined &&
            currentBook.reviews[0].sunday_review_link !== "" &&
            currentBook.reviews[0].sunday_review_link !== null ? (
              <a target="_new" href={currentBook.reviews[0].sunday_review_link}>
                <FontAwesomeIcon icon="external-link-alt" />
              </a>
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },

        {
          buy: () =>
            currentBook.buy_links !== undefined ? (
              <div>
                {currentBook.buy_links.map(
                  (link: { url: string; name: string }, i: number) => {
                    return (
                      <div key={i} className="d-inline mr-4">
                        <div className="d-inline-flex d-inline-flex-column">
                          <a
                            target="_new"
                            href={link.url}
                            className="text-muted"
                          >
                            {link.name}
                          </a>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },
      ]);
    }
  }, [currentBook]);

  return currentBook.title !== undefined ? (
    <div className="books-list-item-details">
      <NavBack
        refTo={suggestionsArrow}
        handleClick={navigateToSuggestions}
        styleClass="go-to-suggestions"
      />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          {details.map((entry: any, i: number) => {
            if (entry[Object.keys(entry)[0]] !== undefined) {
              return (
                <TableHead key={i + Math.random() * (5 - 1) + 1}>
                  <TableRow key={i + Math.random() * (10 - 6) + 6}>
                    <TableCell
                      align="center"
                      key={i + Math.random() * (15 - 11) + 11}
                    >
                      <Typography variant="button">
                        {Object.keys(entry)[0].toUpperCase()}
                      </Typography>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      key={i + Math.random() * (20 - 25) + 20}
                    >
                      <Typography variant="body2" component="div">
                        {entry[Object.keys(entry)[0]]()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
              );
            } else {
              return false;
            }
          })}
        </Table>
      </TableContainer>
    </div>
  ) : (
    // this is used to redirect to home page when refreshing on /books/ny
    <Redirect to="/"></Redirect>
  );
};

export default NyAllBestBook;
