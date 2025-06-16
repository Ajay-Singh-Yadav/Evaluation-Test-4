// HomeScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const dummyUsers = [
  {id: 1, name: 'John Doe', email: 'john@example.com'},
  {id: 2, name: 'Jane Smith', email: 'jane@example.com'},
  {id: 3, name: 'Alice Brown', email: 'alice@example.com'},
  {id: 4, name: 'John Doe', email: 'john@example.com'},
  {id: 5, name: 'Jane Smith', email: 'jane@example.com'},
  {id: 6, name: 'Alice Brown', email: 'alice@example.com'},
  {id: 7, name: 'John Doe', email: 'john@example.com'},
  {id: 8, name: 'Jane Smith', email: 'jane@example.com'},
  {id: 9, name: 'Alice Brown', email: 'alice@example.com'},
  {id: 10, name: 'Alice Brown', email: 'alice@example.com'},
  {id: 11, name: 'John Doe', email: 'john@example.com'},
  {id: 12, name: 'Jane Smith', email: 'jane@example.com'},
  {id: 13, name: 'Alice Brown', email: 'alice@example.com'},
];

const dummyTodos = [
  {id: 1, task: 'Learn Redux Toolkit'},
  {id: 2, task: 'Integrate Axios API'},
  {id: 3, task: 'Learn Redux Toolkit'},
  {id: 4, task: 'Integrate Axios API'},
  {id: 5, task: 'Learn Redux Toolkit'},
  {id: 6, task: 'Integrate Axios API'},
];

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Section 1: API Users */}
      <Text style={styles.title}>📡 Users (API Integration)</Text>
      <FlatList
        data={dummyUsers}
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

      {/* Section 2: To-Do List (Redux) */}
      <Text style={styles.title}>✅ To-Do List (Redux Toolkit)</Text>
      {dummyTodos.map(todo => (
        <View key={todo.id} style={styles.todoItem}>
          <Text style={styles.todoText}>{todo.task}</Text>
          <TouchableOpacity>
            <Icon name="trash-outline" size={20} color="red" />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addText}>+ Add Todo</Text>
      </TouchableOpacity>

      {/* Section 3: Camera Feature */}
      <Text style={styles.title}>📷 Camera Capture (Native Feature)</Text>
      <TouchableOpacity style={styles.captureBtn}>
        <Icon name="camera" size={24} color="#fff" />
        <Text style={styles.captureText}>Capture Image</Text>
      </TouchableOpacity>

      <Image
        source={{uri: 'https://via.placeholder.com/150'}}
        style={styles.capturedImage}
      />
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
});
