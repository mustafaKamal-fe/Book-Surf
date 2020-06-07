/** @jsx jsx */
import { useState, lazy, Suspense, Dispatch } from "react";
import { FormGroup, Spinner } from "reactstrap";
import { jsx, css } from "@emotion/core";
const TopFive = lazy(() => import("./Ny/TopFive"));
const OneCatg = lazy(() => import("./Ny/OneCatg"));
const AllBest = lazy(() => import("./Ny/AllBest"));
const Load = () => {
  return <Spinner color="primary"></Spinner>;
};
const NyForm = ({ setFormData }: { setFormData: Dispatch<any> }) => {
  const [whatForm, setWhatForm] = useState("");

  return (
    <div
      css={css`
        margin-top: 1rem;
        text-align: center;
        padding-top: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <h6>
        New York Times<sup>&copy;</sup> Bestsellers
      </h6>
      <small>
        Get the best of New York Times<sup>&copy;</sup>
      </small>

      <FormGroup>
        <select
          css={css`
            margin: auto;
            margin-top: 1rem;
          `}
          name="whatForm"
          id="whatform"
          onChange={(e) => setWhatForm(e.target.value)}
          onBlur={(e) => setWhatForm(e.target.value)}
        >
          <option>See your options</option>
          <option value="top-five">Top Five</option>
          <option value="one-subject">By Category</option>
          <option value="all-best">All Best Sellers</option>
        </select>
      </FormGroup>
      <Suspense
        fallback={
          <div>
            <Load />
          </div>
        }
      >
        {whatForm === "top-five" && <TopFive setFormData={setFormData} />}
        {whatForm === "one-subject" && <OneCatg setFormData={setFormData} />}
        {whatForm === "all-best" && <AllBest setFormData={setFormData} />}
      </Suspense>
    </div>
  );
};

export default NyForm;
