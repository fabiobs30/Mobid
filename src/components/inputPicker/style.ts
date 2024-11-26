import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const PickerContainer = styled.View`
 margin-bottom: ${RFValue(12)}px;
`;

export const dropDownPickerStyles = {
  containerStyle: {
    backgroundColor: '#FFFFFF',
    height: RFValue(50),
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: RFValue(10),
    paddingLeft: RFValue(5),
    zIndex: 5,
  },
  dropDownContainerStyle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: RFValue(18),
    zIndex: 10,
  },
  textStyle: {
    color: '#000',
    fontSize: RFValue(20),
  },
  placeholderStyle: {
    color: '#000',
    fontSize: RFValue(20),
  },
  selectedItemContainerStyle: {
    backgroundColor: '#335076',
  },
};