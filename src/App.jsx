
import s from './App.module.css'
import Gifts from './Gifts'

function App() {


  return (
  <div className={s.app} id='app'>
    <div className={s.title}>
      <div className={s.main}>С Днем рождения!</div>
      <div className={s.descrbg}>
        <div className={s.descr}>
        <div>Пришло время подарков! </div>
        <div>В коробках спрятаны подсказки, где их искать.</div>
      <div>Но не думай, что ты получишь их все сразу!</div>
      <div>Ты можешь открыть только по 1 коробке в час!</div>
      </div>
      </div>
      
      </div>
    <Gifts/>
  </div>
  )
}

export default App
