export interface ITopic {
  name: string;
  id: string;
  stargazerCount: number;
}

export interface IMainTopic extends ITopic {
  relatedTopics: ITopic[];
}
