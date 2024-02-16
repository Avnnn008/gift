import { useEffect, useRef, useState } from "react";
import s from "./gifts.module.css";
import Timer from "./Timer";

export default function Gifts() {
  const GIFTS = {
    'gift1': {
      text: '"Тебе 18. Все остальное стаж!"'
    },
    'gift2': {
      text: 'Эта вещь необходима в путешествии, а сейчас она почти на улице, мерзнет...'
    },
    'gift3': {
      text: 'В куче документов иногда скрывается не документ...',
    },
    'gift4': {
      text: 'В этом месте не только Санокс и Ричин шампунь... '
    },
    'gift5': {
      text: 'Там был MSI KATANA 17...'
    },
    'gift6': {
      text: 'Посмотри за тем, что Гера видит во время еды...'
    },
    'gift7': {
      text: 'Ищи в пакете, лежащем под кожей и мехом...'
    },
    'gift8': {
      text: 'Загляни в серую вещь, которая еще вчера была в Рязани...'
    },
    'gift9': {
      text: 'Среди Гринфилда что-то есть...',
    },
  }

  const LIMIT_TIME = 1000*60*60
  const [open, setOpen] = useState(null); //открытие подарка
  const [limit, setLimit] = useState(false); //сообщение об ограничении открытия подарка
  const [nextOpeningTime, setNextOpeningTime] = useState(Date.now()); //время следующего доступа к подарку
  const [openGiftsCount, setOpenGiftsCount] = useState(0); //количество открытых подарков
  const giftsCount = Object.keys(GIFTS).length; //общее количество подарков
  const postcardRef = useRef(null)
  const openGiftsInThisSession = useRef([]) 

  useEffect(() => {
    setNextOpeningTime(
      localStorage.getItem("time")
        ? parseInt(localStorage.getItem("time"))
        : Date.now()
    );
    setOpenGiftsCount(
      localStorage.getItem("count")
        ? parseInt(localStorage.getItem("count"))
        : 0
    );
    // Для разработки:
    // Object.keys(GIFTS).forEach((el) => localStorage.removeItem(el));
    // localStorage.removeItem("time");
    // localStorage.removeItem("count");
  }, []);


  function openPostcard(postcard, reopening = false) {
    setTimeout(()=> {
      postcard.style.visibility = 'hidden'
    }, 600)
    let x = postcard.getBoundingClientRect().x;
    let y = postcard.getBoundingClientRect().y;
    let width = postcard.getBoundingClientRect().width
    let height = postcard.getBoundingClientRect().height
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;
    let xVector = centerX - width / 2 - x;
    let yVector = centerY - height / 2 - y;
    if (reopening) {
      xVector +=20
      yVector -=7
    }
    postcard.classList.add(s.bigpostcard)
    postcard.style.transform = `translate(${xVector}px, ${yVector}px) rotate(3600deg)`;
    
  }


  function openGift(e, name) {
    const postcard = e.target.firstChild
    if (!localStorage.getItem(name)) {
      if (Date.now() > nextOpeningTime) {  
        openPostcard(postcard)
        openGiftsInThisSession.current.push(name)
        setOpen(name);
        let time = Date.now() + LIMIT_TIME;
        let updatedOpenGiftsCount = openGiftsCount + 1;
        setNextOpeningTime(time);
        setOpenGiftsCount(updatedOpenGiftsCount);
        localStorage.setItem("count", updatedOpenGiftsCount);
        localStorage.setItem("time", time);
        localStorage.setItem(name, name);
      } else {
        setOpen(null);
        setLimit(true);
      }
    } else {
      let reopening = openGiftsInThisSession.current.includes(name)
      console.log(reopening, openGiftsInThisSession.current)
      openPostcard(postcard, reopening)
      setOpen(name);
      openGiftsInThisSession.current.push(name)
    }
  }


  function getGiftContent(name) {
    return (
      <div>{GIFTS[name].text}</div>
    )
  }

  function modalClickHandler(e) {
    if (e.target.id === "modal" || e.target.id === 'btn') {
      open && closePostcard()
      limit && setLimit(false)
    } 
  }

  function closePostcard() {
    setOpen(null);
    postcardRef.current.style.visibility = 'visible'
    postcardRef.current.classList.remove(s.bigpostcard)
    postcardRef.current.style.transform = `translate(20px, -7px)`;
  }

  return (
    <>
    <div className={s.window}>
      <div className={s.shadow}></div>
      <div className={s.timer}>
        <div></div>
        {openGiftsCount < giftsCount ? (
          nextOpeningTime <= Date.now() ? (
            <div>
              Выбирай!<i className="fa-solid fa-down-long"></i>
            </div>
          ) : (
            <Timer
              nextOpeningTime={nextOpeningTime}
              setNextOpeningTime={setNextOpeningTime}
            />
          )
        ) : (
          <div>Все открыто!</div>
        )}
      </div>

      {Object.keys(GIFTS).map((el) => (
        <div
          key={el}
          className={localStorage.getItem(el) ? s.opened : s.box}
          onClick={(e) => openGift(e, el)}
        >
          <div className={s.postcard} ref={open==el ? postcardRef : undefined}>
{localStorage.getItem(el) ? getGiftContent(el) : <></>}
          </div>
          
        </div>
      ))}
      {(open || limit) && <div id='modal' className={s.modal} onClick={modalClickHandler}>
        {open && <div className={s.postcard + ' ' + s.bigpostcard}>
        <div className={s.text}>
          {localStorage.getItem(open) ? getGiftContent(open) : <></>}
<div className={s.closebtn} id="btn" onClick={modalClickHandler}>ОК</div>
        </div>

          </div>}
          {limit && <div className={s.limit}>
        <div className={s.warning}>
          <div>Слишком рано! <br /> Следи за таймером!</div>
<div className={s.closebtn} id="btn" onClick={modalClickHandler}>ОК</div>
        </div>

          </div>}
      
      </div>}
    </div>
    </>
  );
}
