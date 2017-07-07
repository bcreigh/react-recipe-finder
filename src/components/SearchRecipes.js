import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import {setRecipes} from '../actions';

class SearchRecipes extends Component {
  constructor() {
    super();

    this.state={
      ingredients: '',
      dish: ''
    }
  }

  search() {
    let {ingredients, dish} = this.state;
    const url = `http://www.recipepuppy.com/api/?i=${ingredients}&q=${dish}`;
    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      this.props.setRecipes(json.results)
    });
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <ControlLabel>Ingredients</ControlLabel>
          {' '}
          <FormControl 
            type="text" 
            placeholder="garlic, chicken, ect..."
            onChange={event => this.setState({ingredients: event.target.value})} 
          />
        </FormGroup>
        {' '}
        <FormGroup>
          <ControlLabel>Dish</ControlLabel>
          {' '}
          <FormControl 
            type="text" 
            placeholder="adobo"
            onChange={event => this.setState({dish: event.target.value})} 
          />
        </FormGroup>
        {' '}
        <Button onClick={() => this.search()} >Submit</Button>
      </Form>
    )
  }
}

export default connect(null, {setRecipes})(SearchRecipes);