import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthStatus } from "./authSlice";

export const fetchRecognize = createAsyncThunk(
  'recognize/fetchRecognize',
  async (sound, { rejectWithValue, dispatch }) => {
    const formData = new FormData()
    formData.append('audio_file', sound)
    formData.append('language', 1)
    try {
      const response = await fetch("https://apiptushki.ssrlab.by/predict", {
	  method: "POST",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    redirect: 'follow',
    body: formData
});
if (!response.ok) {
  if (response.status === 401) {
    
    dispatch(setAuthStatus(false));
  }
    
  throw new Error(response.statusText);
}
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const recognizeSlice = createSlice({
  name: 'recognize',
  initialState: {
    error: null,
    status: null,
    birdName: null,
    recognizedBirds: null,
    spectrogram: null
  },
  reducers: {
    resetStatus: (state) => {
      state.status = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecognize.pending, (state) => {
        state.status = 'loading';
        state.error = null
      })
      .addCase(fetchRecognize.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recognizedBirds = action.payload.predictions
        state.spectrogram = action.payload.spectogram_file
      })
      .addCase(fetchRecognize.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
  },
})

export const { resetStatus } = recognizeSlice.actions
export default recognizeSlice.reducer

