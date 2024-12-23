import TaskInput from "./components/TaskInput.jsx";
import TaskList from "./components/TaskList.jsx";
import useTasks from "./components/useTasks.js";
import Layout from "./components/Layout.jsx";
import EditTask from "./components/EditTask";
import "./App.css";

const App = () => {
  const {
    tasks,
    addTask,
    completedTasks,
    taskComplete,
    deleteTask,
    startEditing,
    saveEditedTask,
    cancelEditing,
    editingTaskId,
    editedTaskName,
    setEditedTaskName,
    moveToInProgress,
    inProgressTasks,
  } = useTasks();

  const handleEditChange = (e) => {
    setEditedTaskName(e.target.value);
  };

  return (
    <Layout>
      <div className="task-header">
        <TaskInput onAddTask={addTask} />
      </div>
      <div className="task-columns grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h2>Tareas</h2>
          <TaskList
            tasks={tasks}
            onTaskComplete={taskComplete}
            onDeleteTask={deleteTask}
            onEditTask={(taskId, taskName) => startEditing(taskId, taskName)}
            onMoveToInProgress={moveToInProgress}
          />
        </div>
        <div>
          <h2>En Progreso</h2>
          <TaskList
            tasks={inProgressTasks}
            onTaskComplete={taskComplete}
            onDeleteTask={deleteTask}
            onEditTask={(taskId, taskName) => startEditing(taskId, taskName)}
          />
        </div>
        <div>
          <h2>Completadas</h2>
          <TaskList
            tasks={completedTasks} // Pasar las tareas completadas aquí
            onDeleteTask={deleteTask}
          />
        </div>
      </div>
      {editingTaskId && (
        <div className="edit-overlay">
          <EditTask
            taskId={editingTaskId}
            taskName={tasks.find((task) => task.id === editingTaskId)?.name}
            editedTaskName={editedTaskName || ""}
            onSave={saveEditedTask}
            onCancel={cancelEditing}
            onChange={handleEditChange}
          />
        </div>
      )}
    </Layout>
  );
};

export default App;
