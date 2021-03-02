import React from 'react';
import { shallow, mount } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
	SignupPage,
	mapStateToProps,
} from '../../src/views/auth/signup.js';
import { props } from '../../__mockData__/signupMock';
import reducer from '../../src/redux/reducers/index';

const middlewares = [thunk];
const testStore = state => {
	const createStoreWithMiddleware = applyMiddleware(...middlewares)(
		createStore,
	);
	return createStoreWithMiddleware(reducer, state);
};
const setUp = (initialState = {}) => {
	const store = testStore(initialState);
	const wrapper = shallow(<SignupPage {...props} store={store} />);
	return wrapper;
};
const setUpComponent = (initialState = {}) => {
	const store = testStore(initialState);
	const wrapper = mount(<SignupPage {...props} store={store} />);
	wrapper.setState({
		password: 'mujohn25',
		userNme: 'mujohn25',
		email: 'mujohn25@gmail.com',
	});
	return wrapper;
};
const setUpInitComponent = (initialState = {}) => {
	const store = testStore(initialState);
	const wrapper = mount(<SignupPage {...props} store={store} />);
	return wrapper;
};
describe('Render Signup components', () => {
    it('should be handle submit function', () => {
		const wrapper = mount(<SignupPage {...props} />);
		wrapper.setState({
                    userName:"John", email:"mujohn25@gmail.com", password:"test@2021"
            	});
		const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');

		wrapper.instance().handleSubmit();
	});
	it('should handle change successfully', () => {
		const component = setUp();
		const handleChangeSpy = jest.spyOn(component.instance(), 'handleChange');
		component
			.find('[data-test="username-field"]')
			.simulate('change', { target: { value: 'mujohn25' } });
		component
			.find('[data-test="email-field"]')
			.simulate('change', { target: { value: 'mujohn25@gmail.com' } });
            component
			.find('[data-test="password-field"]')
			.simulate('change', { target: { value: 'test@2021' } });
		expect(handleChangeSpy).toBeDefined();
	});

    it('should be handle login function', () => {
		const wrapper = mount(<SignupPage {...props} />);
		wrapper.setState({
                    userName:"John", email:"mujohn25@gmail.com", password:"test@2021"
            	});
		const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleGoToLogin');

		wrapper.instance().handleGoToLogin();
	});
	it('should map state to props', () => {
		expect(mapStateToProps);

		const state = {
			signupReducer: {
                sucessMessage: "User was created successfully",
                error: "User with this email already exist",
			},
		};

		const stateObject = mapStateToProps(state);
		expect(stateObject).toBeTruthy();
	});
	it('should handle componentDidUpdate successfully', () => {
		const component = setUpComponent();
		const handleChangeSpy = jest.spyOn(
			component.instance(),
			'componentDidUpdate',
		);
		component.setProps({ sucessMessage: 'user was created successfully' });
		expect(handleChangeSpy).toBeDefined();
	});
});
