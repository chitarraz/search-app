// Search bar
import React, {useState, useEffect} from "react";
// @mui/material
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
// @mui/icons-material
import SearchIcon from '@mui/icons-material/Search';
// service + store
import { useAppSelector } from "../../hooks/hooks";
import { useAppDispatch } from "../../store";
import { GetSuggestions } from "../../services/SearchService";
// css
import styles from "../../assets/css/search/searchBar.module.scss";
import { setValues } from "./store";

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.search.filter);
  const suggestions = useAppSelector(state => state.search.suggestions);
  const [searchText, setSearchText] = useState<string>('');

  const handleOnEnter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // on enter key, form submit
  }

  const handleAutocomplete = (value: string | null) => {
    dispatch(setValues({filter: {searchText: value, page: 1}})); // update search value in store (on enter/click) when searchText change, reset page to 1
  };

  // on user input, get suggestions
  useEffect(() => {
    if(searchText?.length > 1) {  // get suggestion when more than 2 char
      dispatch(GetSuggestions({searchText}));
    }
  },[dispatch, searchText]);

  useEffect(() => {
    if (filter.searchText) {
      setSearchText(String(filter.searchText) ?? "");
    }
  },[filter]);

  return (
    <div className={styles.container}>
      <form className={styles.textfieldContainer} onSubmit={(e) => handleOnEnter(e)}>
        <Autocomplete
          id="search"
          freeSolo
          fullWidth
          className={styles.textfield}
          inputValue={searchText}
          options={suggestions.slice(0, 6)} // get first 6 values
          onChange={(e, value) => handleAutocomplete(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              id="search"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                ...params.InputProps,
              }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          )}
        />
        <Button type="submit" className={styles.button} variant="contained" startIcon={<SearchIcon />}>
          Search
        </Button>
      </form>
    </div>
  );
}

export default SearchBar;