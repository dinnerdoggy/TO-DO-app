import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { deleteTask } from '../api/taskData';

export default function TaskButton({ taskObj, onUpdate }) {
  const deleteThisTask = () => {
    console.log('Deleting task with key:', taskObj.firebaseKey);
    deleteTask(taskObj.firebaseKey).then(() => onUpdate());
  };

  return (
    <div>
      <Button variant="primary" onClick={deleteThisTask}>
        {taskObj.task}
      </Button>
    </div>
  );
}

TaskButton.propTypes = {
  taskObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    task: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};
