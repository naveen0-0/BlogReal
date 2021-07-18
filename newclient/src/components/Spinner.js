import React from 'react';
import spinnerimg from '../images/loading.gif';

export default function Spinner() {
    return (
        <div className="spinnercontainer">
            <img src={spinnerimg} alt="Spinner" className="spinner" />
        </div>
    )
}
