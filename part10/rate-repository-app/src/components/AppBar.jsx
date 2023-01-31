import { View, StyleSheet, Pressable } from 'react-native'
import { Link } from 'react-router-native'
import Text from './Text'
import Constants from 'expo-constants'

import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  appBarText: {
    padding: 15,
    color: theme.colors.appBarText,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Link to="/">
          <Text style={styles.appBarText}>Repositories</Text>
        </Link>
      </Pressable>
      <Pressable>
        <Link to="/signin">
          <Text style={styles.appBarText}>Sign in</Text>
        </Link>
      </Pressable>
    </View>
  )
}

export default AppBar
