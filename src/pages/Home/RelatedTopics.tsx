import { FC } from "react";
import { ITopic } from "../../interfaces/Topic";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export interface RelatedTopicsProps {
  topics: ITopic[];
  onTopicClick: (topic: ITopic) => void;
}

export const RelatedTopics: FC<RelatedTopicsProps> = ({
  topics,
  onTopicClick,
}) => {
  return (
    <>
      <TableContainer>
        <Table
          data-testid="related-topics-table"
          variant="striped"
          colorScheme="cyan"
          minW="350px"
        >
          <TableCaption
            placement="top"
            fontSize={"lg"}
            fontWeight="bold"
            paddingBottom={0}
            tabIndex={0}
          >
            Related Topics
          </TableCaption>
          <Thead>
            <Tr>
              <Th textAlign="left" tabIndex={0}>
                Topic
              </Th>
              <Th textAlign="right" tabIndex={0}>
                Stars
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {topics.map((topic, i) => (
              <Tr
                key={topic.id}
                onClick={() => onTopicClick(topic)}
                data-testid="topic-row-button"
                aria-label={`${topic.name} has ${topic.stargazerCount} stars. Click to see related topics.`}
                tabIndex={0}
              >
                <Td fontWeight="bold" fontSize={"md"} textAlign="left">
                  {topic.name}
                </Td>
                <Td textAlign="right">
                  {topic.stargazerCount}{" "}
                  <StarIcon
                    marginLeft={2}
                    color={`cyan.${i % 2 != 0 ? 500 : 900}`}
                    position="relative"
                    top={-1}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
