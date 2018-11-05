import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';

const store = configureStore([
    thunk,
])();

import TaskListHome from './TaskListHome';

it('renders TaskListHome with "Tasks Summary" heading', () => {
  const wrapper = shallow(<TaskListHome store={store}/>).dive();
  const heading = <h4>Tasks Summary</h4>;
  expect(wrapper.contains(heading)).toEqual(true);
});