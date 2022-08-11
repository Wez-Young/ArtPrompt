import React, { useState, useRender } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function ColourPaletteScreen() {
  const [colourPalette, setColourPalette] = useState([]);

  let temp = [];
  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            if(colourPalette.length > 0) setColourPalette([])

            let colourSegment = {
              hue:Math.floor(Math.random() * 361),
              saturation:Math.floor(Math.random() * 101),
              lightness:Math.floor(Math.random() * 101),
              lightnessIncrement: Math.ceil(Math.random() * 6),
              saturationIncrement: Math.ceil(Math.random() * 6),
              totalSaturation: 0,
              totalLightness: 0,
            }

            colourSegment.totalSaturation = colourSegment.saturation + (colourSegment.saturationIncrement * 7);
            colourSegment.totalLightness = colourSegment.lightness + (colourSegment.lightnessIncrement * 7);

             CheckIncrementValueIsValid(colourSegment.lightnessIncrement);
             CheckIncrementValueIsValid(colourSegment.lightnessIncrement);


            for (let i = 0; i < 7; i++) {
              temp.push(GradientHSL(colourSegment.hue, colourSegment.lightness, colourSegment.saturation));

              colourSegment.lightness = IncrementColourValue(colourSegment.lightness, colourSegment.lightnessIncrement, colourSegment.totalLightness);
              colourSegment.saturation = IncrementColourValue(colourSegment.saturation, colourSegment.saturationIncrement, colourSegment.totalSaturation);
            }
            setColourPalette(temp);
          }}
        >
          <Text>Generate random palette</Text>
        </TouchableOpacity>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={colourPalette}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            return (
              <View
                style={[
                  styles.colourBlock,
                  styles.mainContainer,
                  { backgroundColor: item, justifyContent: "center" },
                ]}
              >
                <Text style={styles.colourText}>{item}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

function RandomRGB() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red},${green},${blue})`;
}

function RandomHSL(lightness, saturation) {
  const hue = Math.floor(Math.random() * 361);

  return `hsl(${hue},${saturation}%,${lightness}%)`;
}

function GradientHSL(hue, lightness, saturation) {
  return `hsl(${hue},${saturation}%,${lightness}%)`;
}

function IncrementColourValue(colourValue, increment, total) {
  return total > 100
    ? colourValue - increment
    : colourValue + increment;
}

function CheckIncrementValueIsValid(increment){
  if(increment == 0) increment += 1;
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
  },
  subContainer: {
    alignItems: "center",
    height: "90%",
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
  colourText: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
