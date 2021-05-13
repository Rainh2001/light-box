import React from 'react'
import './LightBoxBoard.css'
import LightBox from './LightBox.js'

class LightBoxBoard extends React.Component {
    renderLightBox(i){
        return (
            <LightBox 
                active={this.props.lights[i]}
                onClick={() => this.props.onClick(i)}
                key={i}
            />
        )
    }

    render() {
        let key = 0
        return (
            <div className="grid-container">
                {Array(this.props.size).fill().map(() => {
                    return (
                        <div key={Math.floor(key/this.props.size)} className="row">
                            {Array(this.props.size).fill().map(() => {
                                return (
                                    this.renderLightBox(key++)
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }

}

export default LightBoxBoard