import React from 'react'
import './LightBox.css'

class LightBox extends React.Component {
    render(){
        return (
            <button 
            onClick={this.props.onClick}  
            className={this.props.active ? "active" : "inactive"}
            >
                
            </button>
        )
    }
    
}

export default LightBox