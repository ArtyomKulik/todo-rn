import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { TasksType } from '@/types/taskTypes'


let counterId = 0

interface TodoState {
    taskNameInputValue: string
    taskDescriptionValue: string
    tasks: TasksType
}

// Define the initial state using that type
const initialState: TodoState = {
    taskNameInputValue: '',
    taskDescriptionValue: '',
    tasks: []
}

export const counterSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setNameInputVal: (state, {payload}: PayloadAction<string>) => {
      state.taskNameInputValue = payload
    },
    setDescriptionInputVal: (state, {payload}: PayloadAction<string>) => {
      state.taskDescriptionValue = payload
    },
    addTask: (state) => {
        if(state.taskNameInputValue && state.taskDescriptionValue) {
            state.tasks.push({
                id: counterId++, name: state.taskNameInputValue, descr: state.taskDescriptionValue
            })
            state.taskNameInputValue = ''
            state.taskDescriptionValue = ''
        }
         },
    deleteTask: (state, {payload}: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((el) => el.id !== payload)

    }
  },
})

export const { setNameInputVal, setDescriptionInputVal, addTask, deleteTask } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer