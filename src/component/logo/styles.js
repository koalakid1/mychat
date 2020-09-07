
import { StyleSheet } from "react-native";
import { color, appStyle } from "../../utility";
import { smallDeviceHeight } from "../../utility/constants";

const getDimensions = () => {
  if (appStyle.deviceHeight > smallDeviceHeight) {
    return {
      height: 100,
      width: 300,
      borderRadius: 100,
      logoFontSize: 50,
    };
  } else {
    return {
      height: 120,
      width: 120,
      borderRadius: 40,
      logoFontSize: 70,
    };
  }
};

export default StyleSheet.create({
  logo: {
    height: getDimensions().height,
    width: getDimensions().width,
    borderRadius: getDimensions().borderRadius,
    backgroundColor: color.DARK_GRAY,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: getDimensions().logoFontSize,
    fontWeight: "bold",
    color: color.WHITE,
  },
});