import { render } from "@testing-library/react";
import thunk from "redux-thunk";
import reducers from "../reducers";

import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from "redux";

const store = createStore(reducers, applyMiddleware(thunk));

const wrapper = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: wrapper, ...options });

export * from "@testing-library/react";
export { renderWithContext as render };
