import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import renderer from 'react-test-renderer';
import { MemoryRouter } from "react-router-dom";

const store = configureStore([
    thunk,
])();

import TaskViewForm from './TaskViewForm';


it('renders TaskViewForm snapshot correctly', () => {
  const tree = renderer
    .create(
        <MemoryRouter>
            <TaskViewForm store={store} />
        </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
