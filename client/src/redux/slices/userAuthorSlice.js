import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {axiosWithToken} from '../../axiosWithToken'

export const userAuthorLoginThunk = createAsyncThunk(
  'user-author-login',
  async (userCredObj, thunkApi) => {
    try {
      let res;
      if (userCredObj.userType === 'user') {
        res = await axios.post('http://localhost:4000/user-api/login', userCredObj);
      } else if (userCredObj.userType === 'admin') {
        res = await axios.post('http://localhost:4000/admin-api/login', userCredObj);
      } else {
        return thunkApi.rejectWithValue('Invalid user type');
      }

      if (res.data.message === 'Login success') {
        localStorage.setItem('token', res.data.token);
        return res.data; // ensure this has a 'user' or 'admin' property
      } else {
        return thunkApi.rejectWithValue(res.data.message);
      }
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const userAuthorSlice = createSlice({
  name: 'user-author-slice',
  initialState: {
    isPending: false,
    loginUserStatus: false,
    currentUser: {}, // Store current user or admin information
    errorOccured: false,
    errMsg: ''
  },
  reducers: {
    resetState: (state) => {
      state.isPending = false;
      state.loginUserStatus = false;
      state.currentUser = {};
      state.errorOccured = false;
      state.errMsg = '';
    },
  },
  extraReducers: (builder) => builder
    .addCase(userAuthorLoginThunk.pending, (state) => {
      state.isPending = true;
    })
    .addCase(userAuthorLoginThunk.fulfilled, (state, action) => {
      state.isPending = false;
      if (action.payload && (action.payload.user || action.payload.admin)) {
        state.currentUser = action.payload.user || action.payload.admin;
        state.loginUserStatus = true;
        state.errMsg = '';
        state.errorOccured = false;
      } else {
        state.currentUser = {};
        state.loginUserStatus = false;
        state.errMsg = 'Login failed: Invalid response from server';
        state.errorOccured = true;
      }
    })
    .addCase(userAuthorLoginThunk.rejected, (state, action) => {
      state.isPending = false;
      state.currentUser = {};
      state.loginUserStatus = false;
      state.errMsg = action.payload || 'Login failed';
      state.errorOccured = true;
    })
});

export const { resetState } = userAuthorSlice.actions;
export default userAuthorSlice.reducer;
