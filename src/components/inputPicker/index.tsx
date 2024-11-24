import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {PickerContainer, dropDownPickerStyles} from './style';
import {ActivityIndicator, Text, View} from 'react-native';

interface InputPickerProps {
  items: {label: string; value: any}[];
  onValueChange: (value: any) => void;
  placeholder?: {label: string; value: any};
  onOpen?: () => void;
  onClose?: () => void;
  itemKey?: string;
  loading?: boolean; // Nova propriedade para exibir o indicador de carregamento
  emptyMessage?: string; // Mensagem personalizada para lista vazia
}

const InputPicker: React.FC<InputPickerProps> = ({
  items,
  onValueChange,
  placeholder,
  onOpen,
  onClose,
  itemKey,
  loading = false,
  emptyMessage
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const borderColor = open ? '#335076' : 'gray';

  const ListEmptyComponent = () => (
    <View style={{padding: 10, alignItems: 'center'}}>
      {loading ? (
        <ActivityIndicator size="large" color="#335076" />
      ) : (
        <Text style={{color: '#FFFFFF', fontSize: 14}}>{emptyMessage}</Text>
      )}
    </View>
  );

  return (
    <PickerContainer>
      <DropDownPicker
        itemKey={itemKey}
        open={open}
        onClose={() => {
          setOpen(false);
          if (onClose) {
            onClose();
          }
        }}
        onOpen={() => {
          setOpen(true);
          if (onOpen) {
            onOpen();
          }
        }}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        onChangeValue={onValueChange}
        placeholder={placeholder?.label || 'Select an option'}
        style={{
          ...dropDownPickerStyles.containerStyle,
          borderColor: borderColor,
        }}
        listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: false,
        }}
        dropDownContainerStyle={{
          ...dropDownPickerStyles.dropDownContainerStyle,
          borderColor: borderColor,
          maxHeight: 148,
        }}
        textStyle={dropDownPickerStyles.textStyle}
        placeholderStyle={dropDownPickerStyles.placeholderStyle}
        selectedItemContainerStyle={
          dropDownPickerStyles.selectedItemContainerStyle
        }
        ListEmptyComponent={ListEmptyComponent} // Adicionado componente para lista vazia
      />
    </PickerContainer>
  );
};

export default InputPicker;
