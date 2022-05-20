import { StarIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import { FC } from "react";
import { ITopic } from "../../interfaces/Topic";

export interface TopicNavigatorProps {
  topic: ITopic;
  onPrev: () => void;
  onNext: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}

export const TopicNavigator: FC<TopicNavigatorProps> = ({
  topic,
  onNext,
  onPrev,
  isNextDisabled,
  isPrevDisabled,
}) => {
  return (
    <Flex
      direction="row"
      justify="center"
      align="center"
      data-testid="topic-navigator-component"
      gap={4}
      aria-label="Topic navigation"
    >
      <Button
        disabled={isPrevDisabled}
        onClick={onPrev}
        data-testid="prev-button"
        colorScheme="cyan"
        color="white"
        aria-label="Previous topic"
      >
        Prev
      </Button>
      <Flex
        direction="row"
        justify="center"
        align="center"
        data-testid="main-topic"
        fontSize={["sm", "md", "lg"]}
        fontWeight="bold"
        textTransform={["uppercase"]}
        aria-label={`${topic.name} topic has ${topic.stargazerCount} stars`}
        tabIndex={0}
      >
        {topic.name} - {topic.stargazerCount}{" "}
        <StarIcon marginLeft={2} color="cyan.500" aria-label="stars" />
      </Flex>
      <Button
        disabled={isNextDisabled}
        onClick={onNext}
        data-testid="next-button"
        colorScheme="cyan"
        color="white"
        aria-label="Next topic"
      >
        Next
      </Button>
    </Flex>
  );
};
