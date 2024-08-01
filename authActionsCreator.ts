import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import apiUrls from "../../constants/apiURLs";
import API from "../../services/httpService";
import { authHeader } from "../../constants/authenticationHeader";
import errorHandler from "../../services/errorhandler";

//login

export const login = createAsyncThunk(
  "auth/login",
  async (data: any = {}, { rejectWithValue }) => {
    const requestData: any = {};
    requestData.data = data;
    requestData.path = apiUrls.login();

    try {
      const response = await API.post(requestData);
      return response.data;
    } catch (err) {
      return rejectWithValue(errorHandler(err?.response?.data));
    }
  }
);

//register

export const register = createAsyncThunk(
  "auth/register",
  async (data: any = {}, { rejectWithValue }) => {
    const requestData: any = {};
    requestData.data = data;
    requestData.path = apiUrls.register();

    try {
      const response = await API.post(requestData);
      return response.data;
    } catch (err) {
      return rejectWithValue(errorHandler(err?.response?.data));
    }
  }
);

//verify user

export const verify = createAsyncThunk(
  "auth/verify",
  async (data: any = {}, { rejectWithValue }) => {
    const requestData: any = {};
    requestData.data = data;
    requestData.path = apiUrls.verifyUser();

    try {
      const response = await API.post(requestData);
      return response.data;
    } catch (err) {
      return rejectWithValue(errorHandler(err?.response?.data));
    }
  }
);

//reset password

export const passwordReset = createAsyncThunk(
  "auth/passwordReset",
  async (data: any = {}, { rejectWithValue }) => {
    const requestData: any = {};
    requestData.data = data;
    requestData.path = apiUrls.passwordReset();

    try {
      const response = await API.post(requestData);
      return response.data;
    } catch (err) {
      return rejectWithValue(errorHandler(err?.response?.data));
    }
  }
);

export const passwordResetConfirm = createAsyncThunk(
  "auth/passwordResetConfirm",
  async (data: any = {}, { rejectWithValue }) => {
    const requestData: any = {};
    requestData.data = data;
    requestData.path = apiUrls.passwordResetConfirm();

    try {
      const response = await API.post(requestData);
      return response.data;
    } catch (err) {
      return rejectWithValue(errorHandler(err?.response?.data));
    }
  }
);

//get profile
export const getProfile = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    let requestData: any = {};
    requestData.csrf = authHeader();
    requestData.path = apiUrls.getProfile();

    try {
      const response = await API.fetch(requestData);
      return response.data;
    } catch (err) {
      return rejectWithValue(errorHandler(err?.response?.data));
    }
  }
);

//update profile
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data: any, { rejectWithValue }) => {
    let requestData: any = {};
    requestData.data = data;
    requestData.csrf = authHeader();
    requestData.path = apiUrls.updateProfile();

    try {
      const response = await API.patch(requestData);
      return response.data;
    } catch (err) {
      return rejectWithValue(errorHandler(err?.response?.data));
    }
  }
);

//get All Buyers
export const getAllBuyers = createAsyncThunk(
  "auth/getAllBuyers",
  async (_, { rejectWithValue }) => {
    let requestData: any = {};
    requestData.csrf = authHeader();
    requestData.path = apiUrls.getAllBuyers();

    try {
      const response = await API.fetch(requestData);
      return response.data;
    } catch (err) {
      return rejectWithValue(errorHandler(err?.response?.data));
    }
  }
);

//logout

export const logout = createAction("auth/logout");
export const resetAuthResponses = createAction("auth/resetAuthResponse");
export const resetVerficationAlert = createAction("auth/resetVerficationAlert");
