import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
type TSelect = {
  helperText?: string;
  options: {
    label: string;
    value: any;
  }[];
};
export default function Dropdown(props: SelectProps & TSelect) {
  const { options, ...rest } = props;
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-helper-label">{rest.label}</InputLabel>
      <Select {...rest}>
        {options.map((item) => (
          <MenuItem value={item.value} key={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {rest.error && (
        <FormHelperText style={{ color: "red" }}>
          {rest.helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
