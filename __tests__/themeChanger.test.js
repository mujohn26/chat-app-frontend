 
import React from 'react';
import { shallow } from 'enzyme';
import ThemeChanger from '../src/components/common/themeChanger';

describe('Render theme changer component', () => {
	it('should render the theme changer component successfully', () => {
		const wrapper = shallow(<ThemeChanger />);
		expect(wrapper.find('Switch').length).toBe(1);
        expect(wrapper.find('div').length).toBe(1);
	});
});