import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Todo, Priority, SortOption } from '../types/todo';
import { todoService } from '../services/todoService';
import TaskCounter from './TaskCounter';
import TaskList from './TaskList';
import PaginationControls from './PaginationControls';
import AddTaskModal from './AddTaskModal';
import EditTaskModal from './EditTaskModal';

// Add fadeIn animation
const fadeInStyle = {
  animation: 'fadeIn 0.5s',
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Partial<Todo>>({
    title: '',
    description: '',
    priority: 'Mid',
    completed: false,
  });
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('dateAdded');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      const data = await todoService.getAll();
      setTodos(data);
    } catch (error) {
      toast.error('Failed to load todos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async () => {
    if (!newTodo.title) return;
    try {
      const todo = await todoService.create({
        ...newTodo,
        createdAt: new Date().toISOString(),
      } as Todo);
      setTodos([...todos, todo]);
      setNewTodo({ title: '', description: '', priority: 'Mid', completed: false });
      toast.success('Task added successfully');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  const handleEditTodo = async (todo: Todo) => {
    try {
      const updated = await todoService.update(todo.id, todo);
      setTodos(todos.map(t => t.id === todo.id ? updated : t));
      setEditingTodo(null);
      toast.success('Task updated successfully');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTodo = async () => {
    if (!todoToDelete) return;
    try {
      await todoService.delete(todoToDelete);
      const deletedTodo = todos.find(t => t.id === todoToDelete);
      setTodos(todos.filter(t => t.id !== todoToDelete));
      setDeleteDialogOpen(false);
      setTodoToDelete(null);
      toast.info(
        <div>
          Task deleted
          <Button
            color="primary"
            onClick={() => handleUndoDelete(deletedTodo)}
            style={{ marginLeft: '10px' }}
          >
            Undo
          </Button>
        </div>
      );
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleUndoDelete = async (todo: Todo | undefined) => {
    if (!todo) return;
    try {
      const restored = await todoService.create(todo);
      setTodos([...todos, restored]);
      toast.success('Task restored');
    } catch (error) {
      toast.error('Failed to restore task');
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'High': return '#f44336';
      case 'Mid': return '#ff9800';
      case 'Low': return '#4caf50';
      default: return 'default';
    }
  };

  const sortedTodos = [...todos].sort((a, b) => {
    switch (sortBy) {
      case 'dateAdded':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'dueDate':
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case 'priority':
        const priorityOrder = { High: 0, Mid: 1, Low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      default:
        return 0;
    }
  });

  const paginatedTodos = sortedTodos.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
        py: 6,
      }}
    >
      <ToastContainer />
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{
            letterSpacing: 1,
            color: '#1e293b',
            mb: 4,
            fontFamily: 'Inter, Roboto, Arial, sans-serif',
          }}
        >
          Todo List App
        </Typography>

        {/* Task Counter */}
        <TaskCounter total={todos.length} done={todos.filter(t => t.completed).length} />

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 2,
              fontWeight: 700,
              fontSize: 18,
              px: 4,
              py: 1.5,
              boxShadow: '0 2px 8px 0 rgba(60,72,100,0.10)',
              background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(90deg, #6366f1 0%, #2563eb 100%)',
              },
            }}
            onClick={() => setAddModalOpen(true)}
          >
            Add Task
          </Button>
          <FormControl>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortBy}
              label="Sort by"
              onChange={(e: SelectChangeEvent) => setSortBy(e.target.value as SortOption)}
              sx={{ minWidth: 160 }}
            >
              <MenuItem value="dateAdded">Date Added</MenuItem>
              <MenuItem value="dueDate">Due Date</MenuItem>
              <MenuItem value="priority">Priority</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
          <Typography variant="body2">
            Page {page} of {Math.max(1, Math.ceil(sortedTodos.length / pageSize))}
          </Typography>
        </Box>

        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <TaskList
            todos={paginatedTodos}
            onEdit={setEditingTodo}
            onDelete={id => {
              setTodoToDelete(String(id));
              setDeleteDialogOpen(true);
            }}
            onToggleDone={async todo => {
              const updated = { ...todo, completed: !todo.completed };
              await handleEditTodo(updated);
            }}
            getPriorityColor={getPriorityColor}
          />
        )}

        <PaginationControls
          page={page}
          totalPages={Math.ceil(sortedTodos.length / pageSize)}
          onPrev={() => setPage(page - 1)}
          onNext={() => setPage(page + 1)}
        />

        <AddTaskModal
          open={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          onAdd={handleAddTodo}
        />

        <EditTaskModal
          open={!!editingTodo}
          onClose={() => setEditingTodo(null)}
          editingTodo={editingTodo}
          setEditingTodo={setEditingTodo}
          onEdit={handleEditTodo}
        />

        {/* ...existing delete dialog... */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this task?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteTodo} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      {/* FadeIn animation keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: none;}
        }
      `}</style>
    </Box>
  );
};

export default TodoList; 