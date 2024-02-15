import { useEffect, useRef, useState } from 'react'
import s from './timer.module.css'

export default function Timer({nextOpeningTime, setNextOpeningTime}) {
    
    const [time, setTime] = useState(nextOpeningTime - Date.now())
    const interval = useRef()

    useEffect(()=> {
            interval.current = setInterval(()=> {
                setTime(nextOpeningTime - Date.now())
            }, 500)

        return ()=> {
            clearInterval(interval.current)
        }
    }, [time, nextOpeningTime])

    function showTimer() {
        let minutes = Math.floor(time/1000/60)
        if (minutes < 0) {
            setNextOpeningTime(Date.now())
            return
        }
        let seconds = Math.ceil((time - minutes*1000*60)/1000)
        if (seconds === 60) {
            seconds = 0
            minutes += 1
        }
        
        return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
    }



    return (
        <div>
            {showTimer()}
        </div>
    )
}

