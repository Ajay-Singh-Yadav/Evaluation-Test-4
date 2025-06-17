import {createSlice} from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({id: Date.now(), task: action.payload, completed: false});
    },
    updateTodo: (state, action) => {
      const {id, newTask} = action.payload;
      const todo = state.find(t => t.id === id);
      if (todo) {
        todo.task = newTask;
      }
    },
    deleteTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
  },
});

export const {addTodo, updateTodo, deleteTodo} = todoSlice.actions;
export default todoSlice.reducer;
