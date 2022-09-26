import { useListaParticipantes } from "../../state/hooks/useListaParticipantes"
import './styles.css'

const ListaParticipantes = () => {
  const participantes: string[] = useListaParticipantes()
  return (
    <ul>
      {participantes.map(participante => <li key={participante}>{participante}</li>)}
    </ul>
  )
}

export default ListaParticipantes