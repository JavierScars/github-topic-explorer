# Server (BackEnd)

## Installation

- run `npm i` in the terminal
- create a `.env file` with the following options
  ```
  REACT_APP_GITHUB_ACCESS_TOKEN=XXXXXXXXXXXX
  ```
  where:
  - \*REACT_APP_GITHUB_ACCESS_TOKEN: Is your github access token.
- run `npm start` to run the server in development mode or run `npm run build` to build the server and then server it with another tool.

## Testing

- Run `npm i`
- Run `npm test`

## Dev Notes

- Since I've used React i choose jest for testing.
- Typescript for type-safe and better scalability
- Apollo client as "just go with it" library for graphql request.
- ChakraUI for fast prototyping in react. Through this library adds a complexity layer to the testing if youre not used to it.

## Future Improvements

- Add E2E testing.
- If click on a topic that is already on the history go to that index (or move it to the end of the history) instead of adding it again.

## Know issues

- ChrakraUI could be troublesome when testing. Its provider is not compatible with jest and its useToas needs to be mocked when in a testing environment (see `utils/useToast.ts` implementation).
