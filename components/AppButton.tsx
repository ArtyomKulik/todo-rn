import React from 'react'
import { Pressable, Text, ViewStyle } from 'react-native'


export enum AppButtonVariants  {
    ADD = 'ADD',
    DELETE = 'DELETE'
}

export enum AppButtonSizes {
    SMALL = 'small',
    MEDIUM = 'medium'
}


type AppButtonPropsType = {
    buttonVariant: AppButtonVariants
    buttonSize: AppButtonSizes 
    buttonAction: () => void
}

function AppButton(props: AppButtonPropsType) {
 
    const {buttonVariant,buttonSize, buttonAction} = props

    const buttonText = buttonVariant === AppButtonVariants.ADD ? 'Добавить' : 'Удалить';
    const buttonStyle: ViewStyle = {  backgroundColor: buttonVariant === AppButtonVariants.ADD ? 'green' : 'brown', 
        width: buttonSize === AppButtonSizes.SMALL ? 60 : 100,
        paddingHorizontal: 12,
        paddingVertical: 16,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    };
    const buttonTextStyle = {
        color: '#e9decd'
    }

  return (
    
      <Pressable style={buttonStyle} onPress={buttonAction}><Text style={buttonTextStyle}>{buttonText}</Text></Pressable>
  )
}




export default AppButton
