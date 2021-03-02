import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	CREATE_USER_SUCCESS,
	CREATE_USER_ERROR,
    createUser
} from '../../src/redux/action/user/signupAction';
import moxios from 'moxios';
import axios from 'axios';
import expect from 'expect';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('Signup  actions', () => {
	beforeEach(() => {
		moxios.install(axios);
	});
	afterEach(() => {
		moxios.uninstall(axios);
	});
	it('should send create user successfully', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {
					status: 200,
                    data:{
                        data:{
					message: 'User was created successfully'
                }}
				},
			});
		});
		const expectedActions = [
			{
				type: CREATE_USER_SUCCESS,
				payload: undefined,
			},
			
		];
		const store = mockStore({});
       const userName="mujohn25";
       const email="mujohn25@gmail.com";
       const password="Mujohn25@"
		await store.dispatch(createUser(userName,email,password)).then(async () => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
	// it('should not send reset link when email is not registered in the database', async () => {
	// 	moxios.wait(() => {
	// 		const request = moxios.requests.mostRecent();
	// 		request.respondWith({
	// 			status: 404,
	// 			response: {
	// 				error: 'errror user not found!',
	// 			},
	// 		});
	// 	});
	// 	const expectedActions = [
	// 		{
	// 			payload: true,
	// 			type: 'LOADING',
	// 		},
	// 		{
	// 			message: 'errror user not found!',
	// 			type: 'FORGOT_ERROR',
	// 		},
	// 		{
	// 			payload: false,
	// 			type: 'LOADING',
	// 		},
	// 	];
	// 	const store = mockStore({});
	// 	await store.dispatch(sendResetLink('me34@you.com')).then(async () => {
	// 		expect(store.getActions()).toEqual(expectedActions);
	// 	});
	// });
	// it('should reset password successfully', async () => {
	// 	moxios.wait(() => {
	// 		const request = moxios.requests.mostRecent();
	// 		request.respondWith({
	// 			status: 200,
	// 			response: {
	// 				status: 200,
	// 				message: 'Password has successfuly changed',
	// 				data:
	// 					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkI…c1OX0.3IUkdzh7WxLyLYBi6hYNke_9ySu3l81yD7YR5mqCiYA',
	// 			},
	// 		});
	// 	});
	// 	const headers = {
	// 		'Content-Type': 'application/json',
	// 		token:
	// 			'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkI…c1OX0.3IUkdzh7WxLyLYBi6hYNke_9ySu3l81yD7YR5mqCiYA',
	// 	};
	// 	const newPassword = {
	// 		password: '0788787273m',
	// 		confirmPassword: '0788787273m',
	// 	};
	// 	const expectedActions = [
	// 	{
	// 			"payload": true,
	// 	  "type": "LOADING",
	// 	   },
	// 	   {
	// 	    "payload": "Password has successfuly changed",
	// 			"type": "RESET_SUCESS",
	// 		  },




	// 	];
	// 	const store = mockStore({});
	// 	await store
	// 		.dispatch(resetPassword({ newPassword, headers }))
	// 		.then(async () => {
	// 			expect(store.getActions()).toEqual(expectedActions);
	// 		});
	// });
	// it('should not reset password when password are not valid', async () => {
	// 	moxios.wait(() => {
	// 		const request = moxios.requests.mostRecent();
	// 		request.reject({
	// 			status: 422,
	// 			response: {
	// 				data: {
	// 					status: 422,
	// 					error: [
	// 						'Password should be provided and must be alphanumeric with atleast 8 charactors.',
	// 						'conform Password should be provided and must be alphanumeric with atleast 8 charactors.',
	// 					],
	// 				},
	// 			},
	// 		});
	// 	});
	// 	const headers = {
	// 		'Content-Type': 'application/json',
	// 		token:
	// 			'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkI…c1OX0.3IUkdzh7WxLyLYBi6hYNke_9ySu3l81yD7YR5mqCiYA',
	// 	};
	// 	const wrongPassword = {
	// 		password: '123',
	// 		confirmPassword: '123',
	// 	};
	// 	const expectedActions = [
		
	// 			 {
	// 				    "payload": true,
	// 				     "type": "LOADING",
	// 				   },
	// 			    {
	// 					  "message": [
	// 						"Password should be provided and must be alphanumeric with atleast 8 charactors.",
	// 						"conform Password should be provided and must be alphanumeric with atleast 8 charactors.",
	// 					  ],
	// 					  "type": "RESET_ERROR",
	// 			  },
	// 			 {
	// 				    "payload": false,
	// 				    "type": "LOADING",
	// 					},
	
	// 	];
	// 	const store = mockStore({});
	// 	await store
	// 		.dispatch(resetPassword({ wrongPassword, headers }))
	// 		.then(async () => {
	// 			expect(store.getActions()).toEqual(expectedActions);
	// 		});
	// });
	// it('should delete forgot error', () => {
	// 	const deleteForgotErrorAction = [
	// 		{
	// 			type: DELETE_ERROR,
	// 		},
	// 	];
	// 	const store = mockStore({});
	// 	store.dispatch(deleteForgotError());
	// 	expect(store.getActions()).toEqual(deleteForgotErrorAction);
	// });
	// it('should delete reset error', () => {
	// 	const deleteForgotErrorAction = [
	// 		{
	// 			type: 'DELETE_RESET_ERROR'
	// 		},
	// 	];
	// 	const store = mockStore({});
	// 	store.dispatch(deleteResetError ());
	// 	expect(store.getActions()).toEqual(deleteForgotErrorAction);
	// });
});
