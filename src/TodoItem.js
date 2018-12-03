import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';


class TodoItem extends  Component{
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }
    // 性能提升
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.content !== this.props.content) {
            return true;
        }else {
            return false;
        }
    }

    render(){
        const { content, test }  = this.props;
        return(
           <Fragment>
               <div onClick={this.handleClick}>{content}-----{test}</div>
           </Fragment>
        )
    }
    handleClick(){
        const { deleteItem, index } = this.props;
        deleteItem(index);
    }
    // 一个组件要从父组件接受参数
    // 如果这个组件第一次存在于父组件中，不会执行
    // 如果这个组件之前已经存在于父组件中，才会执行
    componentWillReceiveProps() {
        console.log('child componentWillReceiveProps');
    }

    // 当这个组件即将被从页面中剔除的时候，会被执行
    componentWillUnmount() {
        console.log('child componentWillUnmount');
    }

}
TodoItem.propTypes = {
    test: PropTypes.string.isRequired,  // string 类型 必须填
    content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),// oneOfType 或者
    deleteItem: PropTypes.func, // function 类型
    index: PropTypes.number    // number 类型
}

TodoItem.defaultProps = {  // 默认参数
    test: 'hello world'
}
export default TodoItem;
