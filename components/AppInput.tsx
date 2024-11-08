import React, { forwardRef } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Dimensions } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

type AppInputPropsType = {
  placeholder: string;
  setInputState: (value: string) => void;
  value: string;
  onSubmitEditing?: () => void;
  ref?: React.Ref<TextInput>;
};

const AppInput = forwardRef<TextInput, AppInputPropsType>(
  function AppInput(props, ref) {
    const { placeholder, setInputState, value, onSubmitEditing } = props;

    const placeholderColor = useThemeColor(
      { light: "#888", dark: "#aaa" },
      "placeholder",
    );

    const truncatePlaceholder = (text: string, maxLength: number) => {
      return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    return (
      <TextInput
        ref={ref}
        style={styles.input}
        placeholder={truncatePlaceholder(placeholder, 28)}
        onChangeText={setInputState}
        value={value}
        onSubmitEditing={onSubmitEditing}
        numberOfLines={2}
        placeholderTextColor={placeholderColor}
      />
    );
  },
);

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  input: {
    width: width * 0.55,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
});

export default AppInput;
