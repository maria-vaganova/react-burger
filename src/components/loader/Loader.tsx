import React from 'react';
import loader from './Loader.module.css';

function Loader() {
    return (
        <div className={loader.loaderContainer}>
            <div className={loader.spinner}/>
        </div>
    );
}

export default Loader;