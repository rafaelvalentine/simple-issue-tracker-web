// import { getAllTasks } from './features/tasks/tasksSlice';
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import links, {
  fetchLinks,
  getAllLinks,
  getLinksStatus,
  getLinksError,
  getTotalClicks,
  getVisitorCount,
  getLinksCount,
  createLink,
  updateLink,
  deleteLink,
} from "./features/links/linksSlice";

import sprints, {
  fetchSprints,
  getAllSprints,
  updateSprint,
  getSprintsStatus,
  createSprint,
} from "./features/sprints/sprintsSlice";

import tasks, {
  fetchTasks,
  getAllTasks,
  updateTask,
  getTasksStatus,
  createTask,
} from "./features/tasks/tasksSlice";

const reducer = combineReducers({ sprints, links, tasks });
const store = configureStore({ reducer });

// export type { EmployeeState }

export {
  fetchLinks,
  getAllLinks,
  getLinksStatus,
  getLinksError,
  getTotalClicks,
  getVisitorCount,
  getLinksCount,
  createLink,
  updateLink,
  deleteLink,
  fetchSprints,
  getAllSprints,
  updateSprint,
  getSprintsStatus,
  createSprint,
  fetchTasks,
  getAllTasks,
  updateTask,
  getTasksStatus,
  createTask,
};

export default store;
