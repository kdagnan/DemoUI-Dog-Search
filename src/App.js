import 'bootstrap/dist/css/bootstrap.min.css';
import './css/bootstrap.min.css'
import './App.css';
import React, { Component } from 'react'
import Sidebar from './Sidebar/Sidebar';
import DogList from './ListView/DogList';
import Header from './Header';
import InitialData from './InitialDogData';
import Loading from './ListView/Message';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function getBreedOptions(data){
  let breeds = [];
  data.forEach(d => {
    if(breeds.indexOf(d.breed) === -1){
      breeds.push(d.breed)
    }
  })
  return breeds;
}

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      dogDB: InitialData,
      breedOpts: getBreedOptions(InitialData),
      searchParams: {
        search: '',
        sizeFilter: '',
        breedFilter: ''
      },
      loading: true
    }
  }

  componentDidMount(){
    setTimeout(() => this.setState({loading: false}), 800);
  }

  //Updated by Sidebar
  modifySearchParams(key, val){
    let searchParams = this.state.searchParams;
    searchParams[key] = val;
    this.setState({
      searchParams: searchParams,
      loading: true
    })
    setTimeout(() => {
      this.setState({loading: false})
    }, 500);
  }

  //Update, Add, or Remove Dog
  refreshData(dog, remove = false){
    console.log(dog, remove);
    let dogs = this.state.dogDB;
    if(remove) dogs = dogs.filter(d => d.id !== dog.id);
    else{
      let oldDog = dogs.filter(d => d.id === dog.id)[0];
      if(oldDog){
        for(var val in dog){
          oldDog[val] = dog[val] 
        }
      }else{
        dog.id = dogs.length + 1;
        dogs.push(dog);
      }
    }
    let breeds = getBreedOptions(dogs);
    this.setState({dogDB: dogs, breedOpts: breeds, 
      searchParams: {...this.state.searchParams, 
        breedFilter: breeds.indexOf(this.state.searchParams.breedFilter) > -1 ? this.state.searchParams.breedFilter : ''
      }}, () => {
        console.log(this.state.searchParams);
      })
  }


  render() {
    return (
      <div className="container pt-5 pb-5" id='app'>
        <ToastContainer 
        position="bottom-center"
        />
        <Header count={this.state.dogDB.length}/>
        <div className='row mt-3'>
          <div className='col-md-4 mb-4'>
            <Sidebar updateParams={this.modifySearchParams.bind(this)} search={this.state.searchParams} breeds={this.state.breedOpts}/>
          </div>
          <div className='col-md-8'>
            {this.state.loading ? <Loading/> : <DogList dogs={this.state.dogDB} searchParam={this.state.searchParams} setRefresh={this.refreshData.bind(this)}/> }
          </div>
        </div>
    </div>
    )
  }
}

export default App;
