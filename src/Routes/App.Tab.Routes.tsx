import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {Inicio} from '../screens/InicioCliente';
import {Viagens} from '../screens/Viagens';
import {Conta} from '../screens/Conta';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';

const { Navigator, Screen } = createBottomTabNavigator()

export function AppTabNav() {
  const theme=useTheme()
  const PaginaInicial = (focused:boolean, size: number, color: string) => (
    <Ionicons name={focused ? 'home': 'home-outline'}
    size={size} color={color} />
  );
  const Viagem = (focused:boolean, size: number, color: string) => (
    <Ionicons name={focused ? 'car': 'car-outline'}
    size={size} color={color} />
  );
  const Contas = (focused:boolean, size: number, color: string) => (
    <Ionicons name={focused ? 'person': 'person-outline'}
    size={size} color={color} />
  )

  return (
    <Navigator screenOptions={() => ({
      headerShown:false, 
      tabBarStyle:{backgroundColor:theme.colors.background,
        borderTopColor:theme.colors.border_tab
      },
      tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.tabInactive,
        tabBarLabelPosition: 'below-icon',
    })}>
      <Screen
        name="Inicio"
        component={Inicio}
        options={{
          tabBarLabel: 'Página Inicial',

          tabBarIcon: ({size, color, focused}) =>
            PaginaInicial(focused, size, color),
        }}
      />
      <Screen
        name="Viagens"
        component={Viagens}
        options={{
          tabBarLabel: 'Viagens',

          tabBarIcon: ({size, color, focused}) =>
            Viagem(focused, size, color),
        }}
      />
      <Screen
        name="Conta"
        component={Conta}
        options={{
          tabBarLabel: 'Conta',

          tabBarIcon: ({size, color, focused}) =>
            Contas(focused, size, color),
        }}
      />
    </Navigator>
  )
}