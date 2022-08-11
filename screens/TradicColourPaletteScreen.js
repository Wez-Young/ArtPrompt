import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const MAX = 71;
const MIN = 40;
const SEGMENT = 360 / 12;

export default function TriadicColourPaletteScreen() {
  const [colourPalette, setColourPalette] = useState([]);
  let hue = Math.floor(Math.random() * 361);

  let saturation = Math.floor(Math.random() * (MAX - MIN) + MIN);
  let lightness = Math.floor(Math.random() * (MAX - MIN) + MIN);
  let temp = [];
  let hueChangeCount = 0;

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          setColourPalette();

          for (let i = 0; i < 5; i++) {
            hue = GenerateNewTriadPalette(temp, hue, saturation, lightness);
          }

          setColourPalette(temp);
        }}
      >
        <Text>Generate random triadic palette</Text>
      </TouchableOpacity>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={colourPalette}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          return (
            <View
              style={[
                styles.mainContainer,
                {
                  backgroundColor: item,
                  justifyContent: "center",
                  width: 100,
                  height: 100,
                },
              ]}
            >
              <Text style={styles.colourText}>{item}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

function AddHSLValue(hue, lightness, saturation) {
  return `hsl(${hue},${saturation}%,${lightness}%)`;
}

function GenerateNewTriadPalette(colourPalette, hue, saturation, lightness) {
  let percent = Math.floor(
    Math.random() * (12 - 8) + 8
  );;
  let increment = Math.floor(
    Math.random() * (135 - 105) + 105
  );
  console.log("Hue:", hue, "Increment", increment);
  //if palette has no items directly add current HSV values
  if (colourPalette.length == 1 || colourPalette.length == 4) {
    saturation =
      Math.random() > 0.5 ? saturation + percent : saturation - percent;

    lightness = Math.random() > 0.5 ? lightness + percent : lightness - percent;
  } else if (colourPalette.length == 2 || colourPalette.length == 3) {
    if (hue + increment < 360) hue += increment;
    else hue = hue + increment - 360;
  }
  //else if it has 1 item or 4 items then change the SV by x percent
  //else

  colourPalette.push(AddHSLValue(hue, saturation, lightness));
  return hue;
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
  },
  buttonContainer: {
    alignSelf: "center",
    marginVertical: 20,
    padding: 8,
    backgroundColor: "#61bdd1",
    width: "80%",
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {},
  colourBlock: {
    width: 130,
    height: 130,
  },
});
