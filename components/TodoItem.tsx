import { Text, TouchableOpacity } from 'react-native';

interface Task {
  id: string;
  text: string;
  done: boolean;
}

interface TodoItemProps {
  item: Task;
  onPress: (id: string) => void;
}

export default function TodoItem({ item, onPress }: TodoItemProps) {
  return (
    <TouchableOpacity onPress={() => onPress(item.id)}>
      <Text style={{ textDecorationLine: item.done ? 'line-through' : 'none' }}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );
}
