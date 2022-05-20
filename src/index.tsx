import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { Home } from "./pages/Home";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
  },
});

root.render(
  <ApolloProvider client={client}>
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  </ApolloProvider>
);

reportWebVitals();
