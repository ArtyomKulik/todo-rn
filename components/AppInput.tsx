

import React, { forwardRef, useRef } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TextInput } from 'react-native'
import { useAppSelector } from '@/hooks/reduxHooks'



type AppInputPropsType = {
    placeholder: string
    setInputState: (value: string) => void
    value: string
    onSubmitEditing?: () => void
    ref?: React.Ref<TextInput>;

}

const AppInput = forwardRef<TextInput, AppInputPropsType>(function AppInput(props, ref) {
    const { placeholder, setInputState, value, onSubmitEditing } = props;

    return (
        <TextInput
            ref={ref}
            style={styles.input}
            placeholder={placeholder}
            onChangeText={setInputState}
            value={value}
            onSubmitEditing={onSubmitEditing}
        />
    );
});

const styles = StyleSheet.create({
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        marginHorizontal: 10
    },
});

export default AppInput;
