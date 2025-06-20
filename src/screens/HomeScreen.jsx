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
      <Text style={styles.title}>Users List from API (JSONPlaceholder)</Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="tomato"
          style={{marginTop: 20}}
        />
      ) : (
        <FlatList
          data={users}
          scrollEnabled={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.userCard}>
              <Image
                source={require('../assets/images/man.png')}
                style={styles.userImage}
              />
              <View style={{marginLeft: 15}}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
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
            placeholderTextColor="#ccc"
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
    height: 45,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
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
    alignItems: 'center', // Vertically center content
    justifyContent: 'center', // ✅ Horizontally center the entire row
    marginTop: 10,

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

  userCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },

  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },

  userEmail: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
    textAlign: 'center',
  },

  userButton: {
    marginTop: 10,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },

  userButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
