import { TextField } from "@mui/material";

interface Props {
  query: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ query, onChange }: Props) => (
  <TextField
    fullWidth
    variant="outlined"
    value={query}
    onChange={(e) => onChange(e.target.value)}
    sx={{ mb: 3 }}
  />
);

export default SearchBar;
