import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box, Typography, RadioGroup, FormControlLabel, Radio, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { Priority } from '../types/todo';

interface EditTaskModalProps {
  open: boolean;
  onClose: () => void;
  editingTodo: any;
  setEditingTodo: (todo: any) => void;
  onEdit: (todo: any) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ open, onClose, editingTodo, setEditingTodo, onEdit }) => (
  <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    PaperProps={{ sx: { borderRadius: 4, p: 2, boxShadow: '0 8px 32px 0 rgba(60,72,100,0.18)' } }}
  >
    {editingTodo && (
      <>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={editingTodo.title}
            onChange={e => setEditingTodo({ ...editingTodo, title: e.target.value })}
            sx={{ mb: 2, mt: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            value={editingTodo.description}
            onChange={e => setEditingTodo({ ...editingTodo, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <DatePicker
            label="Due Date"
            value={new Date(editingTodo.dueDate)}
            onChange={date => setEditingTodo({ ...editingTodo, dueDate: date?.toISOString() || '' })}
            sx={{ mb: 2, width: '100%' }}
          />
          <TimePicker
            label="Due Time"
            value={new Date(editingTodo.dueTime)}
            onChange={time => setEditingTodo({ ...editingTodo, dueTime: time?.toISOString() || '' })}
            sx={{ mb: 2, width: '100%' }}
          />
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={editingTodo.priority}
              label="Priority"
              onChange={e => setEditingTodo({ ...editingTodo, priority: e.target.value as Priority })}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Mid">Mid</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => onEdit(editingTodo)} color="primary">
            Save
          </Button>
        </DialogActions>
      </>
    )}
  </Dialog>
);

export default EditTaskModal; 