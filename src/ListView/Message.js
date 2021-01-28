import React from 'react'

export default function Message({iconClass, message}) {
    return (
        <div className='load-card'>
            <div className='Loading'>
                <i className={'fa fa-3x text-info ' + (iconClass ? iconClass : 'fa-spinner fa-spin')}/>
                <h3 className='text-primary mt-3'>{message ? message : "Loading..."}</h3>
            </div>
        </div>
    )
}
