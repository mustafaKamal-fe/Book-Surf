/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const fadeEntrance = keyframes`
from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;

const ContributeMessage = () => {
  return (
    <div>
      <p
        className="mt-2 mx-2 p-2"
        css={css`
          --animate-duration: 1.5s;
          animation-name: ${fadeEntrance};
          animation-duration: calc(var(--animate-duration) * 0.75);
          animation-fill-mode: both;
        `}
      >
        Nutreader<sup>&copy;</sup> is an open source project that aims to help
        people find their next book they want to read. Please consider
        contributing to this project.
      </p>
      <button className="btn btn-primary d-table mx-auto">
        Contribute <FontAwesomeIcon icon={["fab", "github"]} />
      </button>
    </div>
  );
};

export default ContributeMessage;
