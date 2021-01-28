import React, { useState } from 'react'
import Modal from 'react-modal';
import { toast } from 'react-toastify';

let style = {
    content: {
        height: '700px',
        width: '90%',
        maxWidth: '500px',
        // overflow: 'auto',
        top : '50%',
        left : '50%',
        transform             : 'translate(-50%, -50%)',
        marginRight           : '-50%',
        padding: '0px',
        background: 'none',
        border: 'none'
    }
}
var defaultDog = {id: -1, name: '', description: '', breed: '', size: 'SM', image: '', owner: ''}
Modal.setAppElement(document.getElementById('app'))

export default function EditModal(props) {
    var [modalOpen, setOpen] = useState(false);
    var [newDog, setNewDog] = useState(props.dog ? false : true);
    var [dog, setDog] = useState(props.dog ? props.dog : defaultDog)

    var updateVal = (e) => {
        console.log(e.target.id, e.target.value)
        dog[e.target.id] = e.target.value;
        console.log(dog)
        setDog({...dog});
    }

    var saveChanges = () => {
        toast.success(newDog ? 'Added Dog' : 'Updated Dog');
        props.update(dog);
        setOpen(false);
    }

    var deleteDog = () => {
        toast.success('Deleted Dog');
        setOpen(false); 
        props.update(dog, true);
    }

    return (
        <div>
            { newDog ? <button className='btn btn-success mb-2 float-right' onClick={() => setOpen(true)}>Add Dog</button> : <i className='fa fa-pencil edit-icon fa-lg text-success' onClick={() => setOpen(true)}/> }
            <Modal isOpen={modalOpen}
                onRequestClose={() => setOpen(false)}
                style={style}
                ariaHideApp={false}
            >
                    <div className="modal-content" style={{height: 'auto', overflow: 'auto'}}>
                        <div className="modal-header">
                            <h5 className="modal-title">{newDog ? 'Add Dog to Database' : 'Edit ' + props.dog.name}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" className='text-primary' onClick={() => setOpen(false)}>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" id="name" value={dog.name} onChange={updateVal}/>
                            </div>
                            <div className="form-group">
                                <label>Breed</label>
                                <input type="text" className="form-control" id="breed" value={dog.breed} onChange={updateVal}/>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea type="text" className="form-control" id="description" value={dog.description} onChange={updateVal}/>
                            </div>
                            <div className="form-group">
                                <label>Size</label>
                                <select className="form-control" id="size" value={dog.size} onChange={updateVal}>
                                    <option>XS</option>
                                    <option>SM</option>
                                    <option>MD</option>
                                    <option>LG</option>
                                    <option>XL</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Profile Image URL</label>
                                <input type="link" className="form-control" id="image" value={dog.image} onChange={updateVal}/>
                            </div>
                            <div className="form-group">
                                <label>Owner</label>
                                <input type="text" className="form-control" id="owner" value={dog.owner} onChange={updateVal}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal" onClick={() => setOpen(false)}>Cancel</button>
                            { newDog ? null : <button type="button" className="btn btn-outline-danger" data-dismiss="modal" onClick={deleteDog}><i className='fa fa-trash'/> Delete</button> }
                            <button type="button" className="btn btn-success" onClick={saveChanges}><i className='fa fa-save'/> {newDog ? 'Add Dog' : 'Save changes'}</button>
                        </div>
                    </div>
            </Modal>
        </div>
    )
}
