import React from 'react';
import RNPickerSelect from 'react-native-picker-select';

export default function Picker(props){

  const placeholder = {
    label: 'Selecione uma moeda...',
    value: null,
    color: '#000'
  }

  return(
    <RNPickerSelect
    placeholder={placeholder}
    items={props.moedas}
    onValueChange={ (valor) => props.onChange(valor)  }
    style={{
      inputIOS:{
       fontSize:20,
       color: '#000' ,
       fontWeight: 'bold'
      },
      inputAndroid:{
        fontSize:20,
        color: '#000',
        fontWeight: 'bold'       
      }
    }}
    />
  );
}