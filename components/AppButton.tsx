import React from "react";
import { Dimensions, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

export enum AppButtonVariants {
  ADD = "ADD",
  DELETE = "DELETE",
}

export enum AppButtonSizes {
  SMALL = "small",
  MEDIUM = "medium",
}

type AppButtonPropsType = {
  buttonVariant: AppButtonVariants;
  buttonSize: AppButtonSizes;
  buttonAction: () => void;
  buttonText: string;
};

function AppButton(props: AppButtonPropsType) {
  const { buttonVariant, buttonSize, buttonAction, buttonText } = props;

  const { width, height } = Dimensions.get("window");

  const styles = StyleSheet.create({
    buttonStyle: {
      width: buttonSize === AppButtonSizes.SMALL ? width * 0.2 : width * 0.25,
      height:
        buttonSize === AppButtonSizes.SMALL ? height * 0.05 : height * 0.1,
      backgroundColor:
        buttonVariant === AppButtonVariants.ADD ? "#228B22" : "#A52A2A",
      borderRadius: 10,
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <Pressable style={styles.buttonStyle} onPress={buttonAction}>
      <ThemedText>{buttonText}</ThemedText>
    </Pressable>
  );
}

export default AppButton;
