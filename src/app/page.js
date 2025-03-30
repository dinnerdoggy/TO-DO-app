'use client';

import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { getTasks, createTask } from '../api/taskData';
import TaskButton from '../components/TaskButton';

function Home() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const getAllTheTasks = () => {
    getTasks(user.uid).then(setTasks);
  };

  useEffect(() => {
    getAllTheTasks();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) return; // skip empty

    const newTask = {
      task: input,
      userId: user.uid,
    };

    createTask(newTask).then((data) => {
      const patchPayload = { firebaseKey: data.name };

      // update that new task with its firebaseKey
      fetch(`https://playground-ade54-default-rtdb.firebaseio.com/tasks/${data.name}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patchPayload),
      }).then(() => {
        setInput('');
        getAllTheTasks(); // refresh task list
      });
    });
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.displayName}!</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="Enter a task" value={input} onChange={(e) => setInput(e.target.value)} />
        </Form.Group>
      </Form>
      <div className="buttons">
        {tasks.map((task) => (
          <TaskButton key={task.firebaseKey} taskObj={task} onUpdate={getAllTheTasks} />
        ))}
      </div>
    </div>
  );
}

export default Home;
