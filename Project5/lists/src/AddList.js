import React, { Component } from 'react';

class AddList extends Component {
    
  constructor(){
      super();
      this.state={
          name:"",
		  text:""
      }
  }

  handleChange(e){
      this.setState({name:e.target.value});
  }

  handleSubmit(e) {
      e.preventDefault(); // this prevents the page from reloading -- do not delete this line!  
	  this.props.addList(this.state);
	  this.setState({name:""});
  }

  render() {
    return (
      <div id="addListDiv">
          <form onSubmit={this.handleSubmit.bind(this)}>
              <div id='addList'>
                  <label>What will be on your next list?&nbsp;
                      <input type='text' ref='id' id='newID' onChange={this.handleChange.bind(this)} value={this.state.name}></input>
                  </label>
              </div><br />
              <input type='submit' value='Create List' />
          </form>
      </div>
    );
  }
}

export default AddList;
