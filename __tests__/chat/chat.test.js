import React from "react";
import { shallow, mount } from "enzyme";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { App, mapStateToProps } from "../../src/layout/main.jsx";
import { props } from "../../__mockData__/chat.mock";
import reducer from "../../src/redux/reducers/index";

const middlewares = [thunk];
const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(reducer, state);
};

const setUpComponent = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = mount(<App {...props} store={store} />);
  return wrapper;
};
describe("Render get messages components", () => {
  it("should handle will mount successfully", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoibXVqb2huMjVAZ21haWwuY29tIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaWQiOjF9LCJpYXQiOjE1ODIyNDI0OTEsImV4cCI6MTU4MjMyODg5MX0.S_GO2R1kNZJrro5NbJOjO4S0UfBfhLaF-QtoiOUlmDo";
    localStorage.setItem("token", token);
    const component = setUpComponent();
    const handleChangeSpy = jest.spyOn(
      component.instance(),
      "UNSAFE_componentWillMount"
    );
    expect(handleChangeSpy).toBeDefined();
  });

  it("should handle componentDidUpdate successfully", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoibXVqb2huMjVAZ21haWwuY29tIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaWQiOjF9LCJpYXQiOjE1ODIyNDI0OTEsImV4cCI6MTU4MjMyODg5MX0.S_GO2R1kNZJrro5NbJOjO4S0UfBfhLaF-QtoiOUlmDo";
    localStorage.setItem("token", token);
    const component = setUpComponent();
    const handleChangeSpy = jest.spyOn(
      component.instance(),
      "componentDidUpdate"
    );
    component.setProps({
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
    expect(handleChangeSpy).toBeDefined();
  });
  // it('should handle change page', () => {
  // 	const wrapper = mount(<AccommodationFacility {...props} />);
  // 	wrapper.setState({
  // 		page: 2,
  // 	});
  // 	const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleChangePage');

  // 	wrapper.instance().handleChangePage();
  // });
  it('should handle switch chat', () => {
  	const wrapper = mount(<App {...props} />);
  	wrapper.setState({
        activeChatId: 1,
  	});

  	const handleSubmitSpy = jest.spyOn(
  		wrapper.instance(),
  		'switchChat',
  	);
 const id= 9;
  	wrapper.instance().switchChat(id);
  });
  it('should map state to props', () => {
    expect(mapStateToProps);
    const state = {
        messageReducer: {
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
        },
    };

    const stateObject = mapStateToProps(state);
    expect(stateObject).toBeTruthy();
});
});
