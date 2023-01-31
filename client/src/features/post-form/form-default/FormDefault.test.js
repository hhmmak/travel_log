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

test('should display all form input field', () => {
  const error = {};
  const post = {};
  const setPost = jest.fn();
  const submitAction = jest.fn();
  const submitText = "Post";

  const textboxNameList = ["title", "location", "city", "itinerary", "content"]

  render(<FormDefault error={error} post={post} setPost={setPost} submitAction={submitAction} submitText={submitText}/>)
  const inputTextElements = screen.getAllByRole('textbox');
  expect(inputTextElements.map((ele => ele.name))).toEqual(textboxNameList);
  const countryElement = screen.getByRole('combobox');
  const countryListElement = screen.getAllByRole('option');
  expect(countryElement).toBeInTheDocument();
  expect(countryListElement).toHaveLength(1);
  expect(countryListElement[0]).toHaveTextContent("Select one country");
})