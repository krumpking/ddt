import React, { FC, useEffect, useState } from 'react'
import CanvasDraw from "react-canvas-draw";
import { simpleDecrypt } from '../utils/crypto';
import { print } from '../utils/console';
import ShowImage from './showImage';


interface MyProps {
    num: number,
    info: any,
    code: string,
    codeId?: string,
    min?: number,
    max?: number
}


const ReturnElements: FC<MyProps> = ({ num, info, code, codeId }) => {
    const [elementNo, setElementNo] = useState(0);

    useEffect(() => {

        if (num < 5 || num > 17) {
            setElementNo(1);
        } else {
            setElementNo(num);
        }


    }, [num])


    const getElement = () => {

        switch (elementNo) {
            case 1:

                return (
                    <p>{simpleDecrypt(info, code)}</p>
                );
            case 5:
                //Radio
                return (
                    <p>{ }</p>
                );
            case 6:
                // Check Box
                return (
                    <p>{ }</p>
                );
            case 7:
                // Time
                return (
                    <p>{ }</p>
                );
            case 8:
                // Week
                return (
                    <p>{ }</p>
                );
            case 9:
                // Month
                return (
                    <p>{ }</p>
                );
            case 10:
                // Date
                return (
                    <p>{ }</p>
                );
            case 11:
                // Image
                return (
                    <ShowImage src={`/${codeId}/11/${simpleDecrypt(info, code
                    )}`} alt={'image'} style={''} />
                );
            case 12:
                // Video
                return (
                    <p>{ }</p>
                );
            case 13:
                // File
                return (
                    <p>{ }</p>
                );
            case 14:
                // Color
                return (
                    <p>{ }</p>
                );
            case 15:
                // Range
                return (
                    <p>{ }</p>
                );
            case 16:
                // Location
                return (
                    <p>{ }</p>
                );
            case 17:
                // Signature
                return (
                    <p>{ }</p>
                );

            default:
                return (
                    <p>{simpleDecrypt(info, code)}</p>
                );
                break;
        }
    }

    return (
        <div>
            {getElement()}
        </div>

    )
};


export default ReturnElements
