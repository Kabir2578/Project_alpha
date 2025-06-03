import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://smartjob-api.onrender.com/candidate";

const initialState = {
    candidate: null,
    isAuthenticated: false,
    loading: false,
    status: 'idle',
    error: null
};

// ====================< REGISTER CANDIDATE >======================//
export const uploadCandidate = createAsyncThunk('candidate/upload', async (data, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            }
        };
        const response = await axios.post(`${API_BASE_URL}/upload`, data, { config });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to create candidate");
    }
});

// ====================< LOGIN CANDIDATE >======================//
export const candidateLogin = createAsyncThunk('candidate/login', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, data);
        localStorage.setItem('accessToken', response.data.data.accessToken);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Login failed");
    }
});

// ====================< FETCH CANDIDATE PROFILE >======================//
export const fetchCandidateProfile = createAsyncThunk(
    'candidate/profile',
    async (_, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get(`${API_BASE_URL}/profile`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch profile");
        }
    }
);

const candidateSlice = createSlice({
    name: 'candidate',
    initialState,
    reducers: {
        logout: (state) => {
            state.candidate = null;
            state.isAuthenticated = false;
            localStorage.removeItem('accessToken');
        },
    },
    extraReducers: (builder) => {
        builder
            // ====================< LOGIN CASES >======================//
            .addCase(candidateLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(candidateLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.candidate = action.payload.data.details;
                state.isAuthenticated = true;
                localStorage.setItem('accessToken', action.payload.data.accessToken);
            })
            .addCase(candidateLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Login failed";
                state.isAuthenticated = false;
            })
            // ====================< REGISTER CASES >======================//
            .addCase(uploadCandidate.pending, (state) => {
                state.loading = true;
            })
            .addCase(uploadCandidate.fulfilled, (state, action) => {
                state.loading = false;
                state.candidate = action.payload;
            })
            .addCase(uploadCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create candidate";
            })
            // ====================< PROFILE CASES >======================//
            .addCase(fetchCandidateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCandidateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.candidate = action.payload;
            })
            .addCase(fetchCandidateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch profile";
            });
    }
});

export const { logout } = candidateSlice.actions;
export default candidateSlice.reducer;
