import React from 'react'
import { FC } from 'react';

interface MyProps {
    text: string,
    clickEvent: () => void,
    addIcon: boolean,
    iconElement?: JSX.Element

}


const SecondaryButton: FC<MyProps> = ({ text, clickEvent, addIcon, iconElement }) => {
    return (
        <button
            className='h-10 rounded-lg px-4 text-sky-400 font-bold border border-sky-400 mx-8 w-36'
            onClick={() => clickEvent()}>
            {addIcon ?
                <div className='flex flex-row space-x-2'>
                    <div>
                        <p>{text}</p>
                    </div>
                    <div>
                        {iconElement}
                    </div>
                </div>

                : <p>{text}</p>}

        </button>
    )
};


export default SecondaryButton
