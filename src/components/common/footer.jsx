import React from 'react';
import './common.css'

export function Footer(props) {
    //media query
    const mediaQuery = window.matchMedia('(max-width: 400px)')
    let copyText;
    if (mediaQuery.matches) {
        copyText = '2021 Harmony'
    } else {
        copyText = '2021 Harmony - Harmony Interactive application by Pranav Yeole'
    }

    //end
    return (
        <div id="footer">
            <span>Harmony</span>
            <span>&copy; {copyText}</span>
        </div>
    )
}