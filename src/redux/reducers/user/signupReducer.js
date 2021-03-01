let user = localStorage.getItem('user');
const initialState = user ? { user } : {};

const signupReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CREATE_USER_SUCCESS':
			return {
				...state,
				successMessage: action.payload,
			};
		case 'CREATE_USER_ERROR':
			return {
                ...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
export default signupReducer;
 