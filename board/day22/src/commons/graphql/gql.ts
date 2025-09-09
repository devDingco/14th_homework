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
    "\nquery fetchBoards{\n  fetchBoards{\n  \t_id,writer,title,contents,createdAt,updatedAt\n  }\n}\n": typeof types.FetchBoardsDocument,
    "\nmutation deleteBoard($boardId: ID!){\n  deleteBoard(boardId:$boardId)\n    \n}\n": typeof types.DeleteBoardDocument,
    "\n    query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n    }\n    }\n": typeof types.FetchBoardDocument,
    "\nmutation createBoard($writer: String!, $password: String!, $title: String!, $contents: String!){\n    createBoard( createBoardInput:{writer: $writer, password: $password, title:$title, contents: $contents }){\n        _id, title, contents, likeCount, dislikeCount\n    }\n}\n": typeof types.CreateBoardDocument,
    "\n    mutation updateBoard($boardId: ID!, $password: String, $updateBoardInput: UpdateBoardInput!){\n        updateBoard(boardId: $boardId, password: $password, updateBoardInput: $updateBoardInput)\n    {\n        _id, title, writer, contents\n    }\n    }\n": typeof types.UpdateBoardDocument,
};
const documents: Documents = {
    "\nquery fetchBoards{\n  fetchBoards{\n  \t_id,writer,title,contents,createdAt,updatedAt\n  }\n}\n": types.FetchBoardsDocument,
    "\nmutation deleteBoard($boardId: ID!){\n  deleteBoard(boardId:$boardId)\n    \n}\n": types.DeleteBoardDocument,
    "\n    query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n    }\n    }\n": types.FetchBoardDocument,
    "\nmutation createBoard($writer: String!, $password: String!, $title: String!, $contents: String!){\n    createBoard( createBoardInput:{writer: $writer, password: $password, title:$title, contents: $contents }){\n        _id, title, contents, likeCount, dislikeCount\n    }\n}\n": types.CreateBoardDocument,
    "\n    mutation updateBoard($boardId: ID!, $password: String, $updateBoardInput: UpdateBoardInput!){\n        updateBoard(boardId: $boardId, password: $password, updateBoardInput: $updateBoardInput)\n    {\n        _id, title, writer, contents\n    }\n    }\n": types.UpdateBoardDocument,
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
export function graphql(source: "\nquery fetchBoards{\n  fetchBoards{\n  \t_id,writer,title,contents,createdAt,updatedAt\n  }\n}\n"): (typeof documents)["\nquery fetchBoards{\n  fetchBoards{\n  \t_id,writer,title,contents,createdAt,updatedAt\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation deleteBoard($boardId: ID!){\n  deleteBoard(boardId:$boardId)\n    \n}\n"): (typeof documents)["\nmutation deleteBoard($boardId: ID!){\n  deleteBoard(boardId:$boardId)\n    \n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n    }\n    }\n"): (typeof documents)["\n    query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n    }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation createBoard($writer: String!, $password: String!, $title: String!, $contents: String!){\n    createBoard( createBoardInput:{writer: $writer, password: $password, title:$title, contents: $contents }){\n        _id, title, contents, likeCount, dislikeCount\n    }\n}\n"): (typeof documents)["\nmutation createBoard($writer: String!, $password: String!, $title: String!, $contents: String!){\n    createBoard( createBoardInput:{writer: $writer, password: $password, title:$title, contents: $contents }){\n        _id, title, contents, likeCount, dislikeCount\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation updateBoard($boardId: ID!, $password: String, $updateBoardInput: UpdateBoardInput!){\n        updateBoard(boardId: $boardId, password: $password, updateBoardInput: $updateBoardInput)\n    {\n        _id, title, writer, contents\n    }\n    }\n"): (typeof documents)["\n    mutation updateBoard($boardId: ID!, $password: String, $updateBoardInput: UpdateBoardInput!){\n        updateBoard(boardId: $boardId, password: $password, updateBoardInput: $updateBoardInput)\n    {\n        _id, title, writer, contents\n    }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;