import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("get/student", async (data) => {
  const response = await axios.post(
    `https://carma-be.vercel.app/student`,
    data
  );
  return response.data.student;
});

export const deleteStudent = createAsyncThunk("delete/student", async (id) => {
  const response = await axios.delete(
    `https://carma-be.vercel.app/student/${id}`
  );
  alert(response.data.message);
});

export const updateStudent = createAsyncThunk(
  "update/student",
  async ({ id, data }) => {
    const response = await axios.put(
      `https://carma-be.vercel.app/student/${id}`,
      data
    );

    return response.data.student;
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: {
    status: "idle",
    error: null,
    message: null,
    student: {},
  },

  reducers: {
    clearData: (state) => {
      state.student = {};
      state.status = "idle";
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "done";
      state.student = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload;
    });
    builder.addCase(deleteStudent.fulfilled, (state) => {
      state.student = {};
      state.status = "idle";
    });
    builder.addCase(updateStudent.fulfilled, (state, action) => {
      state.student = action.payload;
    });
  },
});

export default studentSlice.reducer;

export const { clearData } = studentSlice.actions;
