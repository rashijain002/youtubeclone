import React from 'react';
import Searchbar from './Searchbar';
import utube from '../apis/utube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import './VideoItem.css';
class App extends React.Component{
    state ={videos:[], selectedVideo:null,isLoading:false,error:""};
    onTermSubmit = async (term)=>{
        this.setState({
            videos:[],
            selectedVideo:null,
            isLoading:true,
            error:""
        });
        try{
    const response =await utube.get('/search',{
        params:{
            q:term
        }
    });
    this.setState({
        videos:response.data.items,
        selectedVideo:response.data.items[0],
        isLoading:false,
        error:""
    });}
    catch(error){
        this.setState({
            videos:[],
            selectedVideo:null,
            isLoading:false,
            error:error.message
        });
    }
    }
    onVideoSelect=(video)=>{
        this.setState({selectedVideo:video});
    }
    render(){
        return( 
        <div className='ui container'>
        <Searchbar onFormSubmit={term=>this.onTermSubmit(term)}/>
        {this.state.isLoading===true?<div>Loading...</div> : <></>}
        {this.state.error!==""?<div className="error">{this.state.error}</div> : <></>}
        <div className='ui grid'>
            <div className ='ui row'>
                <div className='eleven wide column'>
        <VideoDetail video={this.state.selectedVideo}/>
        </div>
        <div className='five wide column'>
        <VideoList onVideoSelect = {this.onVideoSelect} videos={this.state.videos}/>
        </div>
        </div>
        </div>
        </div>
        );
    }
}
export default App;