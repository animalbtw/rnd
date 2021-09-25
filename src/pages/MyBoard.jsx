import * as React from 'react';
import {connect, useSelector} from "react-redux";
import {setCurrentBoard} from "../store/actions/boardActions";
import ListCreate from "../components/lists/ListCreate";
import {DragDropContext} from "react-beautiful-dnd";
import ChosenBoard from "../components/boards/ChosenBoard";

const MyBoard = (props) => {
  React.useEffect(() => {
    const {id} = props.match.params
    const {dispatch} = props
    dispatch(setCurrentBoard(id))
  }, [])

  const currentBoard = useSelector(state => state.currentBoard)
  const boards = useSelector(state => state.boards)

  const board = boards.filter(board => board.id === currentBoard)[0]
  if (!board) {
    return (
      <div>
        Такой доски не существует
      </div>
    )
  }
  const listsOrder = board.lists

  const onDragEnd = (result) => {
    const {dispatch} = props
    const {destination, source, draggableId} = result
    if (!destination) {
      return
    }

  }

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <ListCreate/>
      <ChosenBoard listsOrder={listsOrder}/>
    </DragDropContext>
  )
}

export default connect()(MyBoard);
