import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";


export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          navigation.navigate("ColourTheoryPalette");
        }}
      >
        <Text style={styles.buttonText}>Colour Palettes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          navigation.navigate("ColourTheoryPalette");
        }}
      >
        <Text style={styles.buttonText}>Subject Prompts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          navigation.navigate("ColourTheoryPalette");
        }}
      >
        <Text style={styles.buttonText}>Saved Prompts</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#161616" },
  buttonStyle: {
    padding: 12,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#EFF0F8",
    height: "20%",

  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
