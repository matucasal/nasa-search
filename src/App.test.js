// pay attention to write it at the top level of your file
//Using this to create the router "context"
const mockedNavigate = jest.fn();

import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import Header from './components/Header/Header'
import Home from './components/Home'
import Search from './components/Search/Search'



/*
What to test ->
    0) Must render
    1) Render the right screen
    2) Inputs -> Form Validation
    3) test the events of the form
    4) Search input try to search
    5) Test the props recieved by the search in the results page
    6) Test the states of the results page
    7) Test loading in the results page
    8) Select an item try to enter the show page
    9) Array manipulation for images in the show page
*/


Enzyme.configure({adapter: new Adapter()});

//0) Must render
it('renders correctly the app', () => {
    const tree = renderer
    .create(<App></App>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});


//1) Render the right screen -> Header / Home 
describe('Parent Component App', () => {
    it('renders Child component Header and Home', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.containsMatchingElement(<Header />)).toEqual(true);
        expect(wrapper.containsMatchingElement(<Home />)).toEqual(true);
    });
});


//Using this to create the router "context"
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));



//2) Inputs -> Form Validation
describe("Testing Search", () => {
 
    test('search input exists and correct type', () => {
      render(<Search />);
      const inputEl = screen.getByTestId("search-input");
      expect(inputEl).toBeInTheDocument();
      expect(inputEl).toHaveAttribute("type", "text");
    });

    test('year strart input exists and correct type', () => {
        render(<Search />);
        const inputEl = screen.getByTestId("year-start-input");
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveAttribute("type", "text");
    });

    test('year end input exists and correct type', () => {
        render(<Search />);
        const inputEl = screen.getByTestId("year-end-input");
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveAttribute("type", "text");
    });

    test('year start input to be ok', () => {
        render(<App />);
     
        const inputElYearStart = screen.getByTestId("year-start-input");
        userEvent.type(inputElYearStart, "2020");

        const inputElYearEnd = screen.getByTestId("year-end-input");
        userEvent.type(inputElYearEnd, "2019");
     
        expect(screen.getByTestId("year-start-input")).toHaveValue("2020");
        expect(screen.queryByTestId("year-start-error-msg")).not.toBeInTheDocument();
    });

})
