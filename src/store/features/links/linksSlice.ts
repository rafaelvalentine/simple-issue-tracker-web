// import { Dispatch } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP } from "../../../services";

const initialState: {
  links: any[];
  count: number;
  visitor_count: number;
  total_clicks: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any;
} = {
  links: [],
  count: 0,
  visitor_count: 0,
  total_clicks: 0,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchLinks = createAsyncThunk("links/fetchLinks", async () => {
  const response = await HTTP.baseApi().get("/shorteners");
  return response.data.data;
});

export const createLink = createAsyncThunk(
  "links/createLink",
  async (initialLink:any) => {
    const response = await HTTP.baseApi().post("/shorteners", { data: initialLink });
    return response.data.data;
  }
);

export const updateLink = createAsyncThunk(
  "links/updateLink",
  async (initialLink: any) => {
    const { id } = initialLink;
    try {
      const response = await HTTP.baseApi().put(`/shorteners/${id}`, {
        data: initialLink,
      });
      return response.data.data;
    } catch (err: any) {
      return err.message;
      // return initialLink; // only for testing Redux!
    }
  }
);

export const deleteLink = createAsyncThunk(
  "links/deleteLink",
  async (initialLink:any) => {
    const { id } = initialLink;
    try {
      const response = await HTTP.baseApi().delete(`/shorteners/${id}`);
      if (response?.data.status === 200) return initialLink;
      return `${response?.data.status}: ${response?.data.err_message}`;
    } catch (err: any) {
      return err.message;
    }
  }
);

// Slice
const slice = createSlice({
  name: "links",
  initialState,
  reducers: {
    //   setEmployeeState(state, action) {
    //     const { employees } = state
    //     state.employees = employees.map((employee) => {
    //       if (action.payload.employeeId === employee.employeeId) {
    //         return { ...employee, state: action.payload.state }
    //       }
    //       return employee
    //     })
    //    localStorage.setItem("work-motion:employees", JSON.stringify(state.employees))
    //   },
    //   createEmployee(state, action) {
    //     const { employees } = state
    //     state.employees = [...employees, action.payload]
    //     localStorage.setItem("work-motion:employees", JSON.stringify(state.employees))
    //   },
    //   getEmployees(state, action) {
    //     state.employees = [...action.payload.data]
    //   },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLinks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.links = [...action.payload.links];
        state.count = action.payload.count;
        state.total_clicks = action.payload.total_clicks;
        state.visitor_count = action.payload.visitor_count;
      })
      .addCase(createLink.fulfilled, (state, action) => {
        if (!action.payload?.id) {
            console.log('Update could not complete')
            console.log(action.payload)
            return;
        }
        const count  = state.count 
        const { id } = action.payload;
        // action.payload.date = new Date().toISOString();
        const links = state.links.filter(link => link.id !== id);
        state.links = [...links, action.payload];
        state.count = count + 1
        window.location.reload();
    })
      .addCase(updateLink.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const links = state.links.filter((link) => link.id !== id);
        state.links = [...links, action.payload];
      })
      .addCase(deleteLink.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const count = state.count;
        const links = state.links.filter((link) => link.id !== id);
        state.links = links;
        state.count = count - 1;
      });
  },
});
export default slice.reducer;

export const getAllLinks = (state: any) => state.links.links;
export const getTotalClicks = (state: any) => state.links.total_clicks;
export const getVisitorCount = (state: any) => state.links.visitor_count;
export const getLinksCount = (state: any) => state.links.count;
export const getLinksStatus = (state: any) => state.links.status;
export const getLinksError = (state: any) => state.links.error;

const {} = slice.actions;
