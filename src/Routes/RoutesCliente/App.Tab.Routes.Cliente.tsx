import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {InicioCliente} from '../../screens/screensCliente/InicioCliente';
import {Viagens} from '../../screens/Viagens';
import {ContaCliente} from '../../screens/screensCliente/ContaCliente';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';
import { EstabelecerDestino } from '../../screens/screensCliente/EstabelecerDestino';

const { Navigator, Screen } = createBottomTabNavigator()

export function AppTabNavCliente() {
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
        component={InicioCliente}
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
        component={ContaCliente}
        options={{
          tabBarLabel: 'Conta',

          tabBarIcon: ({size, color, focused}) =>
            Contas(focused, size, color),
        }}
      />
      <Screen
      name="EstabelecerDestino" 
      component={EstabelecerDestino} 
      options={{headerShown:false}}/>
    </Navigator>
  )
}