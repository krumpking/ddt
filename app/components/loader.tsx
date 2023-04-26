import React from 'react'
import { Audio } from 'react-loader-spinner';



const Loader = () => {
    return (
        <Audio
            height="100"
            width="100"
            color="#00947a"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
        />
    )
};


export default Loader
