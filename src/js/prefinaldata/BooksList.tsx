/** @jsx jsx */
import { useContext } from "react";
import { NyBooks } from "./NyBooks";
import { ErrorHandlerUi } from "../comps/errors/ErrorHandlerUi";
import { css, jsx } from "@emotion/core";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import ViewBookContext from "../view/book";
import ScrollPosContext from "../scrollPositionContext/scrollPosContext";
import GoogleBookMetaInfo from "../comps/GoogleBookMetaInfo";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import styled from "styled-components";

/**
 * this component recieves either books or errors
 * such as network request errors and API request errors
 */

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

export const BooksList = (props: any) => {
  const { data } = props;
  const classes = useStyles();

  // eslint-disable-next-line
  const [viewBook, setViewbook] = useContext(ViewBookContext);
  // eslint-disable-next-line
  const [scrollPos, setScrollPos] = useContext(ScrollPosContext);

  return (
    // google books or Ny books or error handling
    <div
      className="books-list"
      css={css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        grid-gap: 2rem;
        grid-auto-flow: dense;
        padding-bottom: 2rem;
        @media (max-width: 500px) {
          grid-gap: 5rem;
        }
      `}
    >
      {data.items !== undefined ? (
        data.items.map((e: any, i: number) => {
          return (
            <div
              id={`book-${i}`}
              key={i}
              className="text-center d-flex-column align-items-center justify-content-center"
            >
              <div className="books-list-item-peak">
                <Card className={classes.root}>
                  <CardHeader
                    className={classes.title}
                    title={
                      e.volumeInfo.title !== undefined &&
                      e.volumeInfo.title !== "" &&
                      e.volumeInfo.title
                    }
                  />
                  <CardMedia
                    className={classes.media}
                    component="img"
                    src={
                      e.volumeInfo.imageLinks !== undefined &&
                      e.volumeInfo.imageLinks.thumbnail !== undefined &&
                      e.volumeInfo.imageLinks.thumbnail !== null &&
                      e.volumeInfo.imageLinks.thumbnail !== "" &&
                      e.volumeInfo.imageLinks.thumbnail
                    }
                    title={
                      e.volumeInfo.title !== undefined &&
                      e.volumeInfo.title !== "" &&
                      e.volumeInfo.title
                    }
                  />
                  <CardActions className={classes.cardAction}>
                    <GoogleBookMetaInfo bookData={e} />
                  </CardActions>
                  <CardActions disableSpacing>
                    <Button
                      aria-label="more"
                      onClick={() => {
                        setViewbook(e);
                        setScrollPos(`book-${i}`);
                      }}
                    >
                      <CustomLink
                        to={`/books/${e.volumeInfo.title
                          .split(" ")
                          .join("-")
                          .toLowerCase()}`}
                      >
                        More
                      </CustomLink>
                    </Button>
                  </CardActions>
                </Card>
              </div>
            </div>
          );
        })
      ) : data.error ? (
        <ErrorHandlerUi data={data} />
      ) : (
        <NyBooks books={data} />
      )}
    </div>
  );
};
