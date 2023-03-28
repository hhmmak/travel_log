import FormDefault from './FormDefault';
import axios from 'axios';

import {render, screen, cleanup} from '@testing-library/react';

jest.mock('axios');

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

test('should have submit button with "Post" as text', async () => {

  const error = {};
  const post = {};
  const setPost = jest.fn();
  const submitAction = jest.fn();
  const submitText = "Post";
  axios.get.mockResolvedValue({});

  render(<FormDefault error={error} post={post} setPost={setPost} submitAction={submitAction} submitText={submitText}/>)
  
  const submitButtonElement = await screen.findByRole('button');
  expect(submitButtonElement).toBeInTheDocument();
  expect(submitButtonElement).toHaveTextContent('Post');

});

test('should display all form input field', async () => {
  const error = {};
  const post = {};
  const setPost = jest.fn();
  const submitAction = jest.fn();
  const submitText = "Post";
  axios.get.mockResolvedValue([{country: "USA"}, {country: "Canada"}, {country: "Japan"}]);

  const textboxNameList = ["title", "location", "city", "itinerary", "content"]

  render(<FormDefault error={error} post={post} setPost={setPost} submitAction={submitAction} submitText={submitText}/>)
  
  const inputTextElements = await screen.findAllByRole('textbox');    // findBy = getBy with waitFor
  expect(inputTextElements.map((ele => ele.name))).toEqual(textboxNameList);

  const countryElement = screen.getByRole('combobox');
  expect(countryElement).toBeInTheDocument();

  const countryListElement = screen.getAllByRole('option');
  expect(countryListElement[0]).toHaveTextContent("Select one country");


})