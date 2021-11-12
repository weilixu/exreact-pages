import React, { Component } from 'react';

class Counter extends React.Component {
    constructor(){
        super()
        //basically, it is binding the event handler to "this" object
        this.handleIncrement = this.handleIncrement.bind(this); // force this reference to the current object
        
        this.state = { 
            value: this.props.counter.id,
            imageUrl:'https://picsum.photos/200',
            tags: ['tag1', 'tag2', 'tag3']
        };
    }

    styles = {
        //css property in style
        fontSize: 10,
        fontWeight: 'bold'
    };

    renderTags(){
        //dynamic rendering
        if (this.state.tags.length === 0) return "There are no tags!";
        return  <ul>{ this.state.tags.map(tag => <li key={tag}>{ tag }</li>)}</ul>
    }

    handleIncrement = product => {
        //using arrow function binding the function to the object.
        //this - can reference different objects depending on functions
        console.log('Increment Clicked', this)
        //obj.method(); - reference of the object
        //function(); - reference of the window object, if strict mode is enabled, return undefined.
        //only this can update the state and notify React the changes, force update (calling render in the future)
        this.setState({value: this.state.value + 1})
    }

    render() { 
        //props are all the values set in the counter objects

        return (
            //use {} means rendering an object dynamically
            //use className - most efficient way to render an element, but also can use style.
            // a {} inside {} means an object
            // use map instead of for loop to render a list in React
            // inline function () => it works the same as bind, so the this point to the object, instead of window
            //onDelete - fire up an delete event
            //handleDelete - handle event
        <div>
            {this.props.children}
            <img src={this.state.imageUrl} alt=""/>
            <span style={this.styles} className={this.getBadgeClasses()}>{this.formatCount()}</span>
            <span style={{fontSize: 10}} className="badge badge-primary m-2">{this.formatCount()}</span>
            { this.state.tags.length === 0 && 'When JS engine reads boolean and string (no empty), print string'}
            {this.renderTags}
            <button onClick={() => this.handleIncrement(this.props.counter)} className="btn btn-secondary btn-sm">Increment</button>
            <button onClick={this.props.onDelete(this.props.counter.id)} className="btn btn-danger btn-sm m-2">Delete</button>
        </div>
        );
    }

    getBadgeClasses() {
        //dynamically update the className
        //const are constant, not suppose to change, so we use let here
        let classes = "badge m-2 badge-";

        classes += (this.state.count == 0) ? "warning" : "primary";
        return classes
    }

    formatCount(){
        const {count} = this.state; //picking the count property of this object and store it in a separate constant called count 
        const x = <h1>ddd</h1>
        //jsx operation is just like normal javascript 
        return count === 0 ? <h1>Zero</h1>: count;
    }
}
 
export default Counter;