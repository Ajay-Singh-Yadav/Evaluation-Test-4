
# Evaluation Test -4

This is a React Native mobile app with useful features:

✅ Login & Signup using Firebase Authentication

📝 Form Validation using Formik and Yup

🗂️ To-Do List with Redux Toolkit (Add, Edit, Delete tasks)

🌐 API Integration using Axios to fetch and show user data

📸 Camera Feature using React Native Vision Camera.

## 📋 Features Overview

### ✅ 1. Authentication with Firebase
1. Firebase Email/Password Authentication integrated.

2. Packages:

npm install @react-native-firebase/app

npm intsall @react-native-firebase/auth

3. Auth flow includes:

Signup

Login

Logout

Protected routes after login

4. Displays the logged-in user's email.

## 📝 2. Formik + Yup for Form Handling

Used for managing form state and validation.

Email and Password fields with validation

Show/Hide password toggle

Real-time error handling

 #### Packages:
  npm install formik yup 

  Sample Usage:

 <Formik
  initialValues={{ email: '', password: '' }}
  validationSchema={validationSchema}
  onSubmit={handleLogin}
>


## 🔄 3. Redux Toolkit for Global State Management

Setup using @reduxjs/toolkit and react-redux.

Used for:

Managing To-Do List

CRUD operations on tasks

UI updates without prop-drilling

Store Structure:

src/redux/store.js

src/redux/slices/todoSlice.js

#### Features:

Add, update, delete tasks


## 🌐 4. API Integration with Axios

Used axios for HTTP requests.

Integrated https://jsonplaceholder.typicode.com/users

Users are displayed via FlatList.

#### Sample API Usage:

const response = await axios.get('https://jsonplaceholder.typicode.com/users');
setUsers(response.data);

## 📸 5. Camera Functionality

Integrated using react-native-vision-camera.

#### Features include:

Switch front/rear camera

Capture photo

set on profile photo

#### Components:

CameraScreen.js 

Uses useRef for camera control


## 🗂 Folder Structure

![folders](https://github.com/user-attachments/assets/61384c84-7cc7-47e6-88b2-ce7658ebe699)



## 🛠 Setup Instructions

### 1. Install Dependencies:

npm install

### 2. Firebase Setup:
Add Firebase project.

Enable Email/Password Auth.

Add config to your project.


### 3.Start Project:
npx react-native run-android

## 📸 Permissions Required

Update AndroidManifest.xml:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
```











