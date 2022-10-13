// import { Dispatch } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP } from "../../../services";

const initialState: {
  tasks: any[];
  //   count: number;
  //   visitor_count: number;
  //   total_clicks: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any;
} = {
  tasks: [],
  //   count: 0,
  //   visitor_count: 0,
  //   total_clicks: 0,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await HTTP.baseApi().get("/v1/tasks");
  return response.data.data;
});

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (createtask: any) => {
    const response = await HTTP.baseApi().post("/v1/tasks", {
      data: createtask,
    });
    return response.data.data;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (updateTask: any) => {
    const { id } = updateTask;
    try {
      const response = await HTTP.baseApi().patch(`/v1/tasks/${id}`, {
        data: updateTask,
      });
      return response.data.data;
    } catch (err: any) {
      return err.message;
      // return initialLink; // only for testing Redux!
    }
  }
);

// export const deleteLink = createAsyncThunk(
//   "links/deleteLink",
//   async (initialLink: any) => {
//     const { id } = initialLink;
//     try {
//       const response = await HTTP.baseApi().delete(`/shorteners/${id}`);
//       if (response?.data.status === 200) return initialLink;
//       return `${response?.data.status}: ${response?.data.err_message}`;
//     } catch (err: any) {
//       return err.message;
//     }
//   }
// );

// Slice
const slice = createSlice({
  name: "tasks",
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
      .addCase(fetchTasks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = [...action.payload];
      })
      .addCase(createTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const tasks = state.tasks.filter((sprint) => sprint.id !== id);
        state.tasks = [...tasks, action.payload];
      })
      .addCase(updateTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (!action.payload?.id) {
          console.log("Update could not be complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const tasks = state.tasks.filter((sprint) => sprint.id !== id);
        state.tasks = [...tasks, action.payload];
      });
    //   .addCase(deleteLink.fulfilled, (state, action) => {
    //     if (!action.payload?.id) {
    //       console.log("Delete could not complete");
    //       console.log(action.payload);
    //       return;
    //     }
    //     const { id } = action.payload;
    //     const count = state.count;
    //     const links = state.links.filter((link) => link.id !== id);
    //     state.links = links;
    //     state.count = count - 1;
    //   });
  },
});
export default slice.reducer;

export const getAllTasks = (state: any) => state.tasks.tasks;
// export const getTotalClicks = (state: any) => state.links.total_clicks;
// export const getVisitorCount = (state: any) => state.links.visitor_count;
// export const getLinksCount = (state: any) => state.links.count;
export const getTasksStatus = (state: any) => state.tasks.status;
// export const getLinksError = (state: any) => state.links.error;

const {} = slice.actions;
