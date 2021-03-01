const initialState =  {};

const messageReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_USER_MESSAGES_SUCCESS':
			return {
				...state,
				messages: action.payload,
			};
		case 'GET_USER_MESSAGES_ERROR':
			return {
                ...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
export default messageReducer;
 