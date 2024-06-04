import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import {PropsInput} from './interface';

export default function Input({
  name,
  control,
  rules,
  placeholder,
  error,
}: PropsInput) {
  const style = StyleSheet.create({
    content: {
      width: '100%',
      height: 60,
      marginTop: 20,
      borderWidth: 1,
      borderColor: error ? '#c81717' : '#c7c7c7',
      borderRadius: 12,
    },
    input: {
      width: '100%',
      height: 60,
      padding: 12,
      fontSize: 20,
      color: error ? '#c81717' : '#616161',
      fontWeight: 'bold',
    },
  });

  return (
    <View style={style.content}>
      <Controller
        name={name}
        control={control}
        rules={rules || {}}
        render={({field}) => (
          <TextInput
            value={field.value}
            style={style.input}
            placeholder={placeholder}
            onChangeText={field.onChange}
          />
        )}
      />
    </View>
  );
}