/** @jsx jsx */
import { useContext } from "react";
import ViewBookContext from "../view/book";
import { css, jsx } from "@emotion/core";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import ScrollPosContext from "../scrollPositionContext/scrollPosContext";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
    "@media(max-width: 500px)": {
      minWidth: "100%",
    },
  },
});

export const NyAllBestBooks = ({ books }: any) => {
  const classes = useStyles();
  // eslint-disable-next-line
  const [viewBook, setViewbook] = useContext(ViewBookContext);
  // eslint-disable-next-line
  const [scrollPos, setScrollPos] = useContext(ScrollPosContext);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.results.map((book: { title?: string }, i: number) => (
            <TableRow key={i} id={`book-${i}`}>
              <TableCell component="th" scope="row">
                {book.title}
              </TableCell>
              <TableCell align="right">
                <Button variant="contained">
                  <Link to={`/books/ny/allbest`}>
                    <div
                      css={css`
                        color: white;
                        & a:hover {
                          text-decoration: none;
                        }
                      `}
                      onClick={() => {
                        setViewbook(book);
                        setScrollPos(`book-${i}`);
                      }}
                    >
                      Details
                    </div>
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
