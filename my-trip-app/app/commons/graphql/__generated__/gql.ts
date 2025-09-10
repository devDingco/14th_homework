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
    "\n  mutation Login($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation CreateUser($email: String!, $password: String!, $name: String!) {\n    createUser(createUserInput: { email: $email, password: $password, name: $name }) {\n      _id\n      email\n      name\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  mutation CreateBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      title\n      contents\n      writer\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      images\n      youtubeUrl\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateBoardDocument,
    "\n  mutation UploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      _id\n      url\n    }\n  }\n": typeof types.UploadFileDocument,
    "\n  mutation LikeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n": typeof types.LikeBoardDocument,
    "\n  mutation DislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n": typeof types.DislikeBoardDocument,
    "\n  mutation UpdateBoard($boardId: ID!, $password: String, $updateBoardInput: UpdateBoardInput!) {\n    updateBoard(boardId: $boardId, password: $password, updateBoardInput: $updateBoardInput) {\n      _id\n      title\n      contents\n      writer\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      images\n      youtubeUrl\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateBoardDocument,
    "\n  query FetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n    }\n  }\n": typeof types.FetchUserLoggedInDocument,
    "\n  query fetchBoardsOfTheBest {\n    fetchBoardsOfTheBest {\n      _id\n      title \n      contents\n      images\n      likeCount\n      dislikeCount\n      writer\n      user {\n        _id\n        name\n        \n      }\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.FetchBoardsOfTheBestDocument,
};
const documents: Documents = {
    "\n  mutation Login($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n": types.LoginDocument,
    "\n  mutation CreateUser($email: String!, $password: String!, $name: String!) {\n    createUser(createUserInput: { email: $email, password: $password, name: $name }) {\n      _id\n      email\n      name\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation CreateBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      title\n      contents\n      writer\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      images\n      youtubeUrl\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateBoardDocument,
    "\n  mutation UploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      _id\n      url\n    }\n  }\n": types.UploadFileDocument,
    "\n  mutation LikeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n": types.LikeBoardDocument,
    "\n  mutation DislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n": types.DislikeBoardDocument,
    "\n  mutation UpdateBoard($boardId: ID!, $password: String, $updateBoardInput: UpdateBoardInput!) {\n    updateBoard(boardId: $boardId, password: $password, updateBoardInput: $updateBoardInput) {\n      _id\n      title\n      contents\n      writer\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      images\n      youtubeUrl\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateBoardDocument,
    "\n  query FetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n    }\n  }\n": types.FetchUserLoggedInDocument,
    "\n  query fetchBoardsOfTheBest {\n    fetchBoardsOfTheBest {\n      _id\n      title \n      contents\n      images\n      likeCount\n      dislikeCount\n      writer\n      user {\n        _id\n        name\n        \n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.FetchBoardsOfTheBestDocument,
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
export function graphql(source: "\n  mutation Login($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($email: String!, $password: String!, $name: String!) {\n    createUser(createUserInput: { email: $email, password: $password, name: $name }) {\n      _id\n      email\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($email: String!, $password: String!, $name: String!) {\n    createUser(createUserInput: { email: $email, password: $password, name: $name }) {\n      _id\n      email\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      title\n      contents\n      writer\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      images\n      youtubeUrl\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      title\n      contents\n      writer\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      images\n      youtubeUrl\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      _id\n      url\n    }\n  }\n"): (typeof documents)["\n  mutation UploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      _id\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LikeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation LikeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation DislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateBoard($boardId: ID!, $password: String, $updateBoardInput: UpdateBoardInput!) {\n    updateBoard(boardId: $boardId, password: $password, updateBoardInput: $updateBoardInput) {\n      _id\n      title\n      contents\n      writer\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      images\n      youtubeUrl\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateBoard($boardId: ID!, $password: String, $updateBoardInput: UpdateBoardInput!) {\n    updateBoard(boardId: $boardId, password: $password, updateBoardInput: $updateBoardInput) {\n      _id\n      title\n      contents\n      writer\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      images\n      youtubeUrl\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n    }\n  }\n"): (typeof documents)["\n  query FetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardsOfTheBest {\n    fetchBoardsOfTheBest {\n      _id\n      title \n      contents\n      images\n      likeCount\n      dislikeCount\n      writer\n      user {\n        _id\n        name\n        \n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardsOfTheBest {\n    fetchBoardsOfTheBest {\n      _id\n      title \n      contents\n      images\n      likeCount\n      dislikeCount\n      writer\n      user {\n        _id\n        name\n        \n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;