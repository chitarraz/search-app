// search api call
import { createAsyncThunk } from "@reduxjs/toolkit";

import { pageSize } from "../config/variables";
import {AppMS} from ".";

// Suggestions
export const GetSuggestions = createAsyncThunk<object, object, {rejectValue: object}>(
  "search/getSuggestions", 
  async (param: object, {rejectWithValue}) => {
    const params = {
      ...param, // for future dynamic api, get suggestion base on searchText
    };
    try {
      const response = await AppMS.get("e026dab444155edf2f52122aefbb80347c68de86/suggestion.json", {params});
      return response.data;
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  },
);

// Search
export const GetSearchResults = createAsyncThunk<object, object, {rejectValue: object}>(
  "search/getSearchResults", 
  async (param: object, {rejectWithValue}) => {
    const params = {
      ...param,  // for future dynamic api, get search result base on searchText, page
      pageSize
    };
    try {
      const response = await AppMS.get("44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json", {params});
      return response.data;
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  },
);