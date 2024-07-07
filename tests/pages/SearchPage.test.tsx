import { render, fireEvent } from '@testing-library/react'
// import userEvent from "@testing-library/user-event";
import SearchBar from '../../src/components/search/SearchBar';

describe('Search Bar', () => {
  it('search suggestions', () => {
    const result  = render(<SearchBar />);
  
    const searchInput = result.container.querySelector('#search');

    fireEvent.change(searchInput, { target: { value: 'ch' } })
  
  });
})