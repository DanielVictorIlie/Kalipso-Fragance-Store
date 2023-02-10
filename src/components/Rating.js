import React from 'react'
import fillStar from '../assets/fillStar.png';
import emptyStar from '../assets/emptyStar.png';

function Rating({ rating, onClick, style }) {
    return (
        <>
            {
                [...Array(5)].map((_, i) => (
                    <span key={i} onClick={() => onClick(i)} style={style} className='ps-1'>
                        {rating > i ? (
                            <img src={fillStar} alt='fillstar' />
                        ) : (
                            <img src={emptyStar} alt='fillstar' />
                        )}
                    </span>
                ))
            }
        </>
    )
}

export default Rating