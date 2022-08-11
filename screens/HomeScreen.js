import React from "react";
import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Button
        title="Colour Palette"
        onPress={() => {
          navigation.navigate("ColourPalette");
        }}
      />
      <Button
        title="Triadic Palette"
        onPress={() => {
          navigation.navigate("TriadicPalette");
        }}
      />
    </View>
  );
}
