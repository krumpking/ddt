import React, { useEffect, useState } from 'react'
import { FC } from 'react';

interface MyProps {
    src: string,
    alt: string,
    style: string
}



const ShowImage: FC<MyProps> = ({ src, alt, style }) => {





    return (
        <div className="m-auto">
            <img src={src} alt={alt} className={style} />
        </div>
    )
};


export default ShowImage