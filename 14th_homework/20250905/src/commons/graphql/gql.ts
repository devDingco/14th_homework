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
    "\n  query fetchBoardDetail($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.FetchBoardDetailDocument,
    "\n  query FetchBoards {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.FetchBoardsDocument,
    "\n  mutation DeleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": typeof types.DeleteBoardDocument,
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": typeof types.CreateBoardDocument,
    "\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String!, $boardId: ID!) {\n    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": typeof types.UpdateBoardDocument,
    "\n  query fetchBoardForEdit($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      images\n    }\n  }\n": typeof types.FetchBoardForEditDocument,
};
const documents: Documents = {
    "\n  query fetchBoardDetail($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n    }\n  }\n": types.FetchBoardDetailDocument,
    "\n  query FetchBoards {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n    }\n  }\n": types.FetchBoardsDocument,
    "\n  mutation DeleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": types.DeleteBoardDocument,
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.CreateBoardDocument,
    "\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String!, $boardId: ID!) {\n    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.UpdateBoardDocument,
    "\n  query fetchBoardForEdit($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      images\n    }\n  }\n": types.FetchBoardForEditDocument,
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
export function graphql(source: "\n  query fetchBoardDetail($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardDetail($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FetchBoards {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query FetchBoards {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation DeleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String!, $boardId: ID!) {\n    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String!, $boardId: ID!) {\n    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardForEdit($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      images\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardForEdit($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      images\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;