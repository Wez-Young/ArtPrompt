import React, { useState, useRender } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";

export default function ColourPaletteButton({
  colourPalette,
  setColourPalette,
  temp,
}) {
  return (
    <Button
      title={"Random"}
      onPress={() => {
        setColourPalette([]);

        let colourSegment = {
          hue: 0,
          saturation: Math.floor(Math.random() * 101),
          lightness: Math.floor(Math.random() * 101),
          lightnessIncrement: Math.ceil(Math.random() * 6),
          saturationIncrement: Math.ceil(Math.random() * 6),
          totalSaturation: 0,
          totalLightness: 0,
        };

        colourSegment.totalSaturation =
          colourSegment.saturation + colourSegment.saturationIncrement * 7;
        colourSegment.totalLightness =
          colourSegment.lightness + colourSegment.lightnessIncrement * 7;

        CheckIncrementValueIsValid(colourSegment.lightnessIncrement);
        CheckIncrementValueIsValid(colourSegment.lightnessIncrement);

        for (let i = 0; i < 7; i++) {
          colourSegment.hue = Math.floor(Math.random() * 361);
          temp.push(
            GradientHSL(
              colourSegment.hue,
              colourSegment.lightness,
              colourSegment.saturation
            )
          );

          colourSegment.lightness = IncrementColourValue(
            colourSegment.lightness,
            colourSegment.lightnessIncrement,
            colourSegment.totalLightness
          );
          colourSegment.saturation = IncrementColourValue(
            colourSegment.saturation,
            colourSegment.saturationIncrement,
            colourSegment.totalSaturation
          );
        }
        setColourPalette(temp);
      }}
    />
  );
}

function GradientHSL(hue, lightness, saturation) {
  return `hsl(${hue},${saturation}%,${lightness}%)`;
}

function IncrementColourValue(colourValue, increment, total) {
  return total > 100 ? colourValue - increment : colourValue + increment;
}

function CheckIncrementValueIsValid(increment) {
  if (increment == 0) increment += 1;
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
