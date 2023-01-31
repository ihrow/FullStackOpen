import { View, StyleSheet, Image } from 'react-native'
import theme from '../theme'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
  },
  containerHeader: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 1,
  },
  repositoryHeader: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    margin: 10,
  },
  repositoryLanguage: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    color: theme.colors.appBarText,
    padding: 6,
    borderRadius: 5,
    marginTop: 5,
  },
  language: {
    color: 'white',
  },
  repositoryFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexGrow: 1,
    flexShrink: 1,
    padding: 10,
  },
  footerItem: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'center',
  },
})

const countFormatter = (count) => {
  count = Number(count)
  if (count < 1000) {
    return count
  } else if (count < 1000000) {
    return `${Math.round(count / 1000)}k`
  } else {
    return `${Math.round(count / 1000000)}m`
  }
}

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
          <View style={styles.repositoryHeader}>
            <Text fontWeight="bold">{item.fullName}</Text>
            <Text>{item.description}</Text>
            <View style={styles.repositoryLanguage}>
              <Text style={styles.language}>{item.language}</Text>
            </View>
          </View>
      </View>
      <View style={styles.repositoryFooter}>
        <View style={styles.footerItem}>
          <Text fontWeight="bold">{countFormatter(item.stargazersCount)}</Text>
          <Text>Stars</Text>
          </View>
        <View style={styles.footerItem}>
          <Text fontWeight="bold">{countFormatter(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.footerItem}>
          <Text fontWeight="bold">{countFormatter(item.reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.footerItem}>
          <Text fontWeight="bold">{countFormatter(item.ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  )
}

export default RepositoryItem
