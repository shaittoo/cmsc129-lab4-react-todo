import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box, Typography, RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { Priority } from '../types/todo';

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  newTodo: any;
  setNewTodo: (todo: any) => void;
  onAdd: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ open, onClose, newTodo, setNewTodo, onAdd }) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="sm"
    fullWidth
    BackdropProps={{ style: { backdropFilter: 'blur(6px)' } }}
    PaperProps={{ sx: { borderRadius: 4, p: 2, boxShadow: '0 8px 32px 0 rgba(60,72,100,0.18)' } }}
  >
    <DialogTitle fontWeight="bold">Add New Task</DialogTitle>
    <DialogContent>
      <TextField
        label="Task title"
        fullWidth
        value={newTodo.title}
        onChange={e => setNewTodo({ ...newTodo, title: e.target.value })}
        sx={{ mb: 2, mt: 1 }}
      />
      <TextField
        label="Add details about your task"
        fullWidth
        multiline
        minRows={2}
        value={newTodo.description}
        onChange={e => setNewTodo({ ...newTodo, description: e.target.value })}
        sx={{ mb: 2 }}
      />
      <Box display="flex" gap={2} mb={2}>
        <DatePicker
          label="Select date"
          value={newTodo.dueDate ? new Date(newTodo.dueDate) : null}
          onChange={date => setNewTodo({ ...newTodo, dueDate: date?.toISOString() })}
          sx={{ flex: 1 }}
        />
        <TimePicker
          label="Select time"
          value={newTodo.dueTime ? new Date(newTodo.dueTime) : null}
          onChange={time => setNewTodo({ ...newTodo, dueTime: time?.toISOString() })}
          sx={{ flex: 1 }}
        />
      </Box>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Priority
      </Typography>
      <RadioGroup
        row
        value={newTodo.priority}
        onChange={e => setNewTodo({ ...newTodo, priority: e.target.value as Priority })}
      >
        <FormControlLabel
          value="High"
          control={<Radio sx={{ color: '#f44336', '&.Mui-checked': { color: '#f44336' } }} />}
          label={<span style={{ color: '#f44336', fontWeight: 600 }}>High</span>}
        />
        <FormControlLabel
          value="Mid"
          control={<Radio sx={{ color: '#ff9800', '&.Mui-checked': { color: '#ff9800' } }} />}
          label={<span style={{ color: '#ff9800', fontWeight: 600 }}>Medium</span>}
        />
        <FormControlLabel
          value="Low"
          control={<Radio sx={{ color: '#4caf50', '&.Mui-checked': { color: '#4caf50' } }} />}
          label={<span style={{ color: '#4caf50', fontWeight: 600 }}>Low</span>}
        />
      </RadioGroup>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} variant="outlined">
        Cancel
      </Button>
      <Button
        onClick={() => {
          onAdd();
          onClose();
        }}
        variant="contained"
      >
        Add Task
      </Button>
    </DialogActions>
  </Dialog>
);

export default AddTaskModal; 