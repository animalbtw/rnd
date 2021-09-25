import {createAction, createReducer} from "@reduxjs/toolkit";

const initialState = []
const addBoard = createAction('ADD_BOARD')
const addList = createAction('ADD_LIST')

export const boardsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addBoard, (state, action) => {
      const {id, boardHeader, lists} = action.payload
      const newBoard = {
        id,
        boardHeader,
        lists
      }
      state.push(newBoard)
    })
    .addCase(addList, (state, action) => {
      const {boardId, id} = action.payload
      const board = state.filter(board => board.id === boardId)[0]
      board.lists.push(id)
    })
})