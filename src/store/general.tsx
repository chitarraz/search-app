import { createSlice } from "@reduxjs/toolkit";

// define type
export interface GeneralState {
  isLoading: boolean,
  error: boolean,
  success: boolean,
}

// initial state
const initialState = {
  isLoading: false,
  error: false,
  success: false,
};

// create reducer and action creators
const general = createSlice({
  name: "general",
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
});

// export actions
export const { setValues, reset } = general.actions;

// export the reducer
export default general.reducer;