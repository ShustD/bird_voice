import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRecognize = createAsyncThunk(
  'recognize/fetchRecognize',
  async (itemAudio, { rejectWithValue }) => {
    try {
      const response = await fetch("https://ptuski.ssrlab.by/run/predict", {
	  method: "POST",
    headers: { 
      "Content-Type": "application/json", 
      "Authorization": "Bearer 2db3HwQUrhU2gyluvDWVRA"
    },
    body: JSON.stringify({
      data: [
        {
            name: 'sound.name',
            data: itemAudio
        },
        {
            name: 'zip.zip',
            data: itemAudio
        },
        'Латынь'
    ]
    }),
});
      if (!response.ok) {
        throw new Error('Server error')
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
    data: null,
    error: null,
    status: 'idle'
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecognize.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecognize.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;

      })
      .addCase(fetchRecognize.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
  },
})

export default recognizeSlice.reducer

