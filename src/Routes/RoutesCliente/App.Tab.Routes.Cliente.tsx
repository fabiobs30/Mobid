import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { InicioCliente } from '../../screens/screensCliente/InicioCliente';
import { Viagens } from '../../screens/Viagens';
import { ContaCliente } from '../../screens/screensCliente/ContaCliente';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';
import { EstabelecerDestino } from '../../screens/screensCliente/EstabelecerDestino';
import { AgendamentoCliente } from '../../screens/screensCliente/AgendamentoCliente';
import { useAuth } from '../../Hooks/Auth';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabNavCliente() {
  const theme = useTheme();
  const { usuario } = useAuth(); // Pegando o objeto 'usuario' do hook
  const isCliente = usuario.usuario_cliente; // Verifica se o usuário é cliente

  const PaginaInicial = (focused: boolean, size: number, color: string) => (
    <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
  );
  const Viagem = (focused: boolean, size: number, color: string) => (
    <Ionicons name={focused ? 'car' : 'car-outline'} size={size} color={color} />
  );
  const Agendamento = (focused: boolean, size: number, color: string) => (
    <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={size} color={color} />
  );
  const Contas = (focused: boolean, size: number, color: string) => (
    <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
  );

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border_tab,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.tabInactive,
        tabBarLabelPosition: 'below-icon',
      }}
    >
      {/* Abas para todos os usuários */}
      <Screen
        name="Inicio"
        component={InicioCliente}
        options={{
          tabBarLabel: 'Página Inicial',
          tabBarIcon: ({ size, color, focused }) => PaginaInicial(focused, size, color),
        }}
      />
      <Screen
        name="Conta"
        component={ContaCliente}
        options={{
          tabBarLabel: 'Conta',
          tabBarIcon: ({ size, color, focused }) => Contas(focused, size, color),
        }}
      />

      {/* Condicional: Exibe abas diferentes dependendo do tipo de usuário */}
      {isCliente ? (
        <>
          <Screen
            name="Viagens"
            component={Viagens}
            options={{
              tabBarLabel: 'Viagens',
              tabBarIcon: ({ size, color, focused }) => Viagem(focused, size, color),
            }}
          />
          <Screen
            name="Agendar"
            component={AgendamentoCliente}
            options={{
              tabBarLabel: 'Agendamento',
              tabBarIcon: ({ size, color, focused }) => Agendamento(focused, size, color),
            }}
          />
          <Screen
          name="EstabelecerDestino"
          component={EstabelecerDestino}
          options={{
            tabBarLabel: 'Destino',
            tabBarIcon: ({ size, color, focused }) =>
              <Ionicons name={focused ? 'map' : 'map-outline'} size={size} color={color} />,
          }}
        />
        </>
      ) : (
        <Screen
          name="EstabelecerDestino"
          component={EstabelecerDestino}
          options={{
            tabBarLabel: 'Destino',
            tabBarIcon: ({ size, color, focused }) =>
              <Ionicons name={focused ? 'map' : 'map-outline'} size={size} color={color} />,
          }}
        />
      )}
    </Navigator>
  );
}
