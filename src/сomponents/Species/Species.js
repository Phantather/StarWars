import React, {useState, useEffect, useRef} from 'react'

import Preloader from "../Preloader";
import Error from "../Error";
import Form from "../Form";
import MainInfo from "../MainInfo";
import SubInfo from "../SubInfo";

function Species({getData}) {

    const url = 'https://swapi.dev/api/species/'

    const [specie, setSpecieData] = useState({})
    const [specieId, setSpecieId] = useState(1)
    const [error, setError] = useState()
    const [preloader, setPreloaderStatus] = useState(true)
    const [selectData, setSelectData] = useState([])
    const [specieType, setSpecieType] = useState([])

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            getSpecieType()
        }
    }, [specie]);

    useEffect(() => {
        getData(url).then(({data}) => {
            setSelectData(data.results.map(it => it.name))
            setPreloaderStatus(false)
        })
    }, [])

    const sendData = (e) => {
        setSpecieType([])
        e.preventDefault()
        if (specieId > 0 && specieId < 61) {
            getData(`${url}${specieId}`).then(({data}) => {
                setSpecieData(data)
                setError(false)
            })
        } else {
            setError(true)
        }
    }

    const getSpecieType = () => {
        specie.people.map((it) => getData(it).then(({data}) => {
            setSpecieType((people) => [...people, data])
        }))
    }

    const updateSpecieId = (e) => {
        setSpecieId(e.target.value)
    }

    return (
        <div className='planets'>
            {preloader ?
                <Preloader/>
                :
                <Form formName="Species" sendData={sendData} selectData={selectData} updateId={updateSpecieId}/>
            }

            {error ?
                <Error/>
                :
                error === undefined ?
                    null
                    :
                    <MainInfo data={specie} maxCount={8}/>
            }

            {specieType.length !== 0 ?
                <SubInfo data={specieType} maxCount={3} fields={["name"]}/>
                :
                null
            }
        </div>
    )
}

export default Species