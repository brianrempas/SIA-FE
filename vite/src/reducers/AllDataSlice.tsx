import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

// Define a type for the slice state
export interface CounterState {
    userData: any,
    subjectData: any,
    studentData: any,
    lectureData: any,
    prodiData: any,
    scheduleData: any,
    scoreData: any
}

// Define the initial state using that type
const initialState: CounterState = {
    userData: [],
    subjectData: [],
    studentData: [],
    lectureData: [],
    prodiData: [],
    scheduleData: [],
    scoreData: []
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
        state.prodiData = action.payload.prodiData
        state.scheduleData = action.payload.scheduleData
        state.scoreData = action.payload.scoreData
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
    },
    setProdiData: (state, action) => {
        state.prodiData = action.payload.prodiData
    },
    setScheduleData: (state, action) => {
        state.scheduleData = action.payload.scheduleData
    },
    setScoreData: (state, action) => {
        state.scoreData = action.payload.scoreData
    }
  }
})

export const { setAllData, setUserData, setSubjectData, setStudentData, setLectureData, setProdiData, setScheduleData, setScoreData } = AllDataSlice.actions
export const selectUserData = (state: RootState) => state.allDataReducer.userData;
export const selectSubjectData = (state: RootState) => state.allDataReducer.subjectData;
export const selectLectureData = (state: RootState) => state.allDataReducer.lectureData;
export const selectStudentData = (state: RootState) => state.allDataReducer.studentData;
export const selectProdiData = (state: RootState) => state.allDataReducer.prodiData;
export const selectScheduleData = (state: RootState) => state.allDataReducer.scheduleData;
export const selectScoreData = (state: RootState) => state.allDataReducer.scoreData;

export const selectAllData = (state: RootState) => state.allDataReducer

export default AllDataSlice.reducer