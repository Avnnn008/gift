
import s from './App.module.css'
import Gifts from './Gifts'

function App() {


  return (
  <div className={s.app}>
    <div className={s.title}>
      <div className={s.main}>С Днем рождения!</div>
      <div className={s.descr}>Здесь спрятаны твои подарки. </div>
      <div className={s.descr}>Заинтригован?</div>
      <div className={s.descr}>Не думай, что ты получишь их все сразу!😏</div>
      <div className={s.descr}>Ты можешь выбрать только по 1 подарку в час!</div>
      </div>
    <Gifts/>
  </div>
  )
}

export default App
