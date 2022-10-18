import { StyleSheet, Dimensions } from "react-native";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
    textAlign: 'justify',
  },
  contentBox: {
    flex: 1,
    width:  windowWidth-(windowWidth/4),

    justifyContent:'center',
    alignItems: 'center'
  },

  textBox: {
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    marginBottom: 12,
    backgroundColor: '#ddd'

  },

  button: {
    width: 300,
    marginVertical: 12,
    backgroundColor: "#222",
    borderRadius: 120,
  },
});

export default styles;
