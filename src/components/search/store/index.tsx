import { createSlice } from "@reduxjs/toolkit";
import { GetSearchResults, GetSuggestions } from "../../../services/SearchService";
import { SearchItem } from "../interfaceType";
import { Filter } from "../../../config/functions";

// define type
interface SuggestionResultPayload {
  stemmedQueryTerm: string,
  suggestions: string[],
}

interface SearchResultPayload {
  TotalNumberOfResults: number,
  ResultItems: SearchItem[],
}

export interface SearchState {
  filter: Filter,
  suggestions: string[],
  totalCount: number,
  result: SearchItem[],
}

// initial state
const initialState: SearchState = {
  filter: {},
  suggestions: [],
  totalCount: 0,
  result: [],
};

// create reducer and action creators
const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    setValues: (state, {payload}) => {
      return {
        ...state,
        ...payload
      }
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetSuggestions.fulfilled, (state, action) => {
        const payload = action.payload as SuggestionResultPayload;
        state.suggestions = payload.suggestions;
      })
      .addCase(GetSearchResults.fulfilled, (state, action) => {
        const payload = action.payload as SearchResultPayload;
        state.totalCount = payload.TotalNumberOfResults;
        state.result = payload.ResultItems;
      })
  },
});

// export actions
export const { setValues, reset } = search.actions;

// export the reducer
export default search.reducer;