import React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/App';

test('Render App', () => {
  const component = renderer.create(
    <App />,
  );

  let app = component.toJSON();
  expect(app).toMatchSnapshot();
});