import { useQuery } from "@apollo/client";
import { Box, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { SearchBar } from "../../components/SearchBar";
import { IGetTopic } from "../../interfaces/GrapQLResponses";
import { ITopic } from "../../interfaces/Topic";
import { GET_TOPICS } from "../../queries/Topics";
import { RelatedTopics } from "./RelatedTopics";
import { TopicNavigator } from "./TopicNavigator";

export const Home = () => {
  const [subTopics, setSubTopics] = useState<ITopic[]>([]);
  const [topicHistory, setTopicHistory] = useState<ITopic[]>([]);
  const [topicIndex, setTopicIndex] = useState<number>(0);
  const [topic, setTopic] = useState<ITopic>();
  const [isLastTopicSelected, setIsLastTopicSelected] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { loading, error, data } = useQuery<IGetTopic>(GET_TOPICS, {
    variables: {
      name: searchTerm || topic?.name || "react",
    },
  });

  const toast = useToast();

  useEffect(() => {
    if (data) {
      if (data.topic.relatedTopics.length > 0) {
        setTopic(data.topic);
        setSubTopics(data.topic.relatedTopics);
        if (topicHistory.length === 0) {
          setTopicHistory([data.topic]);
        }
        if (searchTerm) {
          const newTopicHistory = [
            ...topicHistory.slice(0, topicIndex + 1),
            data.topic,
          ];
          setTopicHistory(newTopicHistory);
          setTopicIndex(newTopicHistory.length - 1);
        }
      } else if (searchTerm) {
        toast({
          title: `"${searchTerm}" doesnt seems to be a valid topic.`,
          description: "Please try another search term",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      setSearchTerm("");
    }
  }, [data]);

  useEffect(() => {
    if (topicHistory.length) {
      setIsLastTopicSelected(topicIndex == topicHistory.length - 1);
    } else {
      setIsLastTopicSelected(false);
    }
  }, [topicIndex, topicHistory]);

  const handleTopicSelection = (topic: ITopic) => {
    const newTopicHistory = [...topicHistory.slice(0, topicIndex + 1), topic];
    setTopic(topic);
    setTopicHistory(newTopicHistory);
    setTopicIndex(newTopicHistory.length - 1);
  };

  const handleTopicHistoryBack = () => {
    if (topicIndex > 0) {
      const newIndex = topicIndex - 1;
      setTopicIndex(newIndex);
      setTopic(topicHistory[newIndex]);
    }
  };

  const handleTopicHistoryForward = () => {
    if (topicIndex < topicHistory.length - 1) {
      const newIndex = topicIndex + 1;
      setTopicIndex(newIndex);
      setTopic(topicHistory[newIndex]);
    }
  };

  const handleSearchTermChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  return (
    <Box
      maxW="100vw"
      minH="100vh"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <LoadingSpinner isLoading={loading} />
      {error && <Box>{error.message}</Box>}
      {data && topic && (
        <>
          <Box marginBottom={16} minWidth="300px">
            <SearchBar
              onSearch={handleSearchTermChange}
              placeholder="Write a topic name"
            />
          </Box>
          <Box marginBottom={2}>
            <TopicNavigator
              isPrevDisabled={topicIndex <= 0}
              isNextDisabled={isLastTopicSelected}
              onNext={handleTopicHistoryForward}
              onPrev={handleTopicHistoryBack}
              topic={topic}
            />
          </Box>
          <RelatedTopics
            onTopicClick={handleTopicSelection}
            topics={subTopics}
          />
        </>
      )}
    </Box>
  );
};
