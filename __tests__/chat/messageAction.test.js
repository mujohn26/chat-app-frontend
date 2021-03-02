import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	GET_USER_MESSAGES_SUCCESS,
	GET_USER_MESSAGES_ERROR,
    GetUserMessages

} from '../../src/redux/action/message/index';
import moxios from 'moxios';
import axios from 'axios';
import expect from 'expect';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('Create accomodation facility  actions', () => {
	beforeEach(() => {
		moxios.install(axios);
	});
	afterEach(() => {
		moxios.uninstall(axios);
	});
	it('should get accommodation facility successfully', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {
					status: 201,
					message: 'message successfully',
					messageDatas: [[
                        {
                  id:2,
                  senderid:3,
                  message:"Hello",
                  receivername:"John"
                        }
                    ]],
				},
			});
		});
		const expectedActions = [
			{
				type: GET_USER_MESSAGES_SUCCESS,
				payload: [[
                    {
              id:2,
              senderid:3,
              message:"Hello",
              receivername:"John"
                    }
                ]],
			},
		];
		const store = mockStore({});
		await store.dispatch(GetUserMessages()).then(async () => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

    it('should get error when getting messages', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.reject({
				status: 404,
				error: 'not found',
			});
		});
		const expectedActions = [

			{
                 payload: "could not get message successfully",
                 type: GET_USER_MESSAGES_ERROR,
			},
		];
		const store = mockStore({});
		await store.dispatch(GetUserMessages()).then(async () => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
