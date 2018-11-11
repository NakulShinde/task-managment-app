import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

const store = configureStore([thunk])();

import TaskViewForm from "./TaskViewForm";

it("renders TaskViewForm snapshot correctly", () => {
    const tree = renderer
        .create(
            <MemoryRouter>
                <TaskViewForm store={store} />
            </MemoryRouter>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});

const myWrapper = mount(
    <MemoryRouter>
        <TaskViewForm store={store} />
    </MemoryRouter>
).find(TaskViewForm);

it("render a TaskViewForm", () => {
    expect(myWrapper.exists()).toBe(true);
});

it("render 10 formRow fields, 3 Input fields & 2 buttons", () => {
    expect(myWrapper.find(".formRow").length).toBe(10);
    expect(myWrapper.find("input").length).toBe(3);
    expect(myWrapper.find("button").length).toBe(2);
});

it("render a form fields", () => {
    expect(myWrapper.find("form").exists()).toBe(true);
    expect(myWrapper.find("#title").exists()).toBe(true);
    expect(myWrapper.find("#description").exists()).toBe(true);
    expect(myWrapper.find("#priority").exists()).toBe(true);
});
/*
it('field change checks', () => {
    const titleField = myWrapper.find('form')

    titleField.simulate('change', {
        target: {
            name: 'title',
            value: 'blah@gmail.com'
        }
    });
    console.log('titleField', titleField.getDOMNode());
    expect(titleField.value).toBe('blah@gmail.com')
})

it('should respond to change event and change the state of the fields in Component ', () => {
    console.log("State 1", myWrapper.state());
    myWrapper
        .find('#title')
        .simulate('change', {
            target: {
                name: 'title',
                value: 'some-text-to-check'
            }
        });
    console.log("props", myWrapper.props());
    console.log("State 2", myWrapper.state());
    expect(myWrapper.state()['title']).toEqual('some-text-to-check');
    expect(myWrapper.state('title')).toEqual('some-text-to-check');
    expect('title' in myWrapper.props()).toEqual(true)
    expect('title' in myWrapper.state()).toEqual(true)
})
*/
