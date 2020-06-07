import React, { Fragment } from "react";
import { NyAllBestBooks } from "./NyAllBestBooks";
import { NyOtherBooks } from "./NyOtherBooks";

export const NyBooks = ({ books }: any) => {
  if (books.searchProtocol !== undefined) {
    return (
      <Fragment>
        {books.searchProtocol.method === "all-best" ? (
          <NyAllBestBooks
            books={books}
            searchMethod={books.searchProtocol.method}
          />
        ) : (
          <NyOtherBooks
            books={books}
            searchMethod={books.searchProtocol.method}
          />
        )}
      </Fragment>
    );
  } else {
    return null;
  }
};
