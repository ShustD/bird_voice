import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { resetError } from "./collectionSlice";

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (values, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`https://bird-sounds-database.ssrlab.by/api/user-create/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(values)
      })
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }
      dispatch(resetError())
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (values, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`https://bird-sounds-database.ssrlab.by/api/login-api/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(values)
      })

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }
      dispatch(resetError())
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);
export const checkAuth = createAsyncThunk(
  'auth/chekAuth',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`https://bird-sounds-database.ssrlab.by/api/account/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })      
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.non_field_errors);
      }
      dispatch(resetError())
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, dispatch }) => {
    const token = {
      refresh: localStorage.getItem('refreshToken')
    }
    try {
      const response = await fetch(`https://bird-sounds-database.ssrlab.by/api/logout/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json", 
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(token)
      })
      
      if (!response.ok) {
        if (response.status === 401) {
    
          dispatch(setAuthStatus(false));
        }
        const errorMessage = await response.json();
        throw new Error(errorMessage.non_field_errors);
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    const token = {
      refresh: localStorage.getItem('refreshToken')
    }
    try {
      const response = await fetch(`https://bird-sounds-database.ssrlab.by/api/refresh-token/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(token)
      })
      
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.non_field_errors);
      }
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const addPhoto = createAsyncThunk(
  'auth/addPhoto',
  async (photo, { rejectWithValue, dispatch }) => {
    const formData = new FormData();
    formData.append('profile_pic', photo)
    try {
      const response = await fetch(`https://bird-sounds-database.ssrlab.by/api/account/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      })      
      if (!response.ok) {
        if (response.status === 401) {
    
          dispatch(setAuthStatus(false));
        }
        const errorMessage = await response.json();
        throw new Error(errorMessage.non_field_errors);
      }
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userName: null,
    password: null,
    firstName: null,
    lastName: null,
    isAuth: null,
    error: null,
    statusLogin: null,
    statusCreate: null,
    statusCheck: null,
    avatarUrl: null    
  },
  reducers: {
    setAuthStatus: (state, action) => {
      state.isAuth = action.payload;
    },
    resetAuthError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.statusLogin = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.statusLogin = 'succeeded';
        state.userName = action.payload.user.username;
        localStorage.setItem('token', action.payload.token.access);
        localStorage.setItem('refreshToken', action.payload.token.refresh);
        state.avatarUrl = action.payload.user.account[0].profile_pic
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.statusLogin = 'failed';
        state.error = action.payload;
      })

      .addCase(createUser.pending, (state) => {
        state.statusCreate = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.statusCreate = 'succeeded';
        localStorage.setItem('token', action.payload.token.access);
        localStorage.setItem('refreshToken', action.payload.token.refresh);
        state.userName = action.payload.user.username;
        state.isAuth = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.statusCreate = 'failed';
        state.error = action.payload;
      })
      
      .addCase(logout.pending, (state) => {
        
      })
      .addCase(logout.fulfilled, (state, action) => {        
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        state.userName = null;        
        state.avatarUrl = null
        state.isAuth = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(checkAuth.pending, (state) => {
        
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.avatarUrl = action.payload.account[0].profile_pic
        state.userName = action.payload.username;
        state.isAuth = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuth = false;
      })

      .addCase(addPhoto.fulfilled, (state, action) => {        
        state.avatarUrl = action.payload.profile_pic;
      })
      .addCase(addPhoto.rejected, (state, action) => {
        state.error = action.payload;
      })
  }
})
export const { setAuthStatus, resetAuthError } = authSlice.actions;

export default authSlice.reducer