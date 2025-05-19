import { db } from '../firebase';
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc
} from 'firebase/firestore';
import { Todo } from '../types/todo';

const todosCollection = collection(db, 'todos');

export const todoService = {
  getAll: async (): Promise<Todo[]> => {
    const snapshot = await getDocs(todosCollection);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        dueTime: data.dueTime,
        priority: data.priority,
        completed: data.completed,
        createdAt: data.createdAt,
      } as Todo;
    });
  },

  create: async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
    const docRef = await addDoc(todosCollection, todo);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return {
      id: docRef.id,
      title: data?.title,
      description: data?.description,
      dueDate: data?.dueDate,
      dueTime: data?.dueTime,
      priority: data?.priority,
      completed: data?.completed,
      createdAt: data?.createdAt,
    } as Todo;
  },

  update: async (id: string, todo: Partial<Todo>): Promise<Todo> => {
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, todo);
    const updatedSnap = await getDoc(todoRef);
    return { id, ...updatedSnap.data() } as Todo;
  },

  delete: async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'todos', id));
  }
}; 