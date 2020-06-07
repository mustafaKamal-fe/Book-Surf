/**@jsx jsx */
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "../comps/NotFoundPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { css, jsx } from "@emotion/core";

const AboutMe = () => {
  return (
    <div className="container">
      <div className="text-center">
        <Typography variant="h3">Hi</Typography>
        <Typography className="lead mt-4">You can reach me at:</Typography>
        <div className="text-center mt-4">
          <a href="https://twitter.com/gist32091948" target="_new">
            <FontAwesomeIcon
              color="#1da1f2"
              icon={["fab", "twitter"]}
              css={css`
                font-size: 1.8rem;
                margin: 0 0.8rem;
                &:hover {
                  cursor: pointer;
                }
              `}
            />
          </a>
          <a href="https://github.com/mustafaKamal-fe" target="_new">
            <FontAwesomeIcon
              color="black"
              icon={["fab", "github"]}
              css={css`
                font-size: 1.8rem;
                margin: 0 0.8rem;
                &:hover {
                  cursor: pointer;
                }
              `}
            />
          </a>
          <a href="https://www.imustafa.com/" target="_new">
            <FontAwesomeIcon
              icon="link"
              css={css`
                font-size: 1.8rem;
                margin: 0 0.8rem;
                &:hover {
                  cursor: pointer;
                }
              `}
            />
          </a>
        </div>
        <Typography className="lead mt-4">
          Book Surf<sup>&copy;</sup> is an open source project with main goal:
          Make books searching easier. if you think you can help, please see the
          project on github.
        </Typography>

        <Button
          css={css`
            background-color: lightgray;
            margin-top: 1rem;
          `}
        >
          <FontAwesomeIcon
            icon={["fab", "github"]}
            className="mr-2"
          ></FontAwesomeIcon>
          <span>Github</span>
        </Button>
      </div>
    </div>
  );
};

export const About = () => {
  return (
    <div>
      <Switch>
        <Route path="/about/creator" render={AboutMe} />
        <Route
          path="*"
          render={() => {
            return <NotFoundPage />;
          }}
        />
      </Switch>
    </div>
  );
};
