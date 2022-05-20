import { render, fireEvent, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoadingSpinner } from "../LoadingSpinner";

const ELEMENTS_TESTID = {
  LOADING_SPINNER: "loading-spinner",
};

describe("Spinner component", () => {
  test("It renders if its loading", () => {
    const component = render(<LoadingSpinner isLoading />);
    expect(component).toBeTruthy();
    const loadingSpinner = component.getByTestId(
      ELEMENTS_TESTID.LOADING_SPINNER
    );
    expect(loadingSpinner).toBeTruthy();
  });

  test("It doesnt render if its not loading", () => {
    const component = render(<LoadingSpinner isLoading={false} />);
    expect(component).toBeTruthy();
  });
});
