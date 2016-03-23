import React, {
  AppRegistry,
  Component,
  StyleSheet,
  View,
  Navigator
} from 'react-native';

import TaskList from './tasklist';
import TaskForm from './taskform';
import store from './todostore';

class pluraltodo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = store.getState();

    store.subscribe(() => {
      this.setState(store.getState()); // eslin-disable-line react/no-set-state
    });
    // this.state = {
    //   todos: [
    //     {
    //       task: 'Learn react-native'
    //     },
    //     {
    //       task: 'Learn redux'
    //     },
    //     {
    //       task: 'Learn stuff'
    //     },
    //   ],
    // };
  }

  onAddStarted () {
    this.nav.push({
      name: 'taskform'
    })
  }

  onCancel () {
    this.nav.pop();
  }

  onAdd (task) {
    console.log('a new task: ' + task);
    store.dispatch({
      type: 'ADD_TODO',
      task,
    })
    // this.state.todos.push({
    //   task: task,
    // });
    // this.setState({ todos: this.state.todos });
    this.nav.pop();
  }

  onDone (todo) {
    console.log('task completed: ', todo.task);
    store.dispatch({
      type: 'DONE_TODO',
      todo,
    });
    // const filteredTodos = this.state.todos.filter((filterTodo) => {
    //   return filterTodo !== todo;
    // });
    // this.setState({ todos: filteredTodos });
  }

  onToggle() {
    store.dispatch({
      type: 'TOGGLE_STATE',
    });
  }

  renderScene(route, nav) {
    switch (route.name) {
      case 'taskform':
        return (
          <TaskForm
            onCancel={this.onCancel.bind(this)}
            onAdd={this.onAdd.bind(this)}
            />
        );
      default:
        return (
          <TaskList
            filter={this.state.filter}
            onAddStarted={this.onAddStarted.bind(this)}
            onDone={this.onDone.bind(this)}
            onToggle={this.onToggle.bind(this)}
            todos={this.state.todos}
            />
        );
    }
  }

  configureScene () {
    return Navigator.SceneConfigs.FloatFromBottom;
  }

  render() {
    return (
      <Navigator
        configureScene={this.configureScene}
        initialRoute={{ name: 'tasklist', index: 0 }}
        ref={((nav) => {
          this.nav = nav;
        })}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default pluraltodo;
