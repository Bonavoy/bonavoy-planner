import { gql } from '../generated';

export const REFRESH_TOKEN = gql(`
  mutation getToken {
    token
  }
`);

export const SIGNUP = gql(`
  mutation createUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      id
    }
  }  
`);

export const AUTHENTICATE = gql(`
  mutation authenticate($username: String!, $password: String!) {
    authenticate(username: $username, password: $password)
  }
`);
