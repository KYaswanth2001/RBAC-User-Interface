import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRoles = createAsyncThunk("roles/fetchRoles", async () => {
  const response = await axios.get("http://localhost:3000/roles");
  return response.data;
});

const rolesSlice = createSlice({
  name: "roles",
  initialState: { data: [], loading: false },
  reducers: {
    addRole: (state, action) => {
      state.data.push(action.payload);
    },
    editRole: (state, action) => {
      const index = state.data.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) state.data[index] = action.payload;
    },
    deleteRole: (state, action) => {
      state.data = state.data.filter((r) => r.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});

export const { addRole, editRole, deleteRole } = rolesSlice.actions;
export default rolesSlice.reducer;
