import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// READ Tasks
const getTasks = (userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/tasks.json?orderBy="userId"&equalTo="${userId}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          resolve([]);
        } else {
          const tasks = Object.entries(data).map(([firebaseKey, task]) => ({
            ...task,
            firebaseKey, // attach key here
          }));
          resolve(tasks);
        }
      })
      .catch(reject);
  });

// CREATE Task
const createTask = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/tasks.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// DELETE Task
const deleteTask = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/tasks/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getTasks, createTask, deleteTask };
