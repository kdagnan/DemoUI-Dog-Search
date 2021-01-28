import React, { useState } from 'react'
import EditModal from '../EditModal';
import DogCard from './DogCard';
import Message from './Message';

function getSizeNum(size){
    let sizes = ['XS', 'SM', 'MD', 'LG', 'XL']
    return sizes.indexOf(size);
}

export default function DogList({dogs, searchParam, setRefresh}) {

    var {search, breedFilter, sizeFilter} = searchParam;
    var [orderBy, setOrderBy] = useState('name');
    search = search.toLowerCase();
    let matchingDogs = [];
    
    //Filter for dogs matching text search box
    matchingDogs.push(...dogs.filter(d => 
        (d.name.toLowerCase().includes(search) || 
        d.description.toLowerCase().includes(search)|| 
        d.owner.toLowerCase().includes(search)) 
        ) );
    
    //remove those not matching breed/size req
    matchingDogs = matchingDogs.filter(d => (
        (d.breed === breedFilter || breedFilter == '') && 
        (d.size === sizeFilter || sizeFilter === '')
    ))

    //Ordering
    if(orderBy === 'size'){
        matchingDogs.sort((a,b) => getSizeNum(a.size) > getSizeNum(b.size) ? 1 : -1 );
    }else{
        matchingDogs.sort((a,b) => a[orderBy] > b[orderBy] ? 1 : -1);
    }

    let mapDogList = () => {
        if(matchingDogs.length > 0){
            return matchingDogs.map((d) => {
                return <DogCard key={d.id} dog={d} setRefresh={setRefresh}/>
            })
        }else{
            return <Message message={'No Matching Dogs Found'} iconClass={'fa-exclamation-circle'}/>
        }
    }

    return (
        <div>
            <EditModal update={setRefresh}/>
            <div className="form-group form-inline w-25">
                <label htmlFor="exampleFormControlSelect1">Order By</label>
                <select className="form-control ml-0" id="exampleFormControlSelect1" style={{width: '150px' }} value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
                    <option value='name'>Name</option>
                    <option value='owner'>Owner</option>
                    <option disabled={sizeFilter.length > 0} value='size'>Size</option>
                    <option disabled={breedFilter.length > 0} value='breed'>Breed</option>
                </select>
            </div>
            <div className='card bg-light'>
                <div className='card-body'>
                    { mapDogList() }
                    { matchingDogs.length > 0 ? <p className='pull-right'>Showing {matchingDogs.length} matching dogs.</p> : null }
                </div>
            </div>
        </div>
    )
}
