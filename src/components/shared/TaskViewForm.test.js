import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

import TaskViewForm from "./TaskViewForm";

it("renders TaskViewForm snapshot correctly", () => {
    const tree = renderer
        .create(
            <MemoryRouter>
                <TaskViewForm />
            </MemoryRouter>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});

const myWrapper = mount(
    <MemoryRouter>
        <TaskViewForm />
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
    expect(myWrapper.find("#submit").exists()).toBe(true);
    expect(myWrapper.find("#cancel").exists()).toBe(true);
});

it('Form Fields respond to change event and update state', () => {

    myWrapper
        .find('#title')
        .simulate('change', {
            target: {
                name: 'title',
                value: 'some-text-to-check'
            }
        });
    expect(myWrapper.state('title')).toEqual('some-text-to-check');
    expect('title' in myWrapper.state()).toEqual(true);

    myWrapper
        .find('#description')
        .simulate('change', {
            target: {
                name: 'description',
                value: 'some-description-to-check'
            }
        });
    expect(myWrapper.state('description')).toEqual('some-description-to-check');
    expect('description' in myWrapper.state()).toEqual(true);

    myWrapper
        .find('#priority')
        .simulate('change', {
            target: {
                name: 'priority',
                value: 'some-priority-to-check'
            }
        });
    expect(myWrapper.state('priority')).toEqual('some-priority-to-check');
    expect('priority' in myWrapper.state()).toEqual(true);

    /*
    let date = new Date().getTime();
    myWrapper
        .find('#duedate')
        .simulate('onChange', {
            newTime: {
                _d: date
            }
        });
    expect(myWrapper.state('duedate')).toEqual(date);
    expect('description' in myWrapper.state()).toEqual(true);
    */
})


it("Validate empty data on Form submit", () => {

    myWrapper.setState({
        title: '',
        description: '',
        priority: '',
        duedate: ''
    });
    let submit = myWrapper.find("#submit");
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    submit.simulate('click', fakeEvent)
    let errors = myWrapper.state('error')

    expect(errors.title).toBeDefined();
    expect(errors.description).toBeDefined();
    expect(errors.priority).toBeDefined();
    expect(errors.duedate).toBeDefined();
});

it("updateTaskDetails called with valid data on Form submit", async () => {
    const p = Promise.resolve('success');
    const props = {
        updateTaskDetails: jest.fn(() => p),
    };
    const wrapper = mount(
        <MemoryRouter>
            <TaskViewForm {...props} />
        </MemoryRouter>
    ).find(TaskViewForm);

    wrapper.setState({
        title: 'UT-title',
        description: 'UT-description',
        priority: 'UT',
        duedate: 'UT'
    });
    let submit = wrapper.find("#submit");
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    submit.simulate('click', fakeEvent)
    
    await p

    expect(props.updateTaskDetails).toHaveBeenCalled();
    
});