import { gql } from "@apollo/client";

export const GET_TOPICS = gql(`
  query GetTopic($name: String!) {
    topic(name: $name) {
      relatedTopics {
        ...topicFields
      }
      ...topicFields
    }
  }

  fragment topicFields on Topic { 
    name
    id
    stargazerCount
  }
`);