/**@jsx jsx */
import { RefObject } from "react";
import { css, jsx } from "@emotion/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface navBackProps {
  refTo: RefObject<HTMLDivElement>;
  handleClick: () => void;
  styleClass?: string;
  onMobile?: string;
}

const Navback = ({
  refTo,
  handleClick,
  styleClass,
  onMobile,
}: navBackProps) => {
  return (
    <div
      ref={refTo}
      className={styleClass}
      onClick={handleClick}
      css={css`
        padding: 1rem;
        height: auto;
        border-bottom: ${onMobile !== "true" && "1px solid #f3f3f3"};
      `}
    >
      <span
        css={css`
          padding: 0.6rem 0.8rem;
          border-radius: 50px;
          background-color: #f3f3f3;
          &:hover {
            cursor: pointer;
            background-color: #ebebeb;
          }
        `}
      >
        {" "}
        <FontAwesomeIcon icon="arrow-left" />{" "}
      </span>
    </div>
  );
};
export default Navback;
