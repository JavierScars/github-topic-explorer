import { render, fireEvent, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RelatedTopics, RelatedTopicsProps } from "../RelatedTopics";
import { ITopic } from "../../../interfaces/Topic";

const ELEMENTS_TESTID = {
  RELATED_TOPICS_TABLE: "related-topics-table",
  TOPIC_ROW_BUTTON: "topic-row-button",
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

const onTopicClickMock = jest.fn();

const mockedProps: RelatedTopicsProps = {
  onTopicClick: onTopicClickMock,
  topics: mockedTopics,
};

let component: RenderResult;
let relatedTopicTable: HTMLElement;
let topicRowButton: HTMLElement[];

describe("Related topics table component", () => {
  beforeEach(() => {
    component = render(<RelatedTopics {...mockedProps} />);
  });

  test("It renders the main component", () => {
    expect(component).toBeTruthy();
  });

  describe("The table", () => {
    test("It renders the table", () => {
      relatedTopicTable = component.getByTestId(
        ELEMENTS_TESTID.RELATED_TOPICS_TABLE
      );
      expect(relatedTopicTable).toBeTruthy();
    });

    test("It renders the related topics rows", () => {
      const topicRows = component.getAllByTestId(
        ELEMENTS_TESTID.TOPIC_ROW_BUTTON
      );
      expect(topicRows).toHaveLength(mockedTopics.length);
    });

    test("It calls the onTopicClick function when a topic row is clicked", () => {
      topicRowButton = component.getAllByTestId(
        ELEMENTS_TESTID.TOPIC_ROW_BUTTON
      );
      fireEvent.click(topicRowButton[0]);
      expect(onTopicClickMock).toHaveBeenCalledTimes(1);
      expect(onTopicClickMock).toHaveBeenCalledWith(mockedTopics[0]);
    });
  });
});
