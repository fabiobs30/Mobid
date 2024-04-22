import {Control, RegisterOptions, ErrorOption} from 'react-hook-form';

export interface PropsInput {
  name: string;
  control: Control;
  rules?: RegisterOptions;
  placeholder?: string;
  error?: ErrorOption;
}