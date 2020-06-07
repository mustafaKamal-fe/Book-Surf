/** @jsx jsx */
import { useState, useContext, Dispatch } from "react";
import { Button, Label, Input } from "reactstrap";
import { NyList } from "../../NyContext/NyContext";
import { jsx, css } from "@emotion/core";
import OvrlayContext from "../../overlayContext/OverlayContext";

const inputStyles = css`
  width: 75%;
  margin: auto;
  border: none;
  border-bottom: 1px solid;
  border-radius: 0;

  &:focus {
    box-shadow: none;
  }
`;

const TopFive = ({ setFormData }: { setFormData: Dispatch<any> }) => {
  const [overlay, setOverlay] = useContext(OvrlayContext);

  // const history = useHistory();
  const nyTimesContext = useContext(NyList);
  // eslint-disable-next-line
  const [list, setlist] = useState("");
  const [date, setDate] = useState("");
  // eslint-disable-next-line
  const [validateList, setValidateList] = useState(false);

  return (
    <div>
      <Label for="ny-list" className="mt-3">
        <h6 className="d-inline">Categories</h6>
      </Label>
      <Input
        bsSize="sm"
        css={inputStyles}
        invalid={validateList}
        type="select"
        name="ny-list"
        id="ny-list"
        onChange={(e) => {
          setlist(e.target.value);
          if (validateList) setValidateList(false);
        }}
      >
        <option>See categories</option>
        {nyTimesContext.map((list, id) => {
          return (
            <option key={id} value={list}>
              {list}
            </option>
          );
        })}
      </Input>
      <Label for="ny-list" className="mt-3">
        <h6 className="d-inline">Date </h6>
        <small>(optional)</small>
      </Label>
      <Input
        bsSize="sm"
        css={inputStyles}
        type="date"
        onChange={(e) => {
          setDate(e.target.value);
        }}
        name="date"
        id="date"
      ></Input>

      <Button
        size="sm"
        className="btn"
        color="primary"
        css={css`
          width: 30%;
          margin: 2rem 0;
        `}
        onClick={(e) => {
          e.preventDefault();

          if (list === "") {
            setValidateList(true);
          } else {
            // close serach slide bar
            setOverlay(!overlay);
            setValidateList(false);
            setFormData({
              searchProtocol: {
                method: "top-five",
                api: "ny",
              },
              list,
              date: date === "" ? "current" : date,
            });
          }
        }}
      >
        Find
      </Button>
    </div>
  );
};
export default TopFive;
