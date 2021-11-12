import LinePlot from './LinearPlot'
import {Component} from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

//Display the static data
class Sampledata extends Component {
    constructor(props){
        super(props)
        this.state={
            status: 'init',
            selectedX:'',
            selectedY:'',
            headers=Object.keys(this.props.data)
        }
        const options = this.generate_select_option(data)

    }

    generate_select_option(data){
        select_option = {}
        this.state.headers.forEach(head => select_option[head] = head)
        return select_option
    }

    onChangeSelect(x, y){
        this.state.selectedX = x
        this.props.onChangeGraph(this.state.selectedX, this.state.selectedY)
    }

    onChangeSelectY(y){
        this.state.selectedY = y
        this.props.onChangeGraph(this.state.selectedX, this.state.selectedY)
    }
}

export default Sampledata