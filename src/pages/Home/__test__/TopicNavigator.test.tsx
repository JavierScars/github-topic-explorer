import { render, fireEvent, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TopicNavigator, TopicNavigatorProps } from "../TopicNavigator";
import { ITopic } from "../../../interfaces/Topic";

const ELEMENTS_TESTID = {
  PREV_BUTTON: "prev-button",
  NEXT_BUTTON: "next-button",
  MAIN_TOPIC: "main-topic",
};

const mockedTopics: ITopic[] = [
  {
    name: "React",
    stargazerCount: 100,
    id: "1",
  },
  {
    name: "Redux",
    stargazerCount: 200,
    id: "2",
  },
  {
    name: "GraphQL",
    stargazerCount: 300,
    id: "3",
  },
];

const mockedProps: TopicNavigatorProps = {
  isNextDisabled: false,
  isPrevDisabled: false,
  onNext: () => {
    const index = mockedTopics.findIndex(
      (topic) => topic.id === mockedProps.topic.id
    );
    if (typeof index === "number") {
      if (index === mockedTopics.length - 1) {
        mockedProps.isNextDisabled = true;
      }
      if (index < mockedTopics.length - 1) {
        mockedProps.topic = mockedTopics[index + 1];
      }
    }
  },
  onPrev: () => {
    const index = mockedTopics.findIndex(
      (topic) => topic.id === mockedProps.topic.id
    );
    if (typeof index === "number") {
      if (index === 0) {
        mockedProps.isPrevDisabled = true;
      }
      if (index > 0) {
        mockedProps.topic = mockedTopics[index - 1];
      }
    }
  },
  topic: mockedTopics[0],
};

let component: RenderResult;
let prevButton: HTMLElement;
let nextButton: HTMLElement;
let mainTopic: HTMLElement;

describe("TopicNavigator component", () => {
  beforeEach(() => {
    component = render(<TopicNavigator {...mockedProps} />);
  });

  test("It renders the main component", () => {
    expect(component).toBeTruthy();
  });

  test("It renders the next button", () => {
    nextButton = component.getByTestId(ELEMENTS_TESTID.NEXT_BUTTON);
    expect(nextButton).toBeTruthy();
  });

  test("It renders the prev button", () => {
    prevButton = component.getByTestId(ELEMENTS_TESTID.PREV_BUTTON);
    expect(prevButton).toBeTruthy();
    expect(prevButton).toBeDisabled;
  });

  describe("The navigation feature", () => {
    beforeEach(() => {
      nextButton = component.getByTestId(ELEMENTS_TESTID.NEXT_BUTTON);
      prevButton = component.getByTestId(ELEMENTS_TESTID.PREV_BUTTON);
    });

    test("It navigates to the next topic on next button clicked", async () => {
      nextButton = component.getByTestId(ELEMENTS_TESTID.NEXT_BUTTON);
      expect(prevButton).toBeDisabled;
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      expect(nextButton).toBeDisabled;
      expect(prevButton).toBeEnabled;
      expect(mockedProps.topic.id).toEqual(mockedTopics[2].id);
    });

    test("It navigates to the prev topic on prev button clicked", async () => {
      prevButton = component.getByTestId(ELEMENTS_TESTID.PREV_BUTTON);
      expect(prevButton).toBeEnabled;
      expect(nextButton).toBeDisabled;
      fireEvent.click(prevButton);
      fireEvent.click(prevButton);
      expect(nextButton).toBeEnabled;
      expect(prevButton).toBeDisabled;
      expect(mockedProps.topic.id).toEqual(mockedTopics[0].id);
    });
  });

  describe("The main topic", () => {
    beforeEach(() => {
      mainTopic = component.getByTestId(ELEMENTS_TESTID.MAIN_TOPIC);
    });

    test("It renders the main topic", () => {
      expect(mainTopic).toBeTruthy();
    });

    test("It renders the main topic name and the stargazer count", () => {
      expect(mainTopic.textContent).toEqual(
        `${mockedProps.topic.name} - ${mockedProps.topic.stargazerCount} `
      );
    });
  });
});
