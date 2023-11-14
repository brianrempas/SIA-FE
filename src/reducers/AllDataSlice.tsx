import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

// Define a type for the slice state
export interface CounterState {
    userData: any,
    subjectData: any,
    studentData: any,
    lectureData: any
}

// Define the initial state using that type
const initialState: CounterState = {
    userData: [],
    subjectData: [],
    studentData: [],
    lectureData: []
}

export const AllDataSlice = createSlice({
  name: 'AllData',
  initialState,
  reducers: {
    setAllData: (state, action) => {
        state.userData = action.payload.userData
        state.subjectData = action.payload.subjectData
        state.studentData = action.payload.studentData
        state.lectureData = action.payload.lectureData
    },
    setUserData: (state, action) => {
        state.userData = action.payload.userData
    },
    setSubjectData: (state, action) => {
        state.subjectData = action.payload.subjectData
    },
    setStudentData: (state, action) => {
        state.studentData = action.payload.studentData
    },
    setLectureData: (state, action) => {
        state.lectureData = action.payload.lectureData
    }
  }
})

export const { setAllData, setUserData, setSubjectData, setStudentData, setLectureData } = AllDataSlice.actions
export const selectUserData = (state: RootState) => state.allDataReducer.userData;
export const selectSubjectData = (state: RootState) => state.allDataReducer.subjectData;
export const selectLectureData = (state: RootState) => state.allDataReducer.lectureData;
export const selectStudentData = (state: RootState) => state.allDataReducer.studentData;

export const selectUsername = (state: RootState) => state.allDataReducer

export default AllDataSlice.reducer