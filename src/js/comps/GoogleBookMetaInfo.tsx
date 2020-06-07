/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import FaceRoundedIcon from "@material-ui/icons/Face";
import CategoryRoundedIcon from "@material-ui/icons/CategoryRounded";
import { CardHeader } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core";
import styled from "styled-components";

const useStyles = makeStyles({
  cardHeader: {
    padding: "0",
    marginRight: "1rem",
    color: "#826666",
  },
  avatarBg: {
    backgroundColor: "#f3f3f3",
  },
});
const CustomFaceRoundedIcon = styled(FaceRoundedIcon)`
  color: indigo;
`;

const MyCategoryRoundedIcon = styled(CategoryRoundedIcon)`
  color: indigo;
`;

const GoogleBookMetaInfo = (props: any) => {
  const { bookData } = props;
  const classes = useStyles();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      `}
      title={bookData.volumeInfo.authors}
    >
      {bookData.volumeInfo.authors !== undefined && (
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar aria-label="author" className={classes.avatarBg}>
              <CustomFaceRoundedIcon />
            </Avatar>
          }
          title={
            bookData.volumeInfo.authors.length > 1
              ? bookData.volumeInfo.authors[0].split(" ").length > 1
                ? bookData.volumeInfo.authors[0].split(" ")[0] + "..."
                : bookData.volumeInfo.authors[0]
              : bookData.volumeInfo.authors[0].split(" ").length > 3
              ? bookData.volumeInfo.authors[0].split(" ")[0] + "..."
              : bookData.volumeInfo.authors[0]
          }
        />
      )}

      {bookData.volumeInfo.categories !== undefined && (
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar aria-label="category" className={classes.avatarBg}>
              <MyCategoryRoundedIcon />
            </Avatar>
          }
          title={
            bookData.volumeInfo.categories.length > 1
              ? bookData.volumeInfo.categories[0].split(" ").length > 1
                ? bookData.volumeInfo.categories[0].split(" ")[0] + "..."
                : bookData.volumeInfo.categories[0]
              : bookData.volumeInfo.categories[0].split(" ").length > 3
              ? bookData.volumeInfo.categories[0].split(" ")[0] + "..."
              : bookData.volumeInfo.categories[0]
          }
        />
      )}
    </div>
  );
};

export default GoogleBookMetaInfo;
