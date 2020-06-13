class FontChooser extends React.Component {

    constructor(props) {
        super(props);
        var isBold = (this.props.bold === 'true');
        this.state = {hide:true, bold:isBold, ftSize:this.props.size, color:'black'};
    }
    
    handleTextClick(){
        this.setState({hide:!this.state.hide});
    }
    
    handleCheckBox(){
        this.setState({bold:!this.state.bold});
    }
    
    resetFtSize(){
        this.setState({ftSize:this.props.size,color:'black'});
    }
    
    incFtSize(){
        var numFtSize = Number(this.state.ftSize)
        if(numFtSize<Number(this.props.max)){
            this.setState({ftSize:parseFloat(numFtSize+1)});
            if(numFtSize===Number(this.props.max)-1){
                this.setState({color:'red'});
            }
        }
        else{
            this.setState({color:'red'});
        }     
    }
    
    decFtSize(){
        var numFtSize = Number(this.state.ftSize)
        if(numFtSize>Number(this.props.min)){
            this.setState({ftSize:parseFloat(numFtSize-1)});
            if(numFtSize===Number(this.props.min)+1){
                this.setState({color:'red'});
            }
        }
        else{
            this.setState({color:'red'});
        }     
    }
    
    render(){
        
        var formHide = this.state.hide ? true:false;
        var weight = this.state.bold? 'bold':'normal';
        var fSize = this.state.ftSize;
        var fColor = this.state.color; 
        
        return(  
            <div>
            
            <input type="checkbox" id="boldCheckbox" hidden={formHide} onChange={this.handleCheckBox.bind(this)}/>

            <button id="decreaseButton" hidden={formHide} onClick={this.decFtSize.bind(this)}>-</button>

            <span id="fontSizeSpan" hidden={formHide} onDoubleClick={this.resetFtSize.bind(this)}>{this.state.ftSize}</span>

            <button id="increaseButton" hidden={formHide} onClick={this.incFtSize.bind(this)}>+</button>

            <span id="textSpan" onClick={this.handleTextClick.bind(this)} style={{fontWeight:weight, fontSize:fSize+"px", color:fColor}}> {this.props.text} </span>

            </div>
        );
    }
}

