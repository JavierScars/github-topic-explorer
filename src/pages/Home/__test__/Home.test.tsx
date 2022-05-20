import {
  render,
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { fail } from "assert";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Home } from "..";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
  },
});

const CustomComponent = ({ includeUser = false }) => {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
};

const ELEMENTS_TESTID = {
  LOADING_SPINNER: "loading-spinner",
  SEARCH_INPUT: "search-input",
  SEARCH_ACTION: "search-action",
  PREV_BUTTON: "prev-button",
  NEXT_BUTTON: "next-button",
  MAIN_TOPIC: "main-topic",
  RELATED_TOPICS: "related-topics-table",
};

describe("Home component", () => {
  let component: RenderResult;
  let searchInput: HTMLElement;
  let searchAction: HTMLElement;
  let prevButton: HTMLElement;
  let nextButton: HTMLElement;
  let mainTopic: HTMLElement;
  let relatedTopicsTable: HTMLElement;
  let loadingSpinner: HTMLElement | null;

  beforeEach(() => {
    component = render(<CustomComponent />);
  });

  test("It renders the main component", () => {
    expect(component).toBeTruthy();
  });

  describe("When the data is loading", () => {
    test("It renders the loading spinner", () => {
      loadingSpinner = component.getByTestId(ELEMENTS_TESTID.LOADING_SPINNER);
      expect(loadingSpinner).toBeTruthy();
    });

    test("It removes the loading spineer after loaded", async () => {
      await waitFor(() => {
        expect(loadingSpinner).not.toBeInTheDocument();
      });
    });
  });

  describe("When the data is loaded", () => {
    beforeEach(async () => {
      loadingSpinner = await component.queryByTestId(
        ELEMENTS_TESTID.LOADING_SPINNER
      );
      if (loadingSpinner) {
        await waitFor(() => {
          expect(loadingSpinner).not.toBeInTheDocument();
        });
      }
    });

    describe("The search component", () => {
      test("It renders the search input", () => {
        searchInput = component.getByTestId(ELEMENTS_TESTID.SEARCH_INPUT);
        expect(searchInput).toBeTruthy();
      });

      test("It renders the search action", () => {
        searchAction = component.getByTestId(ELEMENTS_TESTID.SEARCH_ACTION);
        expect(searchAction).toBeTruthy();
      });
    });

    describe("The navigation component", () => {});

    describe("The related topics component", () => {
      test("It renders the related topics component", () => {
        relatedTopicsTable = component.getByTestId(
          ELEMENTS_TESTID.RELATED_TOPICS
        );
        expect(relatedTopicsTable).toBeInTheDocument();
      });
    });
  });
});
