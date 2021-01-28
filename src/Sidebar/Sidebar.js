import React, { useState } from 'react'

export default function Sidebar({updateParams, search, breeds}) {
    let [searchVal, setSearch] = useState('')
    return (
        <div className='card bg-light mt-5'>
            <div className='card-header'>
                Filter & Search
            </div>
            <div className='card-body'>
                <form onSubmit={(e) => {e.preventDefault(); updateParams('search', searchVal)}}>
                    <div className="input-group mb-4">
                        <input type="text" className="form-control" value={searchVal} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, description, owner"/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-info" type="submit" id="button-addon2" style={{zIndex: 0}}><i className='fa fa-search'/></button>
                        </div>
                    </div>
                </form>
                <div className="form-group">
                    <label htmlFor="exampleSelect2">Breed</label>
                    <select className="form-control" id="exampleSelect2" value={search.breedFilter} onChange={(e) => updateParams('breedFilter', e.target.value)}>
                        <option value=''>All</option>
                        { breeds.sort((a,b) => a > b ? 1:-1).map((b, i) => <option key={i}>{b}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleSelect2">Size</label>
                    <select className="form-control" id="exampleSelect2" value={search.sizeFilter} onChange={(e) => updateParams('sizeFilter', e.target.value)}>
                        <option value=''>All</option>
                        <option>XS</option>
                        <option>SM</option>
                        <option>MD</option>
                        <option>LG</option>
                        <option>XL</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
