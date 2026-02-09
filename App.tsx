import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoItem from './components/TodoItem';

interface Task {
  id: string;
  text: string;
  done: boolean;
}


export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await AsyncStorage.getItem('tasks');
        if (data) {
          setTasks(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(tasks)).catch(console.error);
  }, [tasks]);

  function addTask(): void {
    if (text.trim() === '') return;

    const newTask: Task = {
      id: Date.now().toString(),
      text: text.trim(),
      done: false
    };

    setTasks(prev => [...prev, newTask]);
    setText('');
  }

  function toggleTask(id: string): void {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  }

  return (
    <View style={{ padding: 20, marginTop: 40 }}>
      <Text style={{ fontSize: 22, marginBottom: 10 }}>
        Todo list
      </Text>

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="New task"
        style={{ marginBottom: 10 }}
      />

      <Button title="Add" onPress={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem item={item} onPress={toggleTask} />
        )}
      />
    </View>
  );
}
