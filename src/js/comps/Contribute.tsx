/**@jsx jsx */
import { useState } from "react";
import { jsx, css } from "@emotion/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import axios from "axios";
import { Spinner } from "reactstrap";
import { Typography } from "@material-ui/core";

export const Contribute = () => {
  // eslint-disable-next-line
  const [mains, setMains] = useState([]);
  const names = ["mustafaKamal-fe"];

  const [maintainers, setMaintainers] = useState([]);
  const [displayNames, setDisplayNames] = useState(false);

  useEffect(() => {
    names.forEach((name, i) => {
      axios
        .get(
          `https://api.github.com/users/${name}?client_id=${process.env.REACT_APP_GITHUB_KEY}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`
        )
        .then((res) => {
          setMaintainers((data) =>
            [].concat(...data, {
              avatar: res.data.avatar_url,
              link: res.data.html_url,
              name: res.data.login,
            })
          );
          if (i >= names.length - 1) {
            setDisplayNames(true);
          }
        });
    });

    //  eslint-disable-next-line
  }, []);

  return (
    <div
      className="container"
      css={css`
        font-size: 14px;
      `}
    >
      <div className="row text-center">
        <Typography variant="subtitle1">
          {" "}
          <b className="mr-1">
            Book Surf<sup>&copy;</sup>
          </b>
          is an open source project that primarly helps users search and find
          books easily. If you would like to help grow this project, checkout
          the Github repo below.
        </Typography>
        <div className="col-12">
          <div className="btn btn-primary mt-4">
            Contribute <FontAwesomeIcon icon={["fab", "github"]} />
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <Typography variant="h6">Maintainers</Typography>
        <div
          css={css`
            padding: 1rem;
            margin-top: 2rem;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(30px, 50px));
            grid-column-gap: 5px;
            justify-content: center;
          `}
          className="col-12"
        >
          {displayNames ? (
            maintainers.map((person: any, i: number) => {
              return (
                <div key={i}>
                  {/* {JSON.stringify(person, null, " ")} */}
                  <a href={person.link} target="_new">
                    <img
                      title={person.name}
                      css={css`
                        width: 55px;
                        height: 50px;
                        border-radius: 50px;
                      `}
                      src={person.avatar}
                      alt={person.name}
                      className="img-fluid"
                    ></img>
                  </a>
                </div>
              );
            })
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
};
