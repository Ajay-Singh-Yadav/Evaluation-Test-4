// // src/screens/SignUpScreen.js
// import React from 'react';
// import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
// import {Formik} from 'formik';
// import * as Yup from 'yup';

// const SignUpScreen = ({navigation}) => {
//   const signupSchema = Yup.object().shape({
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     password: Yup.string()
//       .min(6, 'Min 6 characters')
//       .required('Password is required'),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref('password')], 'Passwords must match')
//       .required('Confirm your password'),
//   });

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sign Up</Text>

//       <Formik
//         initialValues={{email: '', password: '', confirmPassword: ''}}
//         validationSchema={signupSchema}
//         onSubmit={values => {
//           console.log('Signup Values:', values);
//         }}>
//         {({
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           values,
//           errors,
//           touched,
//         }) => (
//           <>
//             <TextInput
//               placeholder="Email"
//               style={styles.input}
//               onChangeText={handleChange('email')}
//               onBlur={handleBlur('email')}
//               value={values.email}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//             {touched.email && errors.email && (
//               <Text style={styles.error}>{errors.email}</Text>
//             )}

//             <TextInput
//               placeholder="Password"
//               style={styles.input}
//               secureTextEntry
//               onChangeText={handleChange('password')}
//               onBlur={handleBlur('password')}
//               value={values.password}
//             />
//             {touched.password && errors.password && (
//               <Text style={styles.error}>{errors.password}</Text>
//             )}

//             <TextInput
//               placeholder="Confirm Password"
//               style={styles.input}
//               secureTextEntry
//               onChangeText={handleChange('confirmPassword')}
//               onBlur={handleBlur('confirmPassword')}
//               value={values.confirmPassword}
//             />
//             {touched.confirmPassword && errors.confirmPassword && (
//               <Text style={styles.error}>{errors.confirmPassword}</Text>
//             )}

//             <Button title="Sign Up" onPress={handleSubmit} />

//             <Text style={styles.link} onPress={() => navigation.goBack()}>
//               Already have an account? Login
//             </Text>
//           </>
//         )}
//       </Formik>
//     </View>
//   );
// };

// export default SignUpScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 28,
//     textAlign: 'center',
//     marginBottom: 24,
//   },
//   input: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 12,
//   },
//   error: {
//     color: 'red',
//     marginBottom: 10,
//   },
//   link: {
//     marginTop: 15,
//     textAlign: 'center',
//     color: '#007BFF',
//   },
// });

import React from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const signupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Minimum 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm your password'),
  });

  const handleSignUp = async (email, password) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log('User signed up:', userCredential.user.email);
      navigation.replace('MainTab'); // Navigate after successful signup
    } catch (error) {
      Alert.alert('Signup Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <Formik
        initialValues={{email: '', password: '', confirmPassword: ''}}
        validationSchema={signupSchema}
        onSubmit={values => handleSignUp(values.email, values.password)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              placeholder="Email"
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              secureTextEntry
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}

            <Button title="Sign Up" onPress={handleSubmit} />

            <Text style={styles.link} onPress={() => navigation.goBack()}>
              Already have an account? Login
            </Text>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#007BFF',
  },
});
