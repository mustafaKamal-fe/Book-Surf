/** @jsx jsx */
import { Fragment, useState, Dispatch, useContext } from "react";
import { Input, Label, Button } from "reactstrap";
import { jsx, css } from "@emotion/core";
import OverlayContex from "../../overlayContext/OverlayContext";

const AllBest = ({ setFormData }: { setFormData: Dispatch<any> }) => {
  const [overlay, setOverlay] = useContext(OverlayContex);
  const [author, setAuthor] = useState("");
  const [contributor, setContributor] = useState("");
  const [price, setPrice] = useState("");
  const [publisher, setpublisher] = useState("");
  const [title, setTitle] = useState("");
  const inputStyles = css`
    width: 75%;
    margin: auto;
    border: none;
    border-bottom: 1px solid;
    border-radius: 0;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  `;

  return (
    <Fragment>
      <Label className="mt-2">
        <h6 className="d-inline">Author</h6> <small> (optional)</small>
      </Label>

      <Input
        bsSize="sm"
        css={inputStyles}
        type="text"
        id="author"
        name="author"
        placeholder="Author Name"
        onChange={(e) => setAuthor(e.target.value)}
      ></Input>

      <Label className="mt-2">
        <h6 className="d-inline">Contributor</h6> <small> (optional)</small>
      </Label>

      <Input
        bsSize="sm"
        css={inputStyles}
        type="text"
        id="contributor"
        name="contributor"
        placeholder="Contributor Name"
        onChange={(e) => setContributor(e.target.value)}
      ></Input>

      <Label className="mt-2">
        <h6 className="d-inline">Price</h6> <small> (optional)</small>
      </Label>

      <Input
        bsSize="sm"
        css={inputStyles}
        type="number"
        step={0.1}
        id="price"
        name="price"
        placeholder="$9.99"
        onChange={(e) => setPrice(e.target.value)}
      ></Input>

      <Label className="mt-2">
        <h6 className="d-inline">Publisher</h6> <small> (optional)</small>
      </Label>

      <Input
        bsSize="sm"
        css={inputStyles}
        type="text"
        id="publisher"
        name="publisher"
        placeholder="Publisher Name"
        onChange={(e) => setpublisher(e.target.value)}
      ></Input>

      <Label className="mt-2">
        <h6 className="d-inline">Title</h6> <small> (optional)</small>
      </Label>

      <Input
        bsSize="sm"
        css={inputStyles}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        id="title"
        name="title"
        placeholder="Title"
      ></Input>
      <Button
        color="primary"
        size="sm"
        css={css`
          width: 30%;
          border-radius: 15px;
          margin: 2rem 0;
        `}
        className="btn"
        onClick={(e) => {
          setFormData({
            searchProtocol: {
              method: "all-best",
              api: "ny",
            },
            publisher,
            author,
            price,
            contributor,
            title,
          });
          setOverlay(!overlay);
        }}
      >
        Find
      </Button>
    </Fragment>
  );
};

export default AllBest;
