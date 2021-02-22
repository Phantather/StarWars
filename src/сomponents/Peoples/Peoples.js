import React, {useState, useEffect, useRef} from "react";

import Error from "../Error";
import Preloader from "../Preloader";
import Form from "../Form";
import MainInfo from "../MainInfo";
import SubInfo from "../SubInfo";

import './style.css'

function Peoples({getData}) {

    const url = 'https://swapi.dev/api/people/'

    // Объект получаемого человека
    const [people, setPeopleData] = useState({})
    // ID человека выбранный из select
    const [peopleId, setPeopleId] = useState(1)
    // Объект со всеми элементами типа
    const [allTypeData, setAllTypeData] = useState({})
    // Массив имен людей получаемый при загрузке страницы
    const [selectData, setSelectData] = useState([])
    // Состояние ошибки
    const [error, setError] = useState()
    // Состояние прелодера
    const [preloader, setPreloaderStatus] = useState(true)
    // Массив фильмов, получаемый после первой прогрузки объекта people
    const [films, setFilms] = useState([])


    // Пропуск первого запуска функции getPlanetFilms при рендере
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            getPlanetFilms()
        }
    }, [people]);
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

    // Получить выбранного человека
    const sendData = (e) => {
        setFilms([])
        e.preventDefault()
        getData(`${url}${peopleId}`).then(({data}) => {
            setPeopleData(data)
            setError(false)
        }).catch((err) => {
            setError(true)
            console.log(err)
        })
    }

    // Получить фильмы планеты
    const getPlanetFilms = () => {
        people.films.map((it) => getData(it).then(({data}) => {
            setFilms((films) => [...films, data])
        }))
    }

    // Обновляет число в state из выбраного в select
    const updatePeopleId = (e) => {
        if (Number(e.target.value) >= 17){
            setPeopleId(Number(e.target.value) + 1)
        }else {
            setPeopleId(Number(e.target.value))
        }
    }


    return (
        <div className="peoples">
            {preloader ?
                <Preloader/>
                :
                <Form formName="Peoples" sendData={sendData} selectData={selectData} updateId={updatePeopleId}/>
            }

            {error ?
                <Error/>
                :
                error === undefined ? null : <MainInfo data={people} maxCount={8}/>
            }

            {films.length !== 0 ?
                <SubInfo data={films} maxCount={3} fields={["title"]}/>
                :
                null
            }

        </div>
    )
}

export default Peoples