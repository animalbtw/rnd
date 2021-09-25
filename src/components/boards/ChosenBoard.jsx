import React from 'react';
import Lists from "../lists/Lists";
import {useDispatch, useSelector} from "react-redux";
import st from '../../assets/styles/chosenBoard.module.css'
import {DragDropContext} from "react-beautiful-dnd";
import {dndFromListToList, dndInsideList, dragAndDrop} from "../../store/actions/listActions";


const ChosenBoard = ({listsOrder}) => {
  const lists = useSelector(state => state.lists)
  const records = useSelector(state => state.records)
  const dispatch = useDispatch()

  const onDragEnd = result => {
    const {destination, source, draggableId} = result
    if (!destination) {
      return
    }
    // if (
    //   source.droppableId !== destination.droppableId
    //   || source.index !== destination.index)
    // {
    //   dispatch(dragAndDrop(
    //     source.droppableId,
    //     destination.droppableId,
    //     source.index,
    //     destination.index,
    //     draggableId,
    //   ))
    // }
    if (source.droppableId !== destination.droppableId) {
      dispatch(dndFromListToList(
            source.droppableId,
            destination.droppableId,
            source.index,
            destination.index,
            draggableId
      ))
    }
    if (source.index !== destination.index &&
      source.droppableId === destination.droppableId) {
      dispatch(dndInsideList(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId

      ))
    }

  }

  return (
    <DragDropContext
      onDragEnd={result => onDragEnd(result)}
    >
    <div className={st.wrapper}>
      {
        listsOrder.map(listId => {
          const list = lists
            .filter(list => list.id === listId)
          if (list) {
            return (
              <div key={listId}>
                {
                  list.map(l => {
                      const listRecords = records.map(record => record).filter(rec => rec.listId === l.id)
                      return (
                        <Lists
                          key={l.id}
                          list={l}
                          listId={l.id}
                          records={listRecords}
                        />
                      )
                    }
                  )
                }
              </div>
            )
          }
        })
      }
    </div>
    </DragDropContext>
  );
};

export default ChosenBoard;
