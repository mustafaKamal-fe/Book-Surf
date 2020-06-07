/**this component is rendered when NY otherbooks search (top 5, one subj)
 * is clicked for more details..
 * the url path is changed to '/ny/otherbooks'
 */
import React, { useContext, createRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ViewBookContext from "../view/book";
import { useHistory, Redirect } from "react-router-dom";
import { FormContext } from "../formContext/FormContext";
import { KeywordsContext } from "../keywordsContext/KeywordsContext";
import { ScrollContext } from "../scrollcontext/ScrollContext";
import { PrevFormContext } from "../formContext/PrevFormContext";
import NavBack from "../comps/Navback";
import { SuggestionsContext } from "../suggestionsContext/SuggestionsContext";
import ScrollPosContext from "../scrollPositionContext/scrollPosContext";
import { makeStyles } from "@material-ui/core/styles";
import { TableContainer, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const NyOtherBooks = () => {
  const [currentBook] = useContext(ViewBookContext);
  let history = useHistory();
  const [scrollPos] = useContext(ScrollPosContext);
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
  // eslint-disable-next-line
  const [details, setDetails] = useState([]);
  const navigateToSuggestions = () => {
    setFormContext(prevForm);
    // clear search context
    setKeyWordsContext({});
    setSuggestions({});
    setScroll({ suggestion: false, form: true, keywords: false });
    // }
    window.setTimeout(() => {
      history.push("/");
      document.querySelector(`#${scrollPos}`).scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }, 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const useStyles = makeStyles({
    table: {
      width: "auto",
    },
  });
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
          authors: () =>
            currentBook.author !== undefined && currentBook.author !== "" ? (
              currentBook.author
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
            currentBook.created_date !== undefined &&
            currentBook.created_date !== "" ? (
              <div>
                {`${new Date(currentBook.created_date).getFullYear()}-${
                  new Date(currentBook.created_date).getMonth() + 1
                }-${new Date(currentBook.created_date).getDate()}`}
              </div>
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },
        {
          publisher: () =>
            currentBook.publisher !== undefined &&
            currentBook.publisher !== "" ? (
              currentBook.publisher
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },

        {
          preview: () =>
            currentBook.first_chapter_link !== undefined &&
            currentBook.first_chapter_link !== "" ? (
              <div>
                <a target="_new" href={currentBook.first_chapter_link}>
                  <FontAwesomeIcon icon="external-link-alt"></FontAwesomeIcon>
                </a>{" "}
              </div>
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },

        {
          rank: () =>
            currentBook.rank !== undefined && currentBook.rank !== "" ? (
              currentBook.rank
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },
        {
          "rank last week": () =>
            currentBook.rank_last_week !== undefined &&
            currentBook.rank_last_week !== "" ? (
              currentBook.rank_last_week
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
          price: () =>
            currentBook.price !== undefined && currentBook.price > 0 ? (
              <span>
                {currentBook.price}{" "}
                <FontAwesomeIcon
                  icon="dollar-sign"
                  color="chocolate"
                ></FontAwesomeIcon>
              </span>
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },
        {
          review: () =>
            currentBook.book_review_link !== "" ? (
              <div>
                <a target="_new" href={currentBook.book_review_link}>
                  <FontAwesomeIcon icon="external-link-alt"></FontAwesomeIcon>
                </a>{" "}
              </div>
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },

        {
          "sunday review": () =>
            currentBook.sunday_review_link !== "" ? (
              <div>{currentBook.rank_last_week}</div>
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },

        {
          buy: () =>
            currentBook.buy_links !== undefined ? (
              <div className="col-xs-12 text-sm-center col-md-10 text-md-center col-lg-12 text-lg-center">
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
  const classes = useStyles();

  return currentBook.title !== undefined ? (
    <div className="books-list-item-details">
      <NavBack
        refTo={suggestionsArrow}
        handleClick={navigateToSuggestions}
        styleClass="go-to-suggestions"
      />
      {/* show table here down */}
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
    <Redirect to="/" />
  );
};

export default NyOtherBooks;
