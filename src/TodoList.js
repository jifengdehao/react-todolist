import React, { Component,Fragment } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component{
    constructor(props){
        super(props)
        // 当组件的state或者props发生改变的时候，render函数就会重新执行
        this.state = {
            inputValue: '',
            list: []
        };
        // 性能提升
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
        this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
    }
    // 在组件即将被挂载到页面的时刻自动执行
    componentWillMount(){
        console.log('componentWillMount');
    }

    render(){
        return(
            <Fragment>
                <div>
                    <label htmlFor="insertArea">输入内容</label>
                    <input
                        id="insertArea"
                        className='input'
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                        onKeyUp={this.handleInputKeyUp}
                        ref={(input) => {this.input = input}}
                    />
                    <button onClick={this.handleBtnClick}>提交</button>
                </div>
                <ul ref={(ul) => {this.ul = ul}}>
                    {this.getTodoItem()}
                </ul>
            </Fragment>
        )
    }
    // 组件被挂载到页面之后，自动被执行
    componentDidMount() {
        console.log('componentDidMount');
    }

    // 组件被更新之前，他会自动被执行
    shouldComponentUpdate() {
        console.log('shouldComponentUpdate');
        return true;
    }

    // 组件被更新之前，它会自动执行，但是他在shouldComponentUpdate之后被执行，
    // 如果shouldComponentUpdate返回true它才执行
    // 如果返回false，这个函数就不会被执行了
    componentWillUpdate() {
        console.log('componentWillUpdate');
    }

    // 组件更新完成之后，他会被执行
    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    getTodoItem() {
        return this.state.list.map((item, index) => {
            return (
                <TodoItem
                    key={item}  // key值 性能提升 虚拟dom diff算法
                    content={item}
                    index={index}
                    deleteItem={this.handleItemDelete}
                />
            )
        })
    }
    handleInputKeyUp(e){
        const value = this.input.value;
        if(e.keyCode === 13 && value){
            this.handleBtnClick();
        }
    }
    handleItemDelete(index){
        this.setState((prevState) => {
            const list = [...prevState.list];
            list.splice(index, 1);
            return {list}
        });
    }
    handleInputChange(){
        const value = this.input.value;
        //性能提升
        this.setState(() => ({
            inputValue: value
        }));
    }
    handleBtnClick(){
        this.setState((prevState) => ({
            list: [...prevState.list, prevState.inputValue],
            inputValue: ''
        }), () => {
            console.log(this.ul.querySelectorAll('div').length);
        });
    }

}
export default TodoList;
