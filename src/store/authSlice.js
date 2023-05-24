import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (values, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://bird-sounds-database.ssrlab.by/api/user-create/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(values)
      })
      if (!response.ok) {
        throw new Error('Some error delete request')
      }
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (values, { rejectWithValue }) => {
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
        throw new Error(errorMessage.non_field_errors);
      }
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);
export const checkAuth = createAsyncThunk(
  'auth/chekAuth',
  async (_, { rejectWithValue }) => {
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
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
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

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userName: null,
    password: null,
    firstName: null,
    lastName: null,
    isAuth: null,
    error: null,
    errorlogin: null,
    statusLogin: null,
    statusCreate: null,
    statusCheck: null,    
  },
  reducers: {
    setAuthStatus: (state, action) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.statusLogin = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.statusLogin = 'succeeded';
        state.userName = action.payload.username;
        localStorage.setItem('token', action.payload.token.access);
        localStorage.setItem('refreshToken', action.payload.token.refresh);
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
        localStorage.removeItem('refreshToken');;
        state.isAuth = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(checkAuth.pending, (state) => {
        
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.userName = action.payload.username;
        state.isAuth = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuth = false;
      })
  }
})
export const { setAuthStatus } = authSlice.actions;

export default authSlice.reducer