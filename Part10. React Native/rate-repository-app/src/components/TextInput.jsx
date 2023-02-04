import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    textField: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        margin: 10,
    },
});

const TextInput = ({ ...props }) => {
  const textInputStyle = [styles.textField];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;