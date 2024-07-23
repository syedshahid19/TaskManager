import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const DragDropComponent = ({ tasks, onDragEnd, renderTask, filteredTasks }) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {['todo', 'inProgress', 'done'].map(columnId => (
        <Droppable droppableId={columnId} key={columnId}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="p-4 border rounded bg-gray-100">
              <h2 className="text-xl font-bold mb-4">{columnId.charAt(0).toUpperCase() + columnId.slice(1)}</h2>
              {filteredTasks(tasks[columnId]).map(renderTask)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </div>
  </DragDropContext>
);

export default DragDropComponent;
