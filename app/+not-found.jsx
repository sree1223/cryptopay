import { Background } from '@react-navigation/elements';
import { View } from 'expo-router';
import { StyleSheet } from 'react-native';


export default function NotFoundScreen() {
  return (
    <View styles={{Background:"#000"}}>
      {/* <Stack.Screen options={{ title: 'Oops!' }} /> */}
        {/* <Link href="/" style={styles.link}> */}
          <Text styles={{Background:"#000"}} >Go to home screen!</Text>
        {/* </Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
