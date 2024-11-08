import {
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  ImageStyle,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import AppInput from "@/components/AppInput";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  addTask,
  deleteTask,
  setDescriptionInputVal,
  setNameInputVal,
} from "@/redux/todoSlice";
import AppButton, {
  AppButtonSizes,
  AppButtonVariants,
} from "@/components/AppButton";
import { useRef } from "react";
import { ThemedText } from "@/components/ThemedText";

export default function HomeScreen() {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector((store) => store.todos.tasks);

  const addTaskHandler = () => {
    dispatch(addTask());
  };

  const deleteTaskHandler = (id: number): void => {
    dispatch(dispatch(deleteTask(id)));
  };

  const titleInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);

  const handleNameSubmit = () => {
    descriptionInputRef.current?.focus();
  };

  const nameStoreValue = useAppSelector(
    (store) => store.todos.taskNameInputValue,
  );
  const descrStoreValue = useAppSelector(
    (store) => store.todos.taskDescriptionValue,
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo as ImageStyle}
        />
      }
    >
      <ThemedView style={styles.inputContainer}>
        <ThemedView style={styles.inputColumn}>
          <AppInput
            ref={titleInputRef}
            onSubmitEditing={handleNameSubmit}
            placeholder="It's always seems impossible"
            setInputState={(val) => dispatch(setNameInputVal(val))}
            value={nameStoreValue}
          />

          <AppInput
            ref={descriptionInputRef}
            placeholder="Описание..."
            setInputState={(val) => dispatch(setDescriptionInputVal(val))}
            value={descrStoreValue}
          />
        </ThemedView>
        <ThemedView style={styles.addBtn}>
          <AppButton
            buttonText="Добавить"
            buttonVariant={AppButtonVariants.ADD}
            buttonSize={AppButtonSizes.MEDIUM}
            buttonAction={addTaskHandler}
          />
        </ThemedView>
      </ThemedView>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ThemedView style={styles.addedTaskBlock}>
            <ThemedView style={styles.addedTaskBlockInner}>
              <ThemedText
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.name}
              >
                {item.name}
              </ThemedText>
              <ThemedText
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.descr}
              >
                {item.descr}
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.deleteBtn}>
              <AppButton
                buttonText="Удалить"
                buttonVariant={AppButtonVariants.DELETE}
                buttonSize={AppButtonSizes.SMALL}
                buttonAction={() => deleteTaskHandler(item.id)}
              />
            </ThemedView>
          </ThemedView>
        )}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginBottom: 10,
  },
  inputColumn: {
    flexDirection: "column",
  },
  addBtn: {
    marginLeft: 10,
  },
  addedTaskBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
    height: 100,
    borderWidth: 1,
    borderColor: "#000",
  },
  addedTaskBlockInner: {
    flexDirection: "column",
    flexShrink: 1,
  },
  deleteBtn: {
    marginLeft: 20,
  },
  name: {
    fontSize: 20,
  },
  descr: {
    fontSize: 14,
  },
  reactLogo: {},
});
