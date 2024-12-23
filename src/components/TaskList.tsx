import React from "react";
import {
  CheckIcon,
  ArrowRightIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/outline";
type Task = {
  id: string | number; 
  name: string;
  completed?: boolean;
  inProgress?: boolean;
};

interface TaskListProps {
  tasks: Task[];
  onTaskComplete: (id: Task["id"]) => void;
  onDeleteTask: (id: Task["id"]) => void;
  onEditTask: (id: Task["id"], name: string) => void;
  onMoveToInProgress: (id: Task["id"]) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks = [],
  onTaskComplete,
  onDeleteTask,
  onEditTask,
  onMoveToInProgress,
}) => {
  if (!tasks.length) {
    return (
      <div className="bg-blue-100 text-blue-800 p-4 rounded-md border border-blue-300">
        <p>No hay tareas para mostrar</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      <ul className="space-y-2 w-full">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex flex-col items-start p-3 border rounded-md shadow-md transition-all ${
              task.completed ? "bg-green-100" : "bg-white"
            } task-item w-full`}
          >
            {/* Aplicamos line-through solo al nombre de la tarea */}
            <span
              className={`text-left text-lg font-semibold ${
                task.completed ? "line-through" : ""
              }`}
            >
              {task.name}
            </span>
            <div className="mt-2 flex gap-2 task-item-buttons justify-start w-full">
              {task.completed ? (
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => onTaskComplete(task.id)}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    <CheckIcon className="h-5 w-5" />
                  </button>
                  {!task.inProgress && (
                    <button
                      onClick={() => onMoveToInProgress(task.id)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      <ArrowRightIcon className="h-5 w-5" />
                    </button>
                  )}

                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onEditTask(task.id, task.name)}
                    className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
