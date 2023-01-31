import Text from './Text'
import { Pressable, View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'

import FormikTextInput from './FormikTextInput'

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#0366d6',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700'
  }
})

const SignIn = () => {
  const initialValues = {
    username: '',
    password: '',
  }

  const onSubmit = values => {
    console.log(values)
  }

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(4, 'Username must be at least 4 characters')
      .required('Username is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  })


  const SignInForm = ({ onSubmit }) => (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  )


  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn
