import React, { useEffect, useState } from 'react'
import { FC } from 'react';

interface MyProps {
    title: string,
    description: string,
    url: string | null
}



const FormSummary: FC<MyProps> = ({ title, description, url }) => {





    return (
        <a href={url !== null ? url : '/forms'}>
            <div className='grid grid-cols-12 shadow-2xl rounded-r-[30px] rounded-l-[20px] h-32 w-48'>
                <div className='bg-[#00947a] col-span-1 rounded-l-[30px] border'>

                </div>
                <div className="p-4  flex flex-col col-span-11">
                    <h1 className='font-bold'>{title}</h1>
                    <p className='font-bold text-xs'>{description.substring(0, 30)}...</p>
                </div>
            </div>

        </a>

    )
};


export default FormSummary