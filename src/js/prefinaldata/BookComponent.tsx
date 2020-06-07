/** @jsx jsx */
import { useContext } from "react";
import ViewBookContext from "../view/book";
import { css, jsx } from "@emotion/core";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import ScrollPosContext from "../scrollPositionContext/scrollPosContext";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import styled from "styled-components";
const useStyles = makeStyles(() => ({
  root: {
    width: "300px",
    margin: "auto",
    "@media(max-width:500px)": {
      width: "100%",
    },
  },
  media: {
    width: "200px",
    margin: "auto",
    height: "250px",
    paddingTop: "0",
  },
  cardAction: {
    display: "block",
    borderTop: "1px solid #e1caf2",
  },
  linkColor: {
    color: "#826666",
    backgroundColor: "red",
  },
  title: {
    "& *": {
      fontSize: "1rem",
      marginBottom: "1rem",
    },
  },
}));

const CustomLink = styled(Link)`
  color: ${(props) => props.theme.styles.nav.navColor};
`;

/**
 * displays book cards for NY Forms
 *
 */

export const BookComponent = ({
  book,
  i,
  searchMethod,
}: {
  book: any;
  i: number;
  searchMethod: string;
}) => {
  const classes = useStyles();
  // eslint-disable-next-line
  const [viewBook, setViewbook] = useContext(ViewBookContext);
  // eslint-disable-next-line
  const [scrollPos, setScrollPos] = useContext(ScrollPosContext);

  // set current book and navigate to /ny/otherbooks
  return (
    <div
      key={i}
      id={`book-${i}`}
      className="text-center d-flex-column align-items-center justify-content-center"
    >
      <div
        className="books-list-item-peak"
        css={css`
          margin: 1rem;
        `}
      >
        <Card className={classes.root}>
          <CardHeader title={book.title} className={classes.title} />
          <CardMedia
            className={classes.media}
            component="img"
            src={
              book.book_image !== undefined &&
              book.book_image &&
              book.book_image
            }
            title={book.title}
          />
          <CardActions disableSpacing className={classes.cardAction}>
            <Button
              aria-label="more"
              onClick={() => {
                setViewbook(book);
                setScrollPos(`book-${i}`);
              }}
            >
              <CustomLink to={`/books/ny/otherbooks/${searchMethod}`}>
                More
              </CustomLink>
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};
