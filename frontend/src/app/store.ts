import { configureStore } from "@reduxjs/toolkit";
import { attachStore } from "../api/axiosClient";
import assignmentsReducer from "../features/assignments/assignmentsSlice";
import authReducer from "../features/auth/authSlice";
import coursesReducer from "../features/courses/coursesSlice";
import enrollmentsReducer from "../features/enrollments/enrollmentsSlice";
import lessonsReducer from "../features/lessons/lessonsSlice";
import quizzesReducer from "../features/quizzes/quizzesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    enrollments: enrollmentsReducer,
    assignments: assignmentsReducer,
    quizzes: quizzesReducer,
    lessons: lessonsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

attachStore(store);
