import PostDetail from "./PostDetail";
import axios from 'axios';
import Router from 'react-router-dom';

import {render, cleanup, waitFor} from '@testing-library/react';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: jest.fn()
}))

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

test('useEffect axios should get post detail', async () => {

    const spyAxios = jest.spyOn(axios, 'get').mockResolvedValue({
      id : '90',
      username: 'username-mock',
      title: 'title-mock',
      content: 'content-mock',
      itinerary: 'itinerary-mock',
      location: 'location-mock',
      city: 'city-mock',
      country: 'country-mock',
      duration: '3',
      dateFrom: '2000-01-30',
      dateTo: '2000-02-02',
      createdAt: '2000-12-31'
    });
    jest.spyOn(Router, 'useParams').mockReturnValue({id: '90'})


    render(<PostDetail />)
    
    await waitFor(() => 
      expect(spyAxios).toHaveBeenNthCalledWith(1, 'http://localhost:5000/api/posts/90')
    )
});