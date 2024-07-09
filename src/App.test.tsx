import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CharacterList from './pages/CharacterList';
import * as ApiHelper from './api/ApiHelper';
import { BrowserRouter } from 'react-router-dom';

const dummy_planet_url = 'https://dummy-planet-url/';
const dummy_person1_name = 'Rony'
const dummy_planet1_name = 'Planet1'
const dummy_person_id = '123'
const dummy_people1_url = `https://dummy-current-url/${dummy_person_id}/`

const mockPeople = { 
  count: 10,
  next: '',
  previous: '',
  results: [
    {
      name: dummy_person1_name,
      gender: 'Male',
      homeworld: dummy_planet_url,
      hair_color: 'test_black',
      eye_color: 'test_green',
      films: ['https://dummy-film1/', 'https://dummy-film2/'],
      url: dummy_people1_url
    }
  ]
 }

 const mockPlanets = [
  {
    name: dummy_planet1_name,
    climate: 'dummy-climate',
    url: dummy_planet_url
  }
 ]

// Mock the module
jest.mock('./api/ApiHelper', () => ({
  fetchAllHomePlanets: jest.fn(),
  fetchData: jest.fn(),
}));

describe('renders character listing screen', () => {

  beforeEach(() => {
    // Provide custom mock implementations before each test
    (ApiHelper.fetchData as jest.Mock).mockResolvedValue(Promise.resolve(mockPeople));
    (ApiHelper.fetchAllHomePlanets as jest.Mock).mockResolvedValue(Promise.resolve(mockPlanets));
  });

  afterEach(() => {
    // Clear mocks after each test
    jest.clearAllMocks();
  });
  
  test('render page title', () => {
    render(<CharacterList />);
    const element = screen.getByText(/Character List/i);
    expect(element).toBeInTheDocument();
  });

  it('mocks fetchData and fetchAllHomePlanets function to list characters and planets', async () => {
    render(<BrowserRouter><CharacterList /></BrowserRouter>);

    // Check that the planets are rendered
    await waitFor(() => {
      expect(screen.getByText(dummy_person1_name)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(dummy_planet1_name)).toBeInTheDocument();
    });
  });

  it('redirects to Character details page on card click', async () => {
    render(
      <BrowserRouter>
        <CharacterList />
      </BrowserRouter>
    );

    // Wait for the div to be visible
      const redirectDiv = await screen.findByTestId(`navigate-details-${dummy_person1_name}`);
      expect(redirectDiv).toBeInTheDocument();

      // Simulate div click
      fireEvent.click(redirectDiv);

      // Assert navigation
      expect(window.location.pathname).toBe(`/${dummy_person_id}/details`);

  });

});