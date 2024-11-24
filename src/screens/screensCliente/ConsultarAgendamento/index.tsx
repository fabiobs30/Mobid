import React, { useEffect, useState } from "react";
import { Container, ContainerAgendamento, ContainerAgendamentoConfirmados, ContainerAgendamentosPendentes,NomeLocalDesembarque,NomeLocalEmbarque, TituloAgendamentos } from "./styles";
import api from "../../../services/api";
import { useAuth } from "../../../Hooks/Auth";
import { FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";
interface AgendamentosPendentes{
  municipio_id:number;
  id:number;
  local_embarque_lat: number;
	nome_local_desembarque: string;
	local_desembarque_lon: number;
	data_agendamento: string;
	nome_local_embarque: string;
	estado_id: number;
	cliente_id: number;
	local_embarque_lon: number;
	local_desembarque_lat: number;
	horario_embarque: string;
	status_agendamento: boolean;
}
interface AngendamentoConfirmados{
  id_agendamento:number;
		data_agendamento: string;
		nome_local_embarque: string;
		nome_local_desembarque:string;
		horario_embarque: string;
		status_agendamento: boolean;
		motorista_nome: string;
		motorista_telefone: string;
		motorista_foto: string
	
}

export function ConsultarAgendamento(){
  const{usuario}= useAuth()
  const isFocused = useIsFocused();
  const[agendamentosPendentes,setAgendamentosPendentes]= useState<AgendamentosPendentes[]>([]);
  const[agendamentosConfirmados,setAgendamentosConfirmados]= useState<AngendamentoConfirmados[]>([]);
  const handleMeusAgendamentosPendentes= async () => {

      try {
        const response = await api.get(`/meus/agendamentos/pendentes/${usuario.cliente_id}`,
        );
        setAgendamentosPendentes(response.data)
      } catch (err) {
        console.error('erro ao buscar agendamentos pendentes:', err);
      }
  };
  const handleMeusAgendamentosConfirmados= async () => {

    try {
      const response = await api.get(`/meus/agendamentos/confirmados/${usuario.cliente_id}`,
      );
      setAgendamentosConfirmados(response.data)
    } catch (err) {
      console.error('erro ao buscar agendamentos pendentes:', err);
    }
};
  function formatarData(data: string): string {
    const [ano, mes, dia] = data.split("-"); // Divide a string 'yyyy-mm-dd'
    return `${dia}/${mes}/${ano}`; // Reorganiza para 'dd/mm/yyyy'
  }
  useEffect(()=>{
    if (!isFocused) {
      return; // Retorna sem fazer nada se não estiver focado
    }
    handleMeusAgendamentosPendentes();
    handleMeusAgendamentosConfirmados();
  },[isFocused]);

  return(

  <Container>
    <ContainerAgendamentosPendentes>
      
      <FlatList
      data={agendamentosPendentes}
      ListHeaderComponent={
<ContainerAgendamentosPendentes> 
<TituloAgendamentos> Agendamentos pendentes</TituloAgendamentos>
</ContainerAgendamentosPendentes>
      }
      renderItem={({item}) => (
        <ContainerAgendamento >
          <NomeLocalEmbarque> 
            Embarque: {item.nome_local_embarque}</NomeLocalEmbarque>
          <NomeLocalDesembarque>
            Desembarque: {item.nome_local_desembarque}</NomeLocalDesembarque>
            <NomeLocalDesembarque>
        Data: {formatarData(item.data_agendamento)}
      </NomeLocalDesembarque>
      <NomeLocalDesembarque>{item.horario_embarque}</NomeLocalDesembarque>
        </ContainerAgendamento>
      )}
      ListFooterComponent={
        <ContainerAgendamentoConfirmados>
          <TituloAgendamentos> Agendamentos Confirmados</TituloAgendamentos>
        
        <FlatList 
        data={agendamentosConfirmados}
        renderItem={({item}) => (
          <ContainerAgendamento >
            <NomeLocalDesembarque>Motorista :{item.motorista_nome}</NomeLocalDesembarque>
            <NomeLocalEmbarque>Embarque: {item.nome_local_embarque}</NomeLocalEmbarque>
            <NomeLocalDesembarque>
              Desembarque: {item.nome_local_desembarque}</NomeLocalDesembarque>
              <NomeLocalDesembarque>
          Data: {formatarData(item.data_agendamento)}
        </NomeLocalDesembarque>
        <NomeLocalDesembarque>Horário: {item.horario_embarque}</NomeLocalDesembarque>
          </ContainerAgendamento>
        )}

        />
        </ContainerAgendamentoConfirmados>
      }
      />
    </ContainerAgendamentosPendentes>

  </Container>
  )
}

