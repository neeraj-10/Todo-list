import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Button = ({ variant, onClick, children }) => {
  const buttonClassName = `button ${variant}`;

  return (
    <button className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
};

const Checkbox = ({ label, checked, onChange }) => {
  const handleCheckboxChange = (event) => {
    onChange(event.target.checked);
  };

  return (
    <div className="checkbox">
      <label className="checkbox-label">
        <input type="checkbox" checked={checked} onChange={handleCheckboxChange} />
        <span className={`custom-checkbox ${checked ? 'checked' : ''}`}></span>
        {label}
      </label>
    </div>
  );
};

const TodoRow = ({ label, onDelete }) => {
  const [hovered, setHovered] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleCheckboxChange = (checked) => {
    setChecked(checked);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className="todo-row" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Checkbox label={label} checked={checked} onChange={handleCheckboxChange} />
      {hovered && (
        <Button variant="small" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      )}
    </div>
  );
};

const App = () => {
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([
    'Task 1',
    'Task 2',
    'Task 3',
    'Task 4'
  ]);

  const handleTaskInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, taskInput]);
      setTaskInput('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      {tasks.map((task, index) => (
        <TodoRow
          key={index}
          label={task}
          onDelete={() => handleDeleteTask(index)}
        />
      ))}
      <div className="add-task">
        <input type="text" placeholder='Add task here...' value={taskInput} onChange={handleTaskInputChange} />
        <Button variant="big" onClick={handleAddTask}>
          Add Task
        </Button>
      </div>
    </div>
  );
};

export default App;
