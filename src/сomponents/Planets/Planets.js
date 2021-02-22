import React, {useState, useEffect, useRef} from 'react'

import MainInfo from "../MainInfo";
import Error from "../Error";
import Preloader from "../Preloader";
import SubInfo from "../SubInfo";
import Form from '../Form'

import './style.css'


function Planets({getData}) {

    const url = 'https://swapi.dev/api/planets/'

    // Объект получаемой планеты
    const [planet, setPlanetData] = useState({})
    // ID планеты выбранный из select
    const [planetId, setPlanetId] = useState(1)
    // Массив названий планет получаемый при загрузке страницы
    const [selectData, setSelectData] = useState([])
    // Объект со всеми элементами типа
    const [allTypeData, setAllTypeData] = useState({})
    // Состояние ошибки
    const [error, setError] = useState()
    // Состояние прелодера
    const [preloader, setPreloaderStatus] = useState(true)
    // Массив фильмов, получаемый после первой прогрузки объекта planet
    const [films, setFilms] = useState([])

    // Пропуск первого запуска функции getPlanetFilms при рендере
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            getPlanetFilms()
        }
    }, [planet]);
    // Конец пропуска

    // Получить все имена планет при первом рендере страницы
    useEffect(() => {
        getData(url).then(({data}) => {
            setAllTypeData(data)
        })
    }, [])

    useEffect(() => {
        if (Object.keys(allTypeData).length !== 0) {
            setSelectData((selectData) => [...selectData, ...allTypeData.results.map(it => it.name)])
            if (allTypeData.next !== null) {
                getData(allTypeData.next).then(({data}) => {
                    setAllTypeData(data)
                })
            } else {
                setPreloaderStatus(false)
            }
        }
    }, [allTypeData])
    // Конец получения всех имен планет

    // Получить выбранную планету
    const sendData = (e) => {
        setFilms([])
        e.preventDefault()
        getData(`${url}${planetId}`).then(({data}) => {
            setPlanetData(data)
            setError(false)
        }).catch((err) => {
            setError(true)
            console.log(err)
        })
    }

    // Получить фильмы планеты
    const getPlanetFilms = () => {
        planet.films.map((it) => getData(it).then(({data}) => {
            setFilms((films) => [...films, data])
        }))
    }

    //Обновлять state при изменении select
    const updatePlanetId = (e) => {
        setPlanetId(e.target.value)
    }

    return (
        <div className='planets'>
            {preloader ?
                <Preloader/>
                :
                <Form formName="Planets" sendData={sendData} selectData={selectData} updateId={updatePlanetId}/>
            }

            {error ?
                <Error/>
                :
                error === undefined ?
                    null
                    :
                    <MainInfo data={planet} maxCount={5}/>
            }

            {films.length !== 0 ?
                <SubInfo data={films} fields={["title"]}/>
                :
                null
            }
        </div>
    )
}

export default Planets