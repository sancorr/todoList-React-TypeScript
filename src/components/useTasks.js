import { useState, useEffect } from "react";

const useTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [inProgressTasks, setInProgressTasks] = useState(() => {
    const savedInProgressTasks = localStorage.getItem("inProgressTasks");
    return savedInProgressTasks ? JSON.parse(savedInProgressTasks) : [];
  });

  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedCompletedTasks = localStorage.getItem("completedTasks");
    return savedCompletedTasks ? JSON.parse(savedCompletedTasks) : [];
  });

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("inProgressTasks", JSON.stringify(inProgressTasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [tasks, inProgressTasks, completedTasks]);

  const addTask = (taskName) => {
    const newTask = {
      id: Date.now(),
      name: taskName,
      completed: false,
      inProgress: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const taskComplete = (taskId) => {
    const completedFromTasks = tasks.find((task) => task.id === taskId);
    const completedFromInProgress = inProgressTasks.find(
      (task) => task.id === taskId
    );

    if (completedFromTasks) {
      setCompletedTasks((prevCompletedTasks) => [
        ...prevCompletedTasks,
        { ...completedFromTasks, completed: true },
      ]);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }

    if (completedFromInProgress) {
      setCompletedTasks((prevCompletedTasks) => [
        ...prevCompletedTasks,
        { ...completedFromInProgress, completed: true },
      ]);
      setInProgressTasks((prevInProgressTasks) =>
        prevInProgressTasks.filter((task) => task.id !== taskId)
      );
    }
  };

  const moveToInProgress = (taskId) => {
    const taskToMove = tasks.find((task) => task.id === taskId);
    if (taskToMove) {
      setInProgressTasks((prevInProgressTasks) => {
        const updatedInProgressTasks = [
          ...prevInProgressTasks,
          { ...taskToMove, inProgress: true },
        ];
        localStorage.setItem(
          "inProgressTasks",
          JSON.stringify(updatedInProgressTasks)
        );
        return updatedInProgressTasks;
      });

      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return updatedTasks;
      });
    }
  };

  const moveToCompleted = (taskId) => {
    const taskToMove = inProgressTasks.find((task) => task.id === taskId);
    if (taskToMove) {
      setCompletedTasks((prevCompletedTasks) => {
        const updatedCompletedTasks = [...prevCompletedTasks, taskToMove];
        localStorage.setItem(
          "completedTasks",
          JSON.stringify(updatedCompletedTasks)
        );
        return updatedCompletedTasks;
      });

      setInProgressTasks((prevInProgressTasks) => {
        const updatedInProgressTasks = prevInProgressTasks.filter(
          (task) => task.id !== taskId
        );
        localStorage.setItem(
          "inProgressTasks",
          JSON.stringify(updatedInProgressTasks)
        );
        return updatedInProgressTasks;
      });
    }
  };

  const startEditing = (taskId, taskName) => {
    const taskToEdit =
      tasks.find((task) => task.id === taskId) ||
      inProgressTasks.find((task) => task.id === taskId) ||
      completedTasks.find((task) => task.id === taskId);
  
    setEditingTaskId(taskToEdit.id);
    setEditedTaskName(taskName);
  };
  

  const saveEditedTask = () => {
    const updateTaskList = (list) =>
      list.map((task) =>
        task.id === editingTaskId ? { ...task, name: editedTaskName } : task
      );

    setTasks((prevTasks) => updateTaskList(prevTasks));
    setInProgressTasks((prevTasks) => updateTaskList(prevTasks));
    setCompletedTasks((prevTasks) => updateTaskList(prevTasks));

    setEditingTaskId(null);
    setEditedTaskName("");
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditedTaskName("");
  };

  const deleteTask = (taskId) => {
    if (!taskId) return;

    setTasks((prevTasks) =>
      prevTasks.filter((task) => task && task.id !== taskId)
    );
    setInProgressTasks((prevInProgressTasks) =>
      prevInProgressTasks.filter((task) => task && task.id !== taskId)
    );
    setCompletedTasks((prevCompletedTasks) =>
      prevCompletedTasks.filter((task) => task && task.id !== taskId)
    );
  };

  return {
    tasks,
    inProgressTasks,
    completedTasks,
    addTask,
    taskComplete,
    deleteTask,
    moveToInProgress,
    moveToCompleted,
    editingTaskId,
    editedTaskName,
    setEditedTaskName,
    startEditing,
    saveEditedTask,
    cancelEditing,
  };
};

export default useTasks;
