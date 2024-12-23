import React, { useState } from 'react';

const TaskInput = ({ onAddTask }) => {
  const [task, setTask] = useState('');

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task.trim()) {
      onAddTask(task); 
      setTask(''); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        value={task}
        onChange={handleChange}
        placeholder="Agregar nueva tarea..."
        className="flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Añadir
      </button>
    </form>
  );
};

export default TaskInput;

