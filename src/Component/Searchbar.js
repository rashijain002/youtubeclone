import React from 'react';
class Searchbar extends React.Component{
    state={term:""};
    onInputChange=(event)=>{
        console.log(event.target)
        this.setState({term: event.target.val});
    };
    onFormSubmit=(event)=>{
        event.preventDefault();
        this.props.onFormSubmit(this.state.term);
    };
   
render(){
    return <div className='ui segment'>
        <form onSubmit = {this.onFormSubmit} className ='ui form'>
            <div className='field'>
            <label>Search Video</label>
            <input type ="text" value ={this.state.term} onChange = {e=>{
                console.log(this.state.term)
                this.setState({term:e.target.value})}}/>
            </div>

        </form>
    </div>
}
}
export default Searchbar;