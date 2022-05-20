import { render, fireEvent, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SearchBar, SearchBarProps } from "../SearchBar";

const ELEMENTS_TESTID = {
  SEARCH_BAR_COMPONENT: "search-bar-component",
  SEARCH_INPUT: "search-input",
  SEARCH_ACTION: "search-action",
};

const onSearchMock = jest.fn();

const props: SearchBarProps = {
  onSearch: onSearchMock,
  initialValue: "initial value",
  placeholder: "initial placeholder",
};

const Component = () => {
  return <SearchBar {...props} />;
};

let component: RenderResult;
describe("Searchbar component", () => {
  beforeEach(() => {
    component = render(<Component />);
  });
  test("It renders the main component", () => {
    const searchBarComponent = component.getByTestId(
      ELEMENTS_TESTID.SEARCH_BAR_COMPONENT
    );
    expect(component).toBeTruthy();
    expect(searchBarComponent).toBeTruthy();
    expect(searchBarComponent).toBeInTheDocument();
  });

  describe("It renders the search input", () => {
    test("It renders properly", () => {
      const searchInput = component.getByTestId(ELEMENTS_TESTID.SEARCH_INPUT);
      expect(searchInput).toBeTruthy();
      expect(searchInput).toBeInTheDocument();
    });

    test("It has the correct initial values", () => {
      const searchInput = component.getByTestId(ELEMENTS_TESTID.SEARCH_INPUT);
      expect(searchInput).toHaveValue(props.initialValue);
      expect(searchInput).toHaveAttribute("placeholder", props.placeholder);
    });

    test("It updates the value when the user types", () => {
      const searchInput = component.getByTestId(ELEMENTS_TESTID.SEARCH_INPUT);
      fireEvent.change(searchInput, { target: { value: "new value" } });
      expect(searchInput).toHaveValue("new value");
    });

    test("It calls the onSearch function when the user presses enter", () => {
      const searchInput = component.getByTestId(ELEMENTS_TESTID.SEARCH_INPUT);
      fireEvent.change(searchInput, { target: { value: "new value" } });
      fireEvent.keyDown(searchInput, { key: "Enter" });
      expect(onSearchMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("It renders the search action", () => {
    test("It renders properly", () => {
      const searchAction = component.getByTestId(ELEMENTS_TESTID.SEARCH_ACTION);
      expect(searchAction).toBeTruthy();
      expect(searchAction).toBeInTheDocument();
    });

    test("It calls the onSearch function when the user clicks", () => {
      onSearchMock.mockClear();
      const searchAction = component.getByTestId(ELEMENTS_TESTID.SEARCH_ACTION);
      fireEvent.click(searchAction);
      expect(onSearchMock).toHaveBeenCalledTimes(1);
    });
  });
});
