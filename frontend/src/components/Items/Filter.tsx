import React from "react";
import Dropdown from "../Global/Dropdown";
type TProps = {
  value: any;
  onChange: (val: any) => void;
};
function Filter(props: TProps) {
  function handleChange(e) {
    props.onChange(e.target.value);
  }
  return (
    <div>
      <Dropdown
        fullWidth
        style={{ width: 200 }}
        id="outlined-basic-time-frame"
        label="Items Filter"
        variant="outlined"
        name="filter"
        type="text"
        value={props.value}
        onChange={handleChange}
        options={["all", "open", "completed"].map((item) => ({
          label: item,
          value: item,
        }))}
      />
    </div>
  );
}

export default Filter;
