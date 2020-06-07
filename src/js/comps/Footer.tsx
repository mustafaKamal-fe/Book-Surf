/**@jsx jsx */
import { jsx, css } from "@emotion/core";

const Footer = () => {
  return (
    <footer
      css={css`
        text-align: center;
        margin-top: 1rem;
        font-size: 14px;
        & a {
          & :hover {
            cursor: pointer;
          }
        }
      `}
    >
      <span
        css={css`
          font-size: 12px;
        `}
      >
        Nutreader<sup>&copy;</sup> {new Date().getFullYear()}
      </span>
      {/* uncomment this line to add real links for the generated p&P and terms & conditions */}
      {/* <div
        css={css`
          font-size: 11px;
        `}
      >
        <a className="mr-2" href="www" target="_new">
          Terms & Conditions
        </a>
        <a href="www" target="_new">
          Privacy Policy
        </a>
      </div> */}
    </footer>
  );
};
export default Footer;
