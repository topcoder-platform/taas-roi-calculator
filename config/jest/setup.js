const config = require('config');
import ReactDOM from "react-dom";

global.window.matchMedia = global.window.matchMedia || function matchMedia() {
  return {
    matches: false,
    addListener() {},
    removeListener() {},
  };
};
global.window.scrollTo = () => {};
global.process.env = config;
ReactDOM.createPortal = jest.fn((element, node) => {
  return element;
});
