import { createSlice } from "@reduxjs/toolkit";
import * as authActionsCreator from "../actionCreators/authActionsCreator";
import storage from "../../services/storageService";
import storageService from "../../services/storageService";
import userRoles from "../../constants/userRoles";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    auth: storage.getJWTToken() ? true : false,
    user: storage.getUser() || null,
    response: null,
    updateSuccess: false,
    updateError: null,
    updateLoading: false,
    profile: null,
    error: null,
    verificationAlert: null,
    allBuyers: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      //login
      .addCase(authActionsCreator.login.pending, (state) => {
        state.loading = true;
        state.response = null;
        state.error = null;
      })
      .addCase(authActionsCreator.login.fulfilled, (state, action) => {
        storage.setJWTToken(action.payload?.access);
        state.loading = false;
        state.response = action.payload;
        storage.setUser(action.payload?.user_data);
        state.user = action.payload?.user_data;
        state.auth = true;
        state.error = null;
      })
      .addCase(authActionsCreator.login.rejected, (state, action) => {
        state.loading = false;
        state.response = null;
        state.user = null;
        state.auth = false;
        state.error = action.payload;
        storage.clearJWTToken();
      })

      //register
      .addCase(authActionsCreator.register.pending, (state) => {
        state.loading = true;
        state.response = null;
        state.error = null;
      })
      .addCase(authActionsCreator.register.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationAlert = {
          text: "Account created successfully!",
          detail: "A link to verify your account has been emailed to you.",
        };

        state.response = action.payload;
        state.error = null;
      })
      .addCase(authActionsCreator.register.rejected, (state, action) => {
        state.loading = false;
        state.response = null;
        state.error = action.payload;
      })

      //getProfile
      .addCase(authActionsCreator.getProfile.pending, (state) => {
        state.loading = true;
        state.profile = null;
        state.error = null;
      })
      .addCase(authActionsCreator.getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(authActionsCreator.getProfile.rejected, (state, action) => {
        state.loading = false;
        state.profile = null;
        state.error = action.payload;
      })

      //updateProfile
      .addCase(authActionsCreator.updateProfile.pending, (state) => {
        state.updateLoading = true;
        state.updateSuccess = null;
        state.updateError = null;
      })
      .addCase(authActionsCreator.updateProfile.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = true;
        state.profile = action.payload;
        state.updateError = null;
      })
      .addCase(authActionsCreator.updateProfile.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = false;
        state.updateError = action.payload;
      })

      //getAllBuyers
      .addCase(authActionsCreator.getAllBuyers.pending, (state) => {
        state.loading = true;
        state.allBuyers = null;
        state.error = null;
      })
      .addCase(authActionsCreator.getAllBuyers.fulfilled, (state, action) => {
        state.loading = false;
        state.allBuyers = action.payload.filter(
          (buyer) => buyer.user.role === userRoles.buyer
        );
        state.error = null;
      })
      .addCase(authActionsCreator.getAllBuyers.rejected, (state, action) => {
        state.loading = false;
        state.allBuyers = null;
        state.error = action.payload;
      })

      //verify
      .addCase(authActionsCreator.verify.pending, (state) => {
        state.loading = true;
        state.response = null;
        state.error = null;
      })
      .addCase(authActionsCreator.verify.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationAlert = {
          text: "Congratulations!",
          detail: "Your account is verified.",
        };
        state.response = action.payload;
        state.error = null;
      })
      .addCase(authActionsCreator.verify.rejected, (state, action) => {
        state.loading = false;
        state.response = null;
        state.verificationAlert = action.payload;
        state.error = action.payload;
      })

      //password reset
      .addCase(authActionsCreator.passwordReset.pending, (state) => {
        state.loading = true;
        state.response = null;
        state.error = null;
      })
      .addCase(authActionsCreator.passwordReset.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationAlert = {
          text: "Email Sent!",
          detail: "A link to reset your password has been emailed to you.",
        };
        state.response = action.payload;
        state.error = null;
      })
      .addCase(authActionsCreator.passwordReset.rejected, (state, action) => {
        state.loading = false;
        state.response = null;
        state.error = action.payload;
      })
      .addCase(authActionsCreator.passwordResetConfirm.pending, (state) => {
        state.loading = true;
        state.response = null;
        state.error = null;
      })
      .addCase(
        authActionsCreator.passwordResetConfirm.fulfilled,
        (state, action) => {
          state.loading = false;
          state.verificationAlert = {
            text: "Success!",
            detail: "Your password has been reset successfully.",
          };
          state.response = action.payload;
          state.error = null;
        }
      )
      .addCase(
        authActionsCreator.passwordResetConfirm.rejected,
        (state, action) => {
          state.loading = false;
          state.response = null;
          state.error = action.payload;
        }
      )

      //logout
      .addCase(authActionsCreator.logout, (state) => {
        state.auth = false;
        state.user = null;
        state.error = null;
        state.response = null;
        storageService.clearStorage();
      })
      .addCase(authActionsCreator.resetAuthResponses, (state) => {
        state.response = null;
        state.error = null;
        state.updateSuccess = false;
        state.updateError = null;
      })
      .addCase(authActionsCreator.resetVerficationAlert, (state) => {
        state.verificationAlert = null;
      });
  },
});

export default authSlice.reducer;
