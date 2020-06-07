/** @jsx jsx */
import { useState, useContext, Fragment, Dispatch } from "react";
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

const OneCatg = ({ setFormData }: { setFormData: Dispatch<any> }) => {
  const nyTimesContext = useContext(NyList);
  const [list, setlist] = useState("");
  const [date, setDate] = useState("");
  const [validateList, setValidateList] = useState(false);
  const [overlay, setOverlay] = useContext(OvrlayContext);
  return (
    <Fragment>
      <Label for="ny-list" className="mt-3">
        <h6 className="d-inline">
          Categories<small>*</small>
        </h6>
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
        <option>See Categories</option>
        {nyTimesContext.map((list, id) => {
          return (
            <option key={id} value={list}>
              {list}
            </option>
          );
        })}
      </Input>
      <Label for="ny-list">
        <h6 className="d-inline">Date</h6> <small>(optional)</small>
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
        css={css`
          width: 30%;
          margin: 2rem 0;
        `}
        className="btn"
        color="primary"
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
                method: "one-catg",
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
    </Fragment>
  );
};
export default OneCatg;
