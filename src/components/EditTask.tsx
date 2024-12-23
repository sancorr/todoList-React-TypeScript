const EditTask = ({ taskId, editedTaskName, onSave, onCancel, onChange, taskName }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center space-x-2 mb-4 w-full max-w-xs sm:max-w-sm mx-auto"> 
          <input
            type="text"
            value={editedTaskName}
            onChange={onChange} 
            className="flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <div className="flex mt-4 gap-2 w-full sm:w-auto justify-between sm:justify-start"> 
            <button
              onClick={onSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full sm:w-auto"
            >
              Guardar
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 w-full sm:w-auto"
            >
              Cancelar
            </button>
          </div>
        </div>
      );
};

export default EditTask;
