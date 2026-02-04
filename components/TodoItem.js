import { Text, TouchableOpacity } from 'react-native';

export default function TodoItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={() => onPress(item.id)}>
      <Text style={{ textDecorationLine: item.done ? 'line-through' : 'none' }}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );
}
