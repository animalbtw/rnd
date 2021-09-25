import * as React from 'react';
import {connect} from "react-redux";
import {isChecked} from "../../store/actions/recordActions";
import st from '../../assets/styles/record.module.css'
import {Draggable} from "react-beautiful-dnd";

const Record = ({rec, listId, index, dispatch}) => {
  const setIsChecked = (e) => {
    dispatch(isChecked(rec.id))
  }

  return (
    <Draggable
      draggableId={rec.id}
      index={index}
      type="card"
    >
      {
        provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={st.wrapper}>
            <div className={rec.isComplete ? (st.header) : (st.completeHeader) }>
              {rec.text}
            </div>
            <div className={st.action}>
              <input
                className={st.input}
                type="checkbox"
                defaultChecked={rec.isComplete}
                onChange={e => setIsChecked(e)}
              />
            </div>
          </div>
        )
      }
    </Draggable>
  );
};

export default connect()(Record);