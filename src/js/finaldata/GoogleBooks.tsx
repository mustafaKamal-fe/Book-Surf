/**this component is rendered when any google books search(keywords and suggestions )
 * is clicked for more details..
 * the url path is changed to '/books'
 */
/**@jsx jsx */
import { useContext, createRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormContext } from "../formContext/FormContext";
import { KeywordsContext } from "../keywordsContext/KeywordsContext";
import { ScrollContext } from "../scrollcontext/ScrollContext";
import ViewBookContext from "../view/book";
import { SuggestionsContext } from "../suggestionsContext/SuggestionsContext";
import { useHistory, Redirect } from "react-router-dom";
import { PrevSugContext } from "../suggestionsContext/PrevSugContext";
import { PrevKeysContext } from "../keywordsContext/PrevKeysContext";
import { PrevFormContext } from "../formContext/PrevFormContext";
import NavBack from "../comps/Navback";
import ScrollPosContext from "../scrollPositionContext/scrollPosContext";
import { jsx } from "@emotion/core";
import { TableContainer, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const GoogleBooks = () => {
  let history = useHistory();
  const [scrollPos] = useContext(ScrollPosContext);
  const [currentBook] = useContext(ViewBookContext);
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
  const [prevSug, setPrevSug] = useContext(PrevSugContext);
  // eslint-disable-next-line
  const [prevKeyWords, setPrevKeyWords] = useContext(PrevKeysContext);
  // eslint-disable-next-line
  const [prevForm, setPrevForm] = useContext(PrevFormContext);
  const [details, setDetails] = useState([]);
  // this navigates back from /books to whatever i want
  // Ny books must also sit in /books so that navigation looks the same
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const navigateToSuggestions = () => {
    if (scroll.suggestion) {
      setSuggestions(prevSug);
      // clear form context
      setFormContext({});
      // clear search context
      setKeyWordsContext({});
      setScroll({ suggestion: true, form: false, keywords: false });
      window.setTimeout(() => {
        history.push("/");
        document
          .querySelector(`#${scrollPos}`)
          .scrollIntoView({ behavior: "auto", block: "center" });
      }, 0);
    }

    if (scroll.keywords) {
      setKeyWordsContext(prevKeyWords);
      // clear form context
      setFormContext({});
      setScroll({ suggestion: false, form: false, keywords: true });
      window.setTimeout(() => {
        history.push("/");
        document
          .querySelector(`#${scrollPos}`)
          .scrollIntoView({ behavior: "auto", block: "start" });
      }, 0);
    }
  };

  useEffect(() => {
    if (typeof currentBook !== "string") {
      // <FontAwesomeIcon icon="times-circle" color="red" />
      setDetails([
        {
          title: () =>
            currentBook.volumeInfo.title !== undefined ? (
              currentBook.volumeInfo.title
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },
        {
          subTitle: () =>
            currentBook.volumeInfo.subtitle ? (
              currentBook.volumeInfo.subtitle
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },
        {
          authors: () =>
            currentBook.volumeInfo.authors !== undefined &&
            currentBook.volumeInfo.authors.join(""),
        },
        {
          published: () =>
            currentBook.volumeInfo.publishedDate !== undefined &&
            currentBook.volumeInfo.publishedDate,
        },
        {
          categories: () =>
            currentBook.volumeInfo.categories !== undefined
              ? currentBook.volumeInfo.categories.join("")
              : undefined,
        },
        {
          publisher: () =>
            currentBook.volumeInfo.publisher !== undefined ? (
              currentBook.volumeInfo.publisher
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },
        {
          language: () =>
            currentBook.volumeInfo.language !== undefined &&
            currentBook.volumeInfo.language,
        },
        {
          preview: () =>
            currentBook.volumeInfo.previewLink !== undefined ? (
              <a href={currentBook.volumeInfo.previewLink} target="_new">
                <FontAwesomeIcon icon="link" />
              </a>
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },
        {
          pdf: () =>
            currentBook.accessInfo.pdf.isAvailable ? (
              <FontAwesomeIcon icon="check-circle" color="green" />
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },
        {
          epub: () =>
            currentBook.accessInfo.epub.isAvailable ? (
              <FontAwesomeIcon icon="check-circle" color="green" />
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },
        {
          price: () =>
            currentBook.saleInfo !== undefined &&
            currentBook.saleInfo.listPrice !== undefined &&
            currentBook.saleInfo.listPrice.currencyCode !== undefined ? (
              <span>
                {currentBook.saleInfo.listPrice.amount}{" "}
                <FontAwesomeIcon
                  icon="dollar-sign"
                  color="chocolate"
                ></FontAwesomeIcon>
              </span>
            ) : (
              <FontAwesomeIcon icon="times-circle" color="red" />
            ),
        },
      ]);
    }
  }, [currentBook]);

  return currentBook.volumeInfo !== undefined ? (
    <div className="books-list-item-details">
      {/* show table here down */}
      <TableContainer component={Paper}>
        <NavBack refTo={suggestionsArrow} handleClick={navigateToSuggestions} />
        <Table aria-label="simple table">
          {details.map((entry: any, i: number) => {
            if (entry[Object.keys(entry)[0]] !== undefined) {
              return (
                <TableHead key={i + Math.random() * (5 - 1) + 1}>
                  <TableRow key={i + Math.random() * (6 - 10) + 1}>
                    <TableCell
                      align="center"
                      key={i + Math.random() * (19 - 15) + 15}
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
    <Redirect to="/"></Redirect>
  );
};

export default GoogleBooks;
