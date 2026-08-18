import { configureStore } from "@reduxjs/toolkit";
import { attachStore } from "../api/axiosClient";
import adminReducer from "../features/admin/adminSlice";
import assignmentsReducer from "../features/assignments/assignmentsSlice";
import authReducer from "../features/auth/authSlice";
import capstonesReducer from "../features/capstones/capstonesSlice";
import coursesReducer from "../features/courses/coursesSlice";
import enrollmentsReducer from "../features/enrollments/enrollmentsSlice";
import lessonsReducer from "../features/lessons/lessonsSlice";
import quizzesReducer from "../features/quizzes/quizzesSlice";

// Exported separately (not just inlined into configureStore below) so tests can build
// their own store with the exact same reducers via createTestStore, instead of either
// duplicating this map or reusing this singleton and its attachStore side effect.
export const rootReducer = {
  auth: authReducer,
  courses: coursesReducer,
  enrollments: enrollmentsReducer,
  assignments: assignmentsReducer,
  quizzes: quizzesReducer,
  lessons: lessonsReducer,
  admin: adminReducer,
  capstones: capstonesReducer,
};

export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

attachStore(store);
