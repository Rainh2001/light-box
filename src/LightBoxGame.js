import React from 'react'
import './LightBoxGame.css'
import LightBoxBoard from './LightBoxBoard'

class LightBoxGame extends React.Component {
    constructor(props) {
        super(props);

        // this.stages = [
        //     1000,
        //     750,
        //     500,
        //     250
        // ]
        
        this.state = {
            lights: Array(this.props.size * this.props.size).fill(null),
            // score: 0,
            playing: true,
            // currentStage: 0,
            health: 10,
            time: 0
        }
    }

    // Lifecycle Methods =============================================
    componentDidMount(){
        this.newLightTimer()
        this.newHealthTimer()
    }

    componentWillUnmount(){
        this.clearLightTimer()
        this.clearHealthTimer()
    }

    // Health Timer (Main timer) =============================================
    newHealthTimer(){
        this.healthTimer = setInterval(() => {
            setTimeout(() => {
                this.setState((state, props) => ({ time: this.state.time + 10 }))
            }, 10)
        }, 10);
    }

    clearHealthTimer(){
        clearInterval(this.healthTimer)
    }

    restartHealthTimer(){
        this.clearHealthTimer()
        this.newHealthTimer()
    }


    // Timer that activates/deactivates lights =============================================
    newLightTimer(/*newGame=false*/){
        // let stage = newGame ? 0 : this.state.currentStage
        let time = 1000 - this.state.time/40;
        time = time >= 250 ? time : 250
        // this.timer = setInterval(() => this.activateLight(), this.stages[stage])
        this.timer = setTimeout(() => {
            this.activateLight()
            this.newLightTimer()
        }, time)
    }

    clearLightTimer(){
        clearInterval(this.timer)
    }

    restartLightTimer(newGame=false){
        this.clearLightTimer()
        this.newLightTimer(newGame)
    }


    // Game control methods =============================================
    stopGame(){
        this.clearHealthTimer()
        this.clearLightTimer()
        this.setState((state, props) => ({ playing: false }))
    }

    restartGame(){
        this.setState((state, props) => ({
            lights: Array(this.props.size * this.props.size).fill(null),
            // score: 0,
            playing: true,
            // currentStage: 0,
            health: 10,
            time: 0
        }))
        this.restartLightTimer(true)
        this.restartHealthTimer()
    }

    // Activate Lights =============================================
    activateLight(){
        let lights = this.state.lights.slice()
        let inactive = []
        
        for(let i = 0; i < lights.length; i++){
            if(lights[i] == null){
                inactive.push(i)
            }
        }

        let index = inactive[Math.floor(Math.random() * inactive.length)]
        lights[index] = setTimeout(() => this.deactivateLight(index), 1000) // Work here

        this.setState((state, props) => ({ lights }))
    }

    // Deactivate Lights =============================================
    deactivateLight(i){
        
        if(!this.state.playing) return;

        let lights = this.state.lights.slice()
        clearTimeout(lights[i])
        lights[i] = null

        this.setState((state, props) => ({ lights, health: this.state.health - 1 }), () => {
            if(this.state.health === 0){
                this.stopGame()
            }
        })
    }


    handleClick(i) {

        if(!this.state.playing){
            return;
        }

        let lights = this.state.lights.slice()
        // let score = this.state.score

        // if(lights[i]){
        //     clearTimeout(lights[i])
        //     score++
        //     lights[i] = null
        // }

        if(lights[i] == null) return;

        clearTimeout(lights[i])
        lights[i] = null
        // score++
        
        // let currentStage = Math.floor(score/20)
        // if(!(currentStage > this.state.currentStage && currentStage < this.stages.length)){
        //     currentStage = this.state.currentStage
        // } 

        // let newStage = currentStage !== this.state.currentStage

        // this.setState((state, props) => ({ lights, score, currentStage: currentStage }), () => {
        //     if(newStage){
        //         this.restartLightTimer()
        //     }
        // })

        this.setState((state, props) => ({ lights }))
        
    }

    render() {
        return (
            <div className="light-box-game">
                <p>Time: {this.state.time/1000}</p>
                <div className="health-bar">
                    <p>Health: {this.state.health}</p> 
                </div>
                <LightBoxBoard 
                    size={this.props.size}
                    onClick={i => this.handleClick(i)}
                    lights={this.state.lights}
                />
                <button className="stopButton" onClick={() => this.stopGame()}>Stop</button>
                <button className="stopButton" onClick={() => this.restartGame()}>Restart</button>
            </div>
        )
    }

}

export default LightBoxGame