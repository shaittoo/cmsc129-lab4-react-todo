import React from 'react';
import { List } from '@mui/material';
import { Todo, Priority } from '../types/todo';
import TaskItem from './TaskItem';

interface TaskListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggleDone: (todo: Todo) => void;
  getPriorityColor: (priority: Priority) => string;
}

const fadeInStyle = {
  animation: 'fadeIn 0.5s',
};

const TaskList: React.FC<TaskListProps> = ({ todos, onEdit, onDelete, onToggleDone, getPriorityColor }) => (
  <List sx={fadeInStyle}>
    {todos.map(todo => (
      <TaskItem
        key={todo.id}
        todo={todo}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleDone={onToggleDone}
        getPriorityColor={getPriorityColor}
      />
    ))}
  </List>
);

export default TaskList; 