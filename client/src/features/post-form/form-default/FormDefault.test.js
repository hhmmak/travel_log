import FormDefault from './FormDefault';

import {render, screen, cleanup} from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('should have submit button with "Post" as text', () => {

  const error = {};
  const post = {};
  const setPost = jest.fn();
  const submitAction = jest.fn();
  const submitText = "Post";

  render(<FormDefault error={error} post={post} setPost={setPost} submitAction={submitAction} submitText={submitText}/>)
  const submitButtonElement = screen.getByRole('button');
  expect(submitButtonElement).toBeInTheDocument();
  expect(submitButtonElement).toHaveTextContent('Post');

});