import React from 'react'

import './style.css'

function SubInfoBlock({data, fields}) {

    // получаем ID из url
    const dataImgId = data.url.split('/').filter(it => it.length !== 0).splice(-2).join('/').replace('people', 'characters')
    //шаблон картинки
    const dataAvatar = `https://starwars-visualguide.com/assets/img/${dataImgId}.jpg`

    return (
        <div className='sub-info-block'>
            <div className="image-block">
                <img src={dataAvatar} alt=""/>
            </div>
            <div className="sub-info-text-block">
                {
                    //перебераем переданные из пропс и выводим их
                    fields.map((it, index) => {
                        return (
                            <span key={index}>{typeof data[it] === 'string' ? data[it] : null}</span>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SubInfoBlock