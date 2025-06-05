import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.goit.global/";

/*
 * POST @ /users/signup
 * body: { name, email, password }
 *
 * After successful registration, add the token to the HTTP header
 */

export const register = createAsyncThunk(
  "auth/register",
  async (values, thunkAPI) => {
    try {
      const res = await axios.post("/users/signup", values);
      axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      return res.data;
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);
/*
 * POST @ /users/login
 * body: { email, password }
 *
 * After successful login, add the token to the HTTP header
 */
export const logIn = createAsyncThunk(
  "auth/login",
  async (values, thunkAPI) => {
    try {
      const res = await axios.post("/users/login", values);
      axios.defaults.headers.Authorization = `Bearer ${res.data.token}`;
      return res.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

//  * POST @ /users/logout
//  * headers: Authorization: Bearer token
//  *
//  * After a successful logout, remove the token from the HTTP header

export const logOut = createAsyncThunk("auth/logout", async () => {
  const res = await axios.post("/users/logout");
  return res.data;
});

export const refreshUser = createAsyncThunk("auth/refresh", async () => {});
