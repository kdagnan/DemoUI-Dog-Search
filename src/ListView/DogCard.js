import React, { useState } from 'react'
import EditModal from '../EditModal'

export default function DogCard({dog, setRefresh}) {
    return (
        <div className='card mb-3'>
            <div className='card-body pb-2'>
                <div style={{display: 'grid', gridTemplateColumns: 'auto 1fr'}}>
                    <div style={{gridColumn: '1'}} className='pr-3'>
                        <img src={dog.image} className='dog-image'/>
                        <br/><span className='badge badge-primary w-100'>{dog.breed}</span>
                    </div>
                    <div style={{gridColumn: '2'}}>
                        <h3>{dog.name}</h3>
                        <p className='text-muted'>{dog.description}</p>
                        <p className='m-0 float-right'>
                            <b>Owner: </b> { dog.owner }
                            <b className='ml-5'>Size: </b> { dog.size }
                        </p>
                    </div>
                </div>
                <EditModal dog={dog} update={setRefresh}/>
            </div>
        </div>
    )
}
