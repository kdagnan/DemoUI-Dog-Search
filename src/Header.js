import React from 'react'

export default function Header({count}) {
    return (
        <div className='card bg-primary text-white'>
            <div className='card-header'>
            <p className='float-right mb-0'>Application by Kyle Dagnan</p>

            </div>
            <div className='card-body'>
                <h4>The Dogs of</h4>
                <img src='https://www.planwithvoyant.com/content/img_v2_revised/logos/voyant/logo_white.svg'/>
            </div>
            <div className='card-footer'>
                <h5>There are currently <b>{count}</b> dogs at Voyant HQ.</h5>
            </div>
        </div>
    )
}
