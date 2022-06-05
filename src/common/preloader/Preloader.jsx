import React from 'react';
import preloader from '../../assets/images/preloader.svg';



function Preloader(props) {
    return (
        <div>
            <img src={preloader} />
        </div>
    )
}

export default Preloader;