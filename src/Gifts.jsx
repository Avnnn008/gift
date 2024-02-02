import { useEffect, useRef, useState } from 'react'
import s from './gifts.module.css'



export default function Gifts () {
const GIFTS = [ 'sweet1','sert1','ris1', 'sert2', 'otkr',  'ris2', 'ris6', 'ris4',  'sert3', 'ris5', 'ris3','sweet2']
const time = useRef(null)
const [open, setOpen] = useState(null)
const [limit, setLimit] = useState(false)

    useEffect(()=> {
        time.current = localStorage.getItem('time')
        // GIFTS.map(el=>localStorage.removeItem(el))
        // localStorage.removeItem('time')
    })

    function openGift(name) {
            if (!localStorage.getItem(name)) {
                if (!time.current || Date.now() - time.current> 1000*60*60) {
                    setOpen(name)
            localStorage.setItem('time', Date.now())
            localStorage.setItem(name, name)
                } else {
                    setOpen(null)
            setLimit(true)
                }
                
            } else {
                setOpen(null)
            }
            
      
    }

    function takeGift(name) {
       if (/ris/.test(name)) {
        return <div className={s.gift}>
        <p>Подарок от нейросети!</p>
        <a href={`${name}.png`} target='blank'><img src={`${name}.png`} alt="" /></a>
        </div>
       } else if (/sweet/.test(name)) {
        return (
            <div className={s.gift}>
        <p>Сладкий подарок!</p>
        <img src={`${name}.png`} alt="" />
        </div>
        )
       } else if (/sert/.test(name)) {
        return (
            <div className={s.gift}>
        <p>Что-то приятное!</p>
        <img src={`${name}.png`} alt="" />
        </div>
        )
       } else if (/otkr/.test(name)) {
        return (
            <div className={s.gift}>
        <p>Как же без открытки!</p>
        <img src={`${name}.png`} alt="" />
        </div>
        )
       }
    }

    function getTime() {
        return new Date(parseInt(localStorage.getItem('time'))+1000*60*60).toLocaleTimeString('ru', {hour: 'numeric', minute: 'numeric'})
    }

    function close(e) {
        if (e.target.id === 'win') {
            setOpen(null)
            setLimit(false)
        }
    }
    

    return (
        <div className={s.window}>
{GIFTS.map(el=> (
    <div key={el} className={localStorage.getItem(el) ? s.opened : s.box} onClick={()=>openGift(el)}>
        {!localStorage.getItem(el) ? <img src="bow.png" alt="" /> : <div>{takeGift(el)}</div> }
    </div>
))}
{open && <div className={s.openwin} id='win' onClick={close}>
    <div className={s.openbox}>
        {takeGift(open)}
    </div>
</div> }
{limit && <div className={s.openwin} id='win' onClick={close}>
    <div className={s.limit}>
        Следующий подарок будет доступен в {getTime()}!
        <img src="icon.png" alt="" />
    </div>
</div> }
        </div>
    )
}