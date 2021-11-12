import React, { Component } from 'react';
import Counter from './counter';

class Counters extends React.Component {
    state = {
        Counters: [
            {id:1 ,value: 0},
            {id:2 ,value: 0},
            {id:3 ,value: 0},
            {id:4 ,value: 0}
        ]

    };

    handleIncrement = counter => {
        //... is spread operator allows an iterable to be expanded in places
        //more like a shallow copy
        //do not modify the state directly, always clone and replace the object.
        const counters = [...this.state.Counters];
        const index = counter.indexOf(counter)
        counters[index] = {...counter}
        counters[index].value++;
        this.setState({counters})
    }

    handleReset = () => {
        const counters = this.state.counters.map(c => {
            c.value=0;
            return c;
        })
        this.setState({counters})
    };

    handleDelete = counterId => {
        const counters = this.state.Counters.filter(c => c.id != counterId);
        //setState will also force re-render
        this.setState({counters})
    }

    render() { 
        return (<div>
            <button onClick={this.handleReset} className="btn-primary btn-sm m-2">Reset</button>
            {this.state.Counters.map(counter => 
            <Counter key={counter.id} value={counter.value} onDelete={this.handleDelete} id={counter.id} counter={counter}>
                <h4>Counter #{counter.id}</h4>
            </Counter>)}
            </div>);
    }
}
 
export default Counters;