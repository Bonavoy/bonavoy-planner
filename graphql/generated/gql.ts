/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation getToken {\n    token\n  }\n": types.GetTokenDocument,
    "\n  mutation createUser($userInput: UserInput!) {\n    createUser(userInput: $userInput) {\n      id\n    }\n  }  \n": types.CreateUserDocument,
    "\n  mutation authenticate($username: String!, $password: String!) {\n    authenticate(username: $username, password: $password)\n  }\n": types.AuthenticateDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation getToken {\n    token\n  }\n"): (typeof documents)["\n  mutation getToken {\n    token\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createUser($userInput: UserInput!) {\n    createUser(userInput: $userInput) {\n      id\n    }\n  }  \n"): (typeof documents)["\n  mutation createUser($userInput: UserInput!) {\n    createUser(userInput: $userInput) {\n      id\n    }\n  }  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation authenticate($username: String!, $password: String!) {\n    authenticate(username: $username, password: $password)\n  }\n"): (typeof documents)["\n  mutation authenticate($username: String!, $password: String!) {\n    authenticate(username: $username, password: $password)\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;