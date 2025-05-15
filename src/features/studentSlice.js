import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("get/student", async (data) => {
  const response = await axios.post(`http://localhost:5000/student`, data);
  return response.data.student;
});

export const deleteStudent = createAsyncThunk("delete/student", async (id) => {
  const response = await axios.delete(`http://localhost:5000/student/${id}`);
  alert(response.data.message)
});

export const updateStudent = createAsyncThunk(
  "update/student",
  async ({ id, data }) => {
    const response = await axios.put(
      `http://localhost:5000/student/${id}`,
      data
    );

    return response.data.student;
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: {
    loading: null,
    error: null,
    message: null,
    student: [],
  },

  reducers: {
    clearData:(state) => {
      state.student = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = null;
      state.student = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = null;
      state.error = action.payload;
    });
    builder.addCase(deleteStudent.fulfilled, (state) => {
      state.student = [];
    });
    builder.addCase(updateStudent.fulfilled, (state, action) => {
      state.student = action.payload;
    });
  },
});

export default studentSlice.reducer;

export const {clearData} = studentSlice.actions