 
import React from 'react';
import { shallow } from 'enzyme';
import Index from '../src/layout/index';

describe('Render index chat component', () => {
	it('should render the chat component successfully', () => {
		const wrapper = shallow(<Index />);
		expect(wrapper.find('Sidebar').length).toBe(1);
		expect(wrapper.find('Chat').length).toBe(1);
        expect(wrapper.find('div').length).toBe(1);
	});
});