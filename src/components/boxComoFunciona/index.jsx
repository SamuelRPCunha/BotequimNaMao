import './boxComoFunciona.estilos.css'

export function BoxComoFunciona (props) {
  return (
    <section>
      <div className="box_como_funciona">
        <div className="box_numerador">
          <h1>{props.h1}</h1>
        </div>

        <h2>{props.h2}</h2>
        <p>
          {props.p}
        </p>
      </div>
    </section>
  )
}