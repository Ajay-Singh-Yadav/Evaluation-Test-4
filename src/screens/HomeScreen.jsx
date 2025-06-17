import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import {useDispatch, useSelector} from 'react-redux';
import {addTodo, updateTodo, deleteTodo} from '../redux/slices/todoSlice';
import axios from 'axios';

const HomeScreen = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const [task, setTask] = useState('');
  const [editId, setEditId] = useState(null);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddOrUpdate = () => {
    if (!task.trim()) return;

    if (editId) {
      dispatch(updateTodo({id: editId, newTask: task}));
      setEditId(null);
    } else {
      dispatch(addTodo(task));
    }

    setTask('');
  };

  const handleEdit = item => {
    setTask(item.task);
    setEditId(item.id);
  };

  const handleDelete = id => {
    Alert.alert('Delete', 'Are you sure?', [
      {text: 'Cancel'},
      {text: 'Delete', onPress: () => dispatch(deleteTodo(id))},
    ]);
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Section 1: API Users */}

      <Text style={styles.title}>📡 Users (API Integration)</Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="tomato"
          style={{marginTop: 20}}
        />
      ) : (
        <FlatList
          data={users}
          nestedScrollEnabled={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Icon name="person-circle-outline" size={30} color="#007AFF" />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSubtitle}>{item.email}</Text>
              </View>
            </View>
          )}
        />
      )}

      {/* Section 2: To-Do List (Redux) */}
      <Text style={styles.title}>✅ To-Do List (Redux Toolkit)</Text>

      <View>
        {todos.map(todo => (
          <View key={todo.id} style={styles.todoItem}>
            <Text style={styles.todoText}>{todo.task}</Text>
            <View style={{flexDirection: 'row', gap: 25}}>
              <TouchableOpacity onPress={() => handleEdit(todo)}>
                <Feather name="edit" size={20} color="green" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(todo.id)}>
                <Icon name="trash-outline" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.inputRow}>
          <TextInput
            placeholder="Enter a task..."
            value={task}
            onChangeText={setTask}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddOrUpdate}>
            <Text style={styles.addText}>
              {editId ? 'Update' : '+ Add Todo'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fefefe',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef6ff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  cardContent: {
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff3cd',
    padding: 12,
    marginVertical: 5,
    borderRadius: 8,
  },
  todoText: {
    fontSize: 15,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 30,
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  captureBtn: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 10,
    justifyContent: 'center',
    marginTop: 10,
  },
  captureText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  capturedImage: {
    height: 150,
    width: '100%',
    marginTop: 15,
    borderRadius: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  todoText: {
    fontSize: 16,
  },
  inputRow: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    gap: 10,
    marginBottom: 50,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
