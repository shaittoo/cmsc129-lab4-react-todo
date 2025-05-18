import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, Typography, Box } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Todo, Priority } from '../types/todo';

interface TaskItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onToggleDone: (todo: Todo) => void;
  getPriorityColor: (priority: Priority) => string;
}

const TaskItem: React.FC<TaskItemProps> = ({ todo, onEdit, onDelete, onToggleDone, getPriorityColor }) => (
  <ListItem
    sx={{
      mb: 3,
      borderRadius: 3,
      boxShadow: '0 2px 12px 0 rgba(60,72,100,0.07)',
      bgcolor: todo.completed ? '#f3f4f6' : '#fff',
      opacity: todo.completed ? 0.6 : 1,
      transition: 'box-shadow 0.2s',
      '&:hover': {
        boxShadow: '0 4px 24px 0 rgba(60,72,100,0.13)',
      },
      p: 3,
    }}
  >
    <Checkbox
      checked={todo.completed}
      onChange={() => onToggleDone(todo)}
    />
    <ListItemText
      primary={
        <Typography
          sx={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            fontWeight: 600,
            fontSize: 20,
            color: '#1e293b',
          }}
        >
          {todo.title}
        </Typography>
      }
      secondary={
        <>
          <Typography variant="body2" sx={{ color: todo.completed ? 'text.disabled' : 'text.secondary', fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
            {todo.description}
          </Typography>
          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Due: {new Date(todo.dueDate).toLocaleDateString()} at {new Date(todo.dueTime).toLocaleTimeString()}
            </Typography>
            <Box
              component="span"
              sx={{
                bgcolor: getPriorityColor(todo.priority),
                color: '#fff',
                px: 2,
                py: 0.5,
                borderRadius: 5,
                fontSize: 13,
                fontWeight: 700,
                ml: 1,
                letterSpacing: 0.5,
                boxShadow: '0 1px 4px 0 rgba(60,72,100,0.10)',
              }}
            >
              {todo.priority} Priority
            </Box>
          </Box>
        </>
      }
    />
    <ListItemSecondaryAction>
      <IconButton edge="end" onClick={() => onEdit(todo)} sx={{ mr: 1 }}>
        <EditIcon />
      </IconButton>
      <IconButton edge="end" onClick={() => onDelete(todo.id)}>
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

export default TaskItem; 