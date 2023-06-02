import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthStatus } from "./authSlice";

export const fetchCollection = createAsyncThunk(
  'collection/fetchCollection',
  async function (url, { rejectWithValue, dispatch }) {
     
    try {
      const response = await fetch(`${url}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (!response.ok) {
        if (response.status === 401) {
          
          dispatch(setAuthStatus(false));
        }
        const errorMessage = await response.json();
        throw new Error(errorMessage.detail);
      }
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const collectionUpdate = createAsyncThunk(
  'collection/update',
  async (arg, { rejectWithValue, dispatch }) => {    
    const { isCheck, key, deleted, validated } = arg
    try {
      const body = isCheck.map((id) => ({ id, [key]: deleted }))
      const response = await fetch(`https://bird-sounds-database.ssrlab.by/api/audio_list_views/?deleted=${!deleted}&validated=${validated}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body),
        redirect: 'follow'
      })
      if (!response.ok) {
        if (response.status === 401) {
          
          dispatch(setAuthStatus(false));
        }
        throw new Error('Some error update request')
      }
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const collectionAddNew = createAsyncThunk(
  'collection/collectionAddNew',
  async (values, { rejectWithValue, dispatch }) => {
    const formData = new FormData();
    for (const key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        formData.append(key, values[key]);
      }
    }
    try {
      const response = await fetch(`https://bird-sounds-database.ssrlab.by/api/audio_list_views/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
        redirect: 'follow'
      })
      if (!response.ok) {
        if (response.status === 401) {          
          dispatch(setAuthStatus(false));
        }
        throw new Error('Some error add new request')
      }
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);



export const collectionDeleteItem = createAsyncThunk(
  'collection/collectionDeleteItem',
  async (id, {dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`https://bird-sounds-database.ssrlab.by/api/audio_list_views/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
      if (!response.ok) {
        if (response.status === 401) {          
          dispatch(setAuthStatus(false));
        }
        throw new Error('Some error delete request')
      }
      dispatch(fetchCollection('https://bird-sounds-database.ssrlab.by/api/audio_list_views/?deleted=true'))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);


const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    collection: [],
    status: null,
    error: null,    
    count: null,
    prev: null,
    next: null,
    statusAdd: null,
    errorAdd: null,
    currentPage: null
  },
  reducers: {
    resetAddState: (state) => {
      state.statusAdd = null
      state.errorAdd = null
    },
    resetError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollection.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCollection.fulfilled, (state, action) => {
        Object.assign(state, collectionSlice.initialState);
        state.status = 'succeeded';
        state.collection = action.payload.results;
        state.prev = action.payload.previous;
        state.next = action.payload.next
        state.count = action.payload.count
        state.currentPage = action.payload.current
      })
      .addCase(fetchCollection.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(collectionUpdate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(collectionUpdate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.collection = action.payload.results;
        state.prev = action.payload.previous;
        state.next = action.payload.next
        state.count = action.payload.count
        state.currentPage = action.payload.current
      })
      .addCase(collectionUpdate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(collectionAddNew.pending, (state) => {
        state.statusAdd = 'loading';
        state.isAdd = false
        state.error = null
      })
      .addCase(collectionAddNew.fulfilled, (state, action) => {
        state.statusAdd = 'succeeded';
        state.isAdd = true
      })
      .addCase(collectionAddNew.rejected, (state, action) => {
        state.statusAdd = 'failed';
        state.isAdd = false
        state.errorAdded = action.payload;
      })
      .addCase(collectionDeleteItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(collectionDeleteItem.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(collectionDeleteItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
})


export const { resetAddState, resetError } = collectionSlice.actions
export default collectionSlice.reducer