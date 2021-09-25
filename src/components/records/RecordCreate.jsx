import * as React from 'react';
import {connect} from "react-redux";
import {add_record} from "../../store/actions/recordActions";
import st from '../../assets/styles/recordCreate.module.css'

const RecordCreate = ({listId, onClose, dispatch}) => {
  const [recordText, setRecordText] = React.useState('')

  const recordHandleCreate = () => {
    if (recordText) {
      dispatch(add_record(listId, recordText))
      setRecordText('')
      onClose()
    }
  }

  const recordHandleCreateEnter = (e) => {
    if (e.key === 'Enter') {
      if (recordText) {
        dispatch(add_record(listId, recordText))
        setRecordText('')
        onClose()
      }
    }
  }

  return (
    <div className={st.wrapper}>
      <div className={st.actions}>
        <textarea
          autoFocus
          onKeyDown={e => recordHandleCreateEnter(e)}
          placeholder={'Заголовок для этой карточки'}
          className={st.tArea}
          value={recordText}
          onChange={e => setRecordText(e.target.value)}
        />
        <div className={st.buttons}>
          <button
            className={st.apply}
            onClick={() => recordHandleCreate()}>
            Создать
          </button>
          <button
            className={st.close}
            onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  records: state.records
})

export default connect(mapStateToProps)(RecordCreate);
