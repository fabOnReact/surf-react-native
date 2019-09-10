import { Dimensions, StyleSheet } from 'react-native';

const width = Dimensions.get("window").width / 100;
export const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 40, 
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
  },
  cell: {
  },
  headerRow: {
    marginTop:10,
    backgroundColor: "#bfbfbf",
    borderColor: "#737373",
    borderWidth: 0.3,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1,
    width: "100%",
    textAlign: "center",
  },
  subHeader: {
    backgroundColor: "#f2f2f2",
    height: 30,
    justifyContent: "center",
  },
  subHeaderText: {
    color: "#333333",
    width: "100%",
    textAlign: "left",
    marginLeft: 10,
    fontSize: 12,
  },
  forecastText: {
    textAlign: 'center',
    width: "100%",
  },
  surf: { 
    width: width * 20,
  },
  forecastContainer: {
    flex:1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 5,
  },
  swell: { 
    width: width * 45,
  },
  wind: {
    width: width * 35,
  },
  arrowContainer: {
    height: "100%", 
    width: 50, 
    // backgroundColor: "#27ae60",
    justifyContent: "center",
    alignItems: "center",
  },
  icon : { 
    height: 20, 
    width: 20, 
    marginBottom: 5,
  }
});
