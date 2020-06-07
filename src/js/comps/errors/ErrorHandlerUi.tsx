/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import { ErrorResponse } from "../../typed/TypedExports";
import Typography from "@material-ui/core/Typography";

interface Props {
  data: ErrorResponse & { isNotAvailable: boolean };
}

export const ErrorHandlerUi = ({ data }: Props) => {
  return (
    <div
      css={css`
        z-index: 1;
        text-align: center;
      `}
    >
      {data.isNotAvailable === true ? (
        <Typography variant="h6">
          No data was found. Please try a different search.
        </Typography>
      ) : (
        <Typography variant="h6">
          <p>{data.message}</p>
        </Typography>
      )}
    </div>
  );
};
