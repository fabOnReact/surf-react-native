import Icon from 'react-native-vector-icons/Ionicons';

export default function FlagButton({ setVideo }){
  return (
    <TouchableOpacity
      text="Submit"
      style={styles.containerRight}
      onPress={() => setVideo(false)} >
      <Text>Cancel</Text>
      <Icon name="ios-flag" 
        size={50} 
        color="black" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  containerRight: {
    position: "absolute",
    bottom: 120,
    right: 5,
    height: 50,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 15,
    zIndex: 1,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
})
