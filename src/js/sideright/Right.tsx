/** @jsx jsx */
import { UncontrolledCarousel } from "reactstrap";
import gorgeOwrwell from "../../images/gorge.webp";
import gabriel from "../../images/gabriel.webp";
import gohte from "../../images/gohte.webp";
import { jsx, css } from "@emotion/core";
import { Route } from "react-router-dom";
import Footer from "../comps/Footer";
export const Right = () => {
  const items = [
    {
      src: gabriel,
      altText: "The General in His Labyrinth",
      caption: "",
      header: "",
      key: "1",
    },
    {
      src: gohte,
      altText: "The Sorrows of Young Werther",
      caption: "",
      header: "",
      key: "2",
    },
    {
      src: gorgeOwrwell,
      altText: "Animal farm",
      caption: "",
      header: "",
      key: "3",
    },
  ];

  type BooksIndex = {
    [k: string]: string;
  };
  const bookLinks: BooksIndex = {
    "The General in His Labyrinth":
      "https://books.google.iq/books?id=sB-VAgAAQBAJ&printsec=frontcover&dq=The+General+in+His+Labyrinth&hl=&cd=1&source=gbs_api&redir_esc=y#v=onepage&q=The%20General%20in%20His%20Labyrinth&f=false",
    "The Sorrows of Young Werther":
      "https://books.google.iq/books?id=PW2_bu002xUC&printsec=frontcover&dq=The+Sorrows+of+Young+Werther&hl=&cd=1&source=gbs_api&redir_esc=y#v=onepage&q=The%20Sorrows%20of%20Young%20Werther&f=false",
    "Animal farm":
      "https://books.google.iq/books?id=AQLJ2IxOvOAC&printsec=frontcover&dq=Animal+farm&hl=&cd=1&source=gbs_api&redir_esc=y#v=onepage&q=Animal%20farm&f=false",
  };

  return (
    <Route
      path={[
        "/",
        "/books/:id",
        "/books/ny/otherbooks/:id",
        "/books/ny/allbest",
      ]}
      exact
    >
      <div
        className="right"
        css={css`
          position: fixed;
          top: 15%;
          width: 25%;
          right: 0;
          height: 100%;
        `}
      >
        <h6 className="text-center mt-4 mb-4">Editor's Picks</h6>
        <a target="_new" className="d-none fake-link" href="none">
          hidden link
        </a>
        <div
          onClick={(e) => {
            let target = e.target as HTMLImageElement;
            if (target.alt !== undefined) {
              let bookName = target.alt;
              let fakeLink: HTMLAnchorElement = document.querySelector(
                ".fake-link"
              );
              fakeLink.setAttribute("href", bookLinks[bookName]);
              fakeLink.click();
            }
            e.preventDefault();
          }}
          id="ourpicks"
          css={css`
            width: 50%;
            height: 250px;
            margin: auto;
            & img {
              height: 250px;
            }
            &:hover {
              cursor: pointer;
            }

            @media (min-width: 1300px) {
              width: 50%;
              height: 250px;
            }

            @media (min-width: 1600px) {
              width: 40%;
              height: 250px;
            }
          `}
        >
          <UncontrolledCarousel items={items} />
        </div>
        <Footer />
      </div>
    </Route>
  );
};
