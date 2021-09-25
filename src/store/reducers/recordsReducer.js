import {createAction, createReducer} from "@reduxjs/toolkit";

const initialState = []
const addRecord = createAction('ADD_RECORD')
const recordComplete = createAction('COMPLETE_RECORD')
const dragRecordToList = createAction('DND_FROM_LIST_TO_LIST')
const dragRecordInsideList = createAction('DND_INSIDE')

export const recordsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addRecord, (state, action) => {
      const {text, id, listId, isComplete} = action.payload
      const newRecord = {
        id,
        text,
        listId,
        isComplete
      }
      state.push(newRecord)
    })
    .addCase(recordComplete, (state, action) => {
      const {recordId} = action.payload
      const record = state.filter(rec => rec.id === recordId)[0]
      record.isComplete = !record.isComplete
    })
    .addCase(dragRecordToList || dragRecordInsideList, (state, action) => {
      const {
        droppableIdEnd, // id of the list where dragging ended
        draggableId, // id of item that dragged
      } = action.payload
      const card = state.filter(card => card.id === draggableId)
      card[0].listId = droppableIdEnd
    })
    .addCase(dragRecordInsideList, (state, action) => {
      const {
        droppableIndexEnd, // index in lists where item dropped
        droppableIndexStart, // index in lists where item taken
        draggableId, // id of item that dragged
      } = action.payload
      const record = state.filter(record => record.id === draggableId)[0]
      // state.splice(droppableIndexEnd, 0, record)
      // state[droppableIndexEnd] = record
    })
})