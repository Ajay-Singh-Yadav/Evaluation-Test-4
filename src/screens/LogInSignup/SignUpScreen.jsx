import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {signUp} from '../../services/Auth';
import LottieView from 'lottie-react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import InputField from '../../components/InputField';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[a-z0-9]+[0-9]*@gmail\.com$/, 'Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must include upper, lower, number & special char',
    )
    .required('Password is required'),
});

const SignUpScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <Text style={styles.headerText}>Sign Up</Text>

      <Image
        source={require('../../assets/images/designNewArrival.png')}
        style={styles.lineImage}
      />

      <Formik
        initialValues={{
          email: '',
          password: '',
          showPassword: false,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, {resetForm, setSubmitting}) => {
          try {
            await signUp(values.email, values.password);
            resetForm();
            Alert.alert('Success', 'Account created successfully!');
            navigation.navigate('LogIn');
          } catch (error) {
            Alert.alert('Sign Up Error', error.message);
          } finally {
            setSubmitting(false);
          }
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
          isSubmitting,
        }) => (
          <>
            <InputField
              iconName="mail"
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email && errors.email}
              keyboardType="email-address"
            />
            <InputField
              iconName="lock"
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password && errors.password}
              isPassword
              showPassword={values.showPassword}
              toggleShowPassword={() =>
                setFieldValue('showPassword', !values.showPassword)
              }
            />

            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              {isSubmitting && (
                <LottieView
                  source={require('../../assets/animation/Loader.json')}
                  autoPlay
                  loop
                  style={{width: 100, height: 100}}
                />
              )}
            </View>

            <TouchableOpacity
              style={[
                styles.authButton,
                {backgroundColor: isSubmitting ? '#999' : 'black'},
              ]}
              onPress={handleSubmit}
              disabled={isSubmitting}>
              <Text style={styles.buttonText}>Sign Up</Text>
              <Entypo name="add-user" size={24} color="#fff" />
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{marginTop: 70}}>
        <Text style={{fontSize: 16, fontFamily: 'TenorSans-Regular'}}>
          Already have an account?
        </Text>
      </TouchableOpacity>

      <View style={styles.IconsLoginContainer}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/facebook.png')}
            style={styles.LoginIcons}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require('../../assets/images/Google.png')}
            style={styles.LoginIcons}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/Twitter.png')}
            style={styles.LoginIcons}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 40,
    fontFamily: 'TenorSans-Regular',
    marginTop: 100,
  },
  lineImage: {
    marginTop: 10,
    width: 200,
    height: 20,
    marginBottom: 40,
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 330,
    height: 50,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginRight: 10,
  },
  IconsLoginContainer: {
    flexDirection: 'row',
    marginTop: 50,
    width: 300,
    justifyContent: 'space-around',
  },
  LoginIcons: {
    width: 50,
    height: 50,
  },
});
