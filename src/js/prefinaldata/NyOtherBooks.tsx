/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import { Fragment } from "react";
import { BookComponent } from "./BookComponent";
import { ErrorHandlerUi } from "../comps/errors/ErrorHandlerUi";

export const NyOtherBooks = ({
  books,
  searchMethod,
}: {
  books: any;
  searchMethod: string;
}) => {
  return (
    <Fragment>
      {books.isNotAvailable ? (
        <ErrorHandlerUi data={books} />
      ) : (
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          `}
        >
          {books.books !== undefined
            ? books.books.map((book: {}, i: number) => {
                return (
                  <BookComponent
                    key={i}
                    book={book}
                    i={i}
                    searchMethod={searchMethod}
                  />
                );
              })
            : books.results.books.map((book: {}, i: number) => {
                return (
                  <BookComponent
                    key={i}
                    book={book}
                    i={i}
                    searchMethod={searchMethod}
                  />
                );
              })}
        </div>
      )}
    </Fragment>
  );
};
