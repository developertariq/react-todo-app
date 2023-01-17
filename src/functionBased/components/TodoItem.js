import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './TodoItem.module.css';

const TodoItem = (props) => {
  const [editing, setEditing] = useState(false);
  useEffect(() => () => {
    console.log('Cleaning up...');
  }, []);
  const handleEditing = () => {
    setEditing(true);
  };

  const handleUpdatedDone = (event) => {
    if (event.key === 'Enter') {
      setEditing(false);
    }
  };

  const {
    todo, handleChangeProps, deleteTodoProps, setUpdate,
  } = props;
  const { completed, id, title } = todo;

  const completedStyle = {
    fontStyle: 'italic',
    color: '#595959',
    opacity: 0.4,
    textDecoration: 'line-through',
  };
  const viewMode = {};
  const editMode = {};

  if (editing) {
    viewMode.display = 'none';
  } else {
    editMode.display = 'none';
  }
  return (
    <li className={styles.item}>
      <div onDoubleClick={handleEditing} style={viewMode}>
        <input
          type="checkbox"
          checked={completed}
          className={styles.checkbox}
          onChange={() => handleChangeProps(id)}
        />
        <button type="button" onClick={() => deleteTodoProps(id)}>
          Delete
        </button>
        <span style={completed ? completedStyle : null}>
          {title}
        </span>
      </div>
      <input
        type="text"
        style={editMode}
        className={styles.textInput}
        value={title}
        onChange={(e) => { setUpdate(e.target.value, id); }}
        onKeyDown={handleUpdatedDone}
      />
    </li>
  );
};

TodoItem.propTypes = {
  handleChangeProps: PropTypes.func.isRequired,
  deleteTodoProps: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
  todo: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ),
};

TodoItem.defaultProps = {
  todo: PropTypes.objectOf(
    PropTypes.shape({
      id: '',
      title: '',
      completed: false,
    }),
  ),
};

export default TodoItem;
