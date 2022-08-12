import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import ColourPaletteButton from "../components/RandomPaletteButton";

const MAX = 71;
const MIN = 40;
const SEGMENT = 360 / 12;

export default function ColourTheoryPaletteScreen() {
  const [colourPalette, setColourPalette] = useState([]);
  let hue = Math.floor(Math.random() * 361);

  let saturation = Math.floor(Math.random() * (MAX - MIN) + MIN);
  let lightness = Math.floor(Math.random() * (MAX - MIN) + MIN);
  let temp = [];

  return (
    <View style={styles.mainContainer}>
      <View style={{ flexDirection: "row" }}>
        <ColourPaletteButton
          colourPalette={colourPalette}
          setColourPalette={setColourPalette}
          temp={temp}
        />
        <Button
          title={"Analogous"}
          onPress={() => {
            setColourPalette();

            for (let i = 0; i < 5; i++) {
              hue = GenerateNewColourTheoryPalette(
                temp,
                hue,
                saturation,
                lightness,
                "analogous"
              );
            }

            setColourPalette(temp);
          }}
        />
        <Button
          title={"Triadic"}
          onPress={() => {
            setColourPalette();

            for (let i = 0; i < 5; i++) {
              hue = GenerateNewColourTheoryPalette(
                temp,
                hue,
                saturation,
                lightness,
                "triadic"
              );
            }

            setColourPalette(temp);
          }}
        />
        <Button
          title={"Complement"}
          onPress={() => {
            setColourPalette();

            for (let i = 0; temp.length < 5; i++) {
              hue = GenerateNewColourTheoryPalette(
                temp,
                hue,
                saturation,
                lightness,
                "complement"
              );
            }

            setColourPalette(temp);
          }}
        />
      </View>

        <FlatList style={{marginVertical: 10}}
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
                    width: 125,
                    height: 125,
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

function GenerateNewColourTheoryPalette(
  colourPalette,
  hue,
  saturation,
  lightness,
  theory
) {
  let percent = Math.floor(Math.random() * (12 - 8) + 8);
  let increment = 0;
  let hueCopy = hue;

  if (theory == "triadic")
    increment = Math.floor(Math.random() * (135 - 105) + 105);
  else if (theory == "analogous")
    increment = Math.floor(Math.random() * (45 - 30) + 30);
  else increment = Math.floor(Math.random() * (200 - 160) + 160);

  //if palette has no items directly add current HSV values
  if (
    colourPalette.length == 1 ||
    colourPalette.length == 4 ||
    (colourPalette.length == 2 && theory == "complement")
  )
    [saturation, lightness] = UpdateSaturationAndLightness(
      saturation,
      lightness,
      percent
    );
  else if (colourPalette.length == 2 || colourPalette.length == 3)
    hue = UpdateHue(hue, increment);

  //else if it has 1 item or 4 items then change the SV by x percent
  //else
  let newColourSwatch = AddHSLValue(hue, saturation, lightness);
  if (CheckPaletteForDuplicate(colourPalette, newColourSwatch)) {
    console.log("Duplicate colour found");
    return hueCopy;
  }
  colourPalette.push(newColourSwatch);
  return hue;
}

function UpdateHue(hue, increment) {
  return hue + increment < 360 ? (hue += increment) : hue + increment - 360;
}

function UpdateSaturationAndLightness(saturation, lightness, percent) {
  saturation =
    Math.random() > 0.5 ? saturation + percent : saturation - percent;
  lightness = Math.random() > 0.5 ? lightness + percent : lightness - percent;

  return [saturation, lightness];
}

function CheckPaletteForDuplicate(colourPalette, colourSwatch) {
  if (colourPalette.includes(colourSwatch)) return true;
  return false;
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    backgroundColor: "#161616",
    flex: 1,
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
  colourText: {},
});
