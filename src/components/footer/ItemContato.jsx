import './ItemContato.estilos.css'

export function ItemContato (props) {
  return (
    <div className="contatos">
      <img src={props.src} alt={props.alt} />
      <p>{props.p}</p>
    </div>
  )
}