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
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation Login($email: String!, $password: String!) {\n  loginUser(email: $email, password: $password) {\n    accessToken\n  }\n}\n\nmutation CreateUser($email: String!, $password: String!, $name: String!) {\n  createUser(createUserInput: {email: $email, password: $password, name: $name}) {\n    _id\n    email\n    name\n  }\n}\n\nquery FetchUserLoggedIn {\n  fetchUserLoggedIn {\n    _id\n    email\n    name\n  }\n}": typeof types.LoginDocument,
};
const documents: Documents = {
    "mutation Login($email: String!, $password: String!) {\n  loginUser(email: $email, password: $password) {\n    accessToken\n  }\n}\n\nmutation CreateUser($email: String!, $password: String!, $name: String!) {\n  createUser(createUserInput: {email: $email, password: $password, name: $name}) {\n    _id\n    email\n    name\n  }\n}\n\nquery FetchUserLoggedIn {\n  fetchUserLoggedIn {\n    _id\n    email\n    name\n  }\n}": types.LoginDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($email: String!, $password: String!) {\n  loginUser(email: $email, password: $password) {\n    accessToken\n  }\n}\n\nmutation CreateUser($email: String!, $password: String!, $name: String!) {\n  createUser(createUserInput: {email: $email, password: $password, name: $name}) {\n    _id\n    email\n    name\n  }\n}\n\nquery FetchUserLoggedIn {\n  fetchUserLoggedIn {\n    _id\n    email\n    name\n  }\n}"): (typeof documents)["mutation Login($email: String!, $password: String!) {\n  loginUser(email: $email, password: $password) {\n    accessToken\n  }\n}\n\nmutation CreateUser($email: String!, $password: String!, $name: String!) {\n  createUser(createUserInput: {email: $email, password: $password, name: $name}) {\n    _id\n    email\n    name\n  }\n}\n\nquery FetchUserLoggedIn {\n  fetchUserLoggedIn {\n    _id\n    email\n    name\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;