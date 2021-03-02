import messageReducer from '../../src/redux/reducers/messages/index';

describe('Messages  Reducer', () => {
	it('Should  get messages', () => {
		const getState = messageReducer({}, {
            type: "GET_USER_MESSAGES_SUCCESS",
            payload: [
              [
                {
                  id: 2,
                  senderid: 3,
                  message: "Hello",
                  receivername: "John",
                },
              ],
            ],
          });
		expect(getState).toEqual({
			messages: [
                [
                  {
                    id: 2,
                    senderid: 3,
                    message: "Hello",
                    receivername: "John",
                  },
                ],
              ],
		});
	});
    it('Should not get messages when there is an error ', () => {
		const getState = messageReducer({}, {
            type: "GET_USER_MESSAGES_ERROR",
            payload: "could not get message successfully",
          });
		expect(getState).toEqual({
			error: "could not get message successfully",
		});
	});
});
