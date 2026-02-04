import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoItem from './components/TodoItem';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('tasks').then(data => {
      if (data) {
        setTasks(JSON.parse(data));
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (text === '') return;

    setTasks([...tasks, {
      id: Date.now().toString(),
      text: text,
      done: false
    }]);

    setText('');
  }

  function toggleTask(id) {
    setTasks(
      tasks.map(t =>
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
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <TodoItem item={item} onPress={toggleTask} />
        }
      />
    </View>
  );
}
