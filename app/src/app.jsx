class Todo extends React.Component {
  constructor(props){
    super(props);
    this.state = { done: (this.props.done == true && props.done),
      text: props.text
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(event) {
    this.setState(
      state => ({
        done: !state.done
      }),
      function(event){
        this.handleSubmit(event)
      }
    );
  }

  handleChange(event){
    let text = event.target.value;

    this.setState(state => ({
      text: text
    }));
  }

  handleSubmit(event) {
    let id = this.props.id || this.state._id;

    if (id == "" || id == undefined) {
      fetch('http://localhost:3000/todos', {
        method: 'post', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          done: this.state.done,
          text: this.state.text
        })
      }).then(response => response.json())
      .then(data => this.setState( state => ({ _id: data._id })))
    } else {
      fetch(`http://localhost:3000/todos/${id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          done: this.state.done,
          text: this.state.text
        })
      })
    }

  }

  render() {

    return <div className="todo">
      <span>
        <input type="checkbox" checked={this.state.done}
                onClick={this.handleClick} />
        <input type="text" value={this.state.text}
                className={(this.state.done) ? 'done' : 'not-done'}
                onChange={this.handleChange}
                onBlur={this.handleSubmit}
                value={this.state.text} />
      </span>
      </div>;
  }
}

class TodoList extends React.Component {
  constructor(props){
    super(props);

    this.state = { todos: [] };

    this.newTodo = this.newTodo.bind(this);

  }

  componentDidMount(){
    fetch('http://localhost:3000/todos/')
      .then(response => response.json())
      .then(data => {
        this.setState(state => ({
          todos: data.todos
        }))
      })
  }

  newTodo(event) {
    event.preventDefault();

    todos = this.state.todos;
    todos.push({ _id: "" });

    this.setState(state => ({
      todos: todos
    }));
  }

  render() {
    const todoList = this.state.todos.map((todo) =>
      <Todo id={todo._id} key={todo._id.toString()} text={todo.text} done={todo.done} />
    );

    return <React.Fragment>
            <h1>React Todo App</h1>

            {todoList}

            <a href="#" onClick={this.newTodo}>New Todo</a>
          </React.Fragment>
  }
}

ReactDOM.render(
  <TodoList />,
  document.getElementById('root')
);
