import React from 'react'

import './style.css'

function MainInfo({data, maxCount}) {

    // получаем ID из url
    const dataImgId = data.url.split('/').filter(it => it.length !== 0).splice(-2).join('/').replace('people', 'characters')
    //шаблон картинки
    const dataAvatar = `https://starwars-visualguide.com/assets/img/${dataImgId}.jpg`
    // В случае ошибки картинки подставить шаблон другой
    const dataError = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg'

    return (
        <div className="planet-card card">
            <img src={dataAvatar}
                 onError={(event) => {
                     event.target.onerror = null;
                     event.target.src = dataError
                 }}
                 className="card-img-top mt-4" alt=""/>

            <div className="card-body">
                <h5 className="card-title">{data.name}</h5>
            </div>
            <ul className="list-group list-group-flush">
                {
                    Object.keys(data).slice(0, maxCount).map((it, index) => {
                        return (
                            <li className="list-group-item d-flex justify-content-between" key={index}>
                                <span>{it.replace('_', ' ')}:</span>
                                {typeof data[it] === 'string' ? data[it] : null}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default MainInfo