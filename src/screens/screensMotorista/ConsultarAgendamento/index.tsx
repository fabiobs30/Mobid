import React, { useEffect, useState } from "react";
import { 
  Container, 
  ContainerAgendamento, 
  ContainerAgendamentoConfirmados, 
  NomeLocalDesembarque, 
  NomeLocalEmbarque, 
  TituloAgendamentos 
} from "./styles";
import api from "../../../services/api";
import { useAuth } from "../../../Hooks/Auth";
import { FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import BackButton from "../../../components/BackButton";

interface AgendamentoConfirmado {
  id_agendamento: number;
  data_agendamento: string;
  nome_local_embarque: string;
  nome_local_desembarque: string;
  horario_embarque: string;
  status_agendamento: boolean;
  cliente_nome: string;
  cliente_telefone: string;
  cliente_foto: string;
}

export function ConsultarAgendamentoMotorista() {
  const { usuario } = useAuth();
  const isFocused = useIsFocused();
  const [agendamentosConfirmados, setAgendamentosConfirmados] = useState<AgendamentoConfirmado[]>([]);

  const handleMeusAgendamentosConfirmados = async () => {
    try {
      const response = await api.get(`/meus/agendamentos/confirmados/motorista/${usuario.motorista_id}`);
      setAgendamentosConfirmados(response.data);
      console.log(response.data)
    } catch (err) {
      console.error('Erro ao buscar agendamentos confirmados:', err);
    }
  };

  function formatarData(data: string): string {
    const [ano, mes, dia] = data.split("-"); // Divide a string 'yyyy-mm-dd'
    return `${dia}/${mes}/${ano}`; // Reorganiza para 'dd/mm/yyyy'
  }

  useEffect(() => {
    if (!isFocused) {
      return; // Retorna sem fazer nada se não estiver focado
    }
    handleMeusAgendamentosConfirmados();
  }, [isFocused]);

  return (
    <Container>
      <BackButton/>
      <ContainerAgendamentoConfirmados>
        <TituloAgendamentos>Agendamentos Confirmados</TituloAgendamentos>
        <FlatList 
          data={agendamentosConfirmados}
          keyExtractor={(item) => item.id_agendamento.toString()}
          renderItem={({ item }) => (
            <ContainerAgendamento>
              <NomeLocalDesembarque>Cliente: {item.cliente_nome}</NomeLocalDesembarque>
              <NomeLocalEmbarque>Embarque: {item.nome_local_embarque}</NomeLocalEmbarque>
              <NomeLocalDesembarque>Desembarque: {item.nome_local_desembarque}</NomeLocalDesembarque>
              <NomeLocalDesembarque>Data: {formatarData(item.data_agendamento)}</NomeLocalDesembarque>
              <NomeLocalDesembarque>Horário: {item.horario_embarque}</NomeLocalDesembarque>
            </ContainerAgendamento>
          )}
        />
      </ContainerAgendamentoConfirmados>
    </Container>
  );
}