const initialState = {};

const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN_USER_SUCCESS':
			return {
				...state,
				successMessage: action.payload,
			};
		case 'LOGIN_USER_ERROR':
			return {
                ...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
export default loginReducer;
 