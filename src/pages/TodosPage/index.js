/*
 * TodoPage
 *
 * This is the first thing users see of our App, at the '/todo' route
 */

import React from 'react';

import TodoList from './TodoList'

const TodoPage = () => {

  return (
    <>
      <TodoList />
    </>
  );
}

TodoPage.propTypes = {
};

export default TodoPage
