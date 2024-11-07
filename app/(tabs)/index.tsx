import { Image, StyleSheet, Platform, Pressable, Text, FlatList, View, TextInput } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AppInput from '@/components/AppInput';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { addTask, deleteTask, setDescriptionInputVal, setNameInputVal } from '@/redux/todoSlice';
import AppButton, { AppButtonSizes, AppButtonVariants } from '@/components/AppButton';
import { useRef } from 'react';

export default function HomeScreen() {

  const dispatch = useAppDispatch()

  const tasks = useAppSelector((store) => store.todos.tasks)

  const addTaskHandler = () => {
    dispatch(addTask())
  }

  const deleteTaskHandler = (id: number): void => {
    dispatch(dispatch(deleteTask(id)))
  }

  const titleInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);


  
  const handleNameSubmit = () => {
   descriptionInputRef.current?.focus();
};


  const nameStoreValue = useAppSelector((store) => store.todos.taskNameInputValue)
  const descrStoreValue = useAppSelector((store) => store.todos.taskDescriptionValue)

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.inputContainer}>
         <View style={styles.inputBlocks}>
      
         <AppInput ref={titleInputRef}                 onSubmitEditing={handleNameSubmit}
 placeholder="It's always seems impossible untill it's done!" setInputState={(val) => dispatch(setNameInputVal(val))} value={nameStoreValue}/>
         </View>
         <View style={styles.inputBlocks}>
        
         <AppInput                 ref={descriptionInputRef}
 placeholder="Описание..." setInputState={(val) => dispatch(setDescriptionInputVal(val))} value={descrStoreValue} />
         </View>
         <AppButton buttonVariant={AppButtonVariants.ADD} buttonSize={AppButtonSizes.MEDIUM} buttonAction={addTaskHandler}/>
         </ThemedView>

          <FlatList data={tasks}  keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (
            <ThemedView style={styles.addedTaskBlock}>
             <View style={styles.addedTaskBlockInside}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.descr}>{item.descr}</Text>
            </View>
            <AppButton buttonVariant={AppButtonVariants.DELETE} buttonSize={AppButtonSizes.SMALL} buttonAction={() => deleteTaskHandler(item.id)}/>
            </ThemedView>
          )}
 />
   
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#21313'
  },
  inputBlocks: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 8,
  
  },
  addedTaskBlock: {  
      flexDirection: 'row',
      justifyContent: 'space-between',
    padding: 30,
      height: 100,
      borderWidth: 1,
      borderColor: '#000'
  },
  addedTaskBlockInside: {
       flexDirection: 'column',
  },
  name: {
    fontSize: 20
  },
  descr: {
    fontSize: 14
  },
  reactLogo: {

  }
});
