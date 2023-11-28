import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface CounterState {
  username: string,
  password: string
}

// Define the initial state using that type
const initialState: CounterState = {
  username: '',
  password: ''
}

export const LoginDataSlice = createSlice({
  name: 'LoginData',
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      state.username = action.payload.username
      state.password = action.payload.password
    },
  }
})

export const { setLoginData } = LoginDataSlice.actions

export default LoginDataSlice.reducer