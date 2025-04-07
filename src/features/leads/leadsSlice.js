import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { leadsApi } from "../../api/leadsApi";

const initialState = {
  leads: [],
  stats: {
    totalTelecallers: 0,
    totalCalls: 0,
    totalCustomers: 0,
    recentCalls: [],
    callTrends: [],
  },
  isLoading: false,
  isError: false,
  message: "",
};

export const fetchLeads = createAsyncThunk(
  "leads/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await leadsApi.getLeads();
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addLead = createAsyncThunk(
  "leads/create",
  async (leadData, thunkAPI) => {
    try {
      return await leadsApi.createLead(leadData);
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateLeadAddress = createAsyncThunk(
  "leads/updateAddress",
  async ({ id, address }, thunkAPI) => {
    try {
      return await leadsApi.updateLead({ id, address });
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateLeadStatus = createAsyncThunk(
  "leads/updateStatus",
  async ({ id, status, response }, thunkAPI) => {
    try {
      return await leadsApi.updateLeadStatus({ id, status, response });
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeLead = createAsyncThunk(
  "leads/delete",
  async (id, thunkAPI) => {
    try {
      return await leadsApi.deleteLead(id);
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchLeadStats = createAsyncThunk(
  "leads/fetchStats",
  async (_, thunkAPI) => {
    try {
      return await leadsApi.getLeadStats();
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch leads
      .addCase(fetchLeads.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leads = action.payload.data;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Add lead
      .addCase(addLead.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addLead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leads.unshift(action.payload.data);
      })
      .addCase(addLead.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update address
      .addCase(updateLeadAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLeadAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leads = state.leads.map((lead) =>
          lead._id === action.payload.data._id ? action.payload.data : lead
        );
      })
      .addCase(updateLeadAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update status
      .addCase(updateLeadStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLeadStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leads = state.leads.map((lead) =>
          lead._id === action.payload.data._id ? action.payload.data : lead
        );
      })
      .addCase(updateLeadStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete lead
      .addCase(removeLead.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeLead.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leads = state.leads.filter(
          (lead) => lead._id !== action.payload.data._id
        );
      })
      .addCase(removeLead.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Fetch stats
      .addCase(fetchLeadStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLeadStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload.data;
      })
      .addCase(fetchLeadStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = leadsSlice.actions;
export default leadsSlice.reducer;
