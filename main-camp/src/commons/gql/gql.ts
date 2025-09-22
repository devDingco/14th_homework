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
    "\n    mutation createBoard($createBoardInput: CreateBoardInput!) {\n        createBoard(createBoardInput: $createBoardInput) {\n            _id\n            writer\n            title\n        }\n    }\n": typeof types.CreateBoardDocument,
    "\n    mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {\n        updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n            _id\n        }\n    }\n": typeof types.UpdateBoardDocument,
    "\n    query fetchBoard($boardId: ID!) {\n        fetchBoard(boardId: $boardId) {\n            _id\n            writer\n            title\n            contents\n            boardAddress {\n                zipcode\n                address\n                addressDetail\n            }\n            youtubeUrl\n            createdAt\n        }\n    }\n": typeof types.FetchBoardDocument,
    "\n    query fetchBoards($page: Int!) {\n        fetchBoards(page: $page) {\n                _id\n                title\n                writer\n                contents\n                createdAt\n        }\n    }\n": typeof types.FetchBoardsDocument,
    "\n    mutation deleteBoard($boardId: ID!) {\n        deleteBoard(boardId: $boardId)\n    }\n": typeof types.DeleteBoardDocument,
    "\n    query   fetchBoardComments($page: Int, $boardId: ID!) {\n        fetchBoardComments(page: $page, boardId: $boardId) {\n            _id\n            writer\n            contents\n            createdAt\n        }\n    }\n": typeof types.FetchBoardCommentsDocument,
    "\n    mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {\n        createBoardComment (createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {\n            _id\n        }\n    }\n": typeof types.CreateBoardCommentDocument,
    "\n    mutation deleteBoardComment($password: String, $boardCommentId: ID!) {\n        deleteBoardComment (password: $password, boardCommentId:$boardCommentId)\n    }\n": typeof types.DeleteBoardCommentDocument,
};
const documents: Documents = {
    "\n    mutation createBoard($createBoardInput: CreateBoardInput!) {\n        createBoard(createBoardInput: $createBoardInput) {\n            _id\n            writer\n            title\n        }\n    }\n": types.CreateBoardDocument,
    "\n    mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {\n        updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n            _id\n        }\n    }\n": types.UpdateBoardDocument,
    "\n    query fetchBoard($boardId: ID!) {\n        fetchBoard(boardId: $boardId) {\n            _id\n            writer\n            title\n            contents\n            boardAddress {\n                zipcode\n                address\n                addressDetail\n            }\n            youtubeUrl\n            createdAt\n        }\n    }\n": types.FetchBoardDocument,
    "\n    query fetchBoards($page: Int!) {\n        fetchBoards(page: $page) {\n                _id\n                title\n                writer\n                contents\n                createdAt\n        }\n    }\n": types.FetchBoardsDocument,
    "\n    mutation deleteBoard($boardId: ID!) {\n        deleteBoard(boardId: $boardId)\n    }\n": types.DeleteBoardDocument,
    "\n    query   fetchBoardComments($page: Int, $boardId: ID!) {\n        fetchBoardComments(page: $page, boardId: $boardId) {\n            _id\n            writer\n            contents\n            createdAt\n        }\n    }\n": types.FetchBoardCommentsDocument,
    "\n    mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {\n        createBoardComment (createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {\n            _id\n        }\n    }\n": types.CreateBoardCommentDocument,
    "\n    mutation deleteBoardComment($password: String, $boardCommentId: ID!) {\n        deleteBoardComment (password: $password, boardCommentId:$boardCommentId)\n    }\n": types.DeleteBoardCommentDocument,
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
export function graphql(source: "\n    mutation createBoard($createBoardInput: CreateBoardInput!) {\n        createBoard(createBoardInput: $createBoardInput) {\n            _id\n            writer\n            title\n        }\n    }\n"): (typeof documents)["\n    mutation createBoard($createBoardInput: CreateBoardInput!) {\n        createBoard(createBoardInput: $createBoardInput) {\n            _id\n            writer\n            title\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {\n        updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n            _id\n        }\n    }\n"): (typeof documents)["\n    mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {\n        updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n            _id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query fetchBoard($boardId: ID!) {\n        fetchBoard(boardId: $boardId) {\n            _id\n            writer\n            title\n            contents\n            boardAddress {\n                zipcode\n                address\n                addressDetail\n            }\n            youtubeUrl\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    query fetchBoard($boardId: ID!) {\n        fetchBoard(boardId: $boardId) {\n            _id\n            writer\n            title\n            contents\n            boardAddress {\n                zipcode\n                address\n                addressDetail\n            }\n            youtubeUrl\n            createdAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query fetchBoards($page: Int!) {\n        fetchBoards(page: $page) {\n                _id\n                title\n                writer\n                contents\n                createdAt\n        }\n    }\n"): (typeof documents)["\n    query fetchBoards($page: Int!) {\n        fetchBoards(page: $page) {\n                _id\n                title\n                writer\n                contents\n                createdAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation deleteBoard($boardId: ID!) {\n        deleteBoard(boardId: $boardId)\n    }\n"): (typeof documents)["\n    mutation deleteBoard($boardId: ID!) {\n        deleteBoard(boardId: $boardId)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query   fetchBoardComments($page: Int, $boardId: ID!) {\n        fetchBoardComments(page: $page, boardId: $boardId) {\n            _id\n            writer\n            contents\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    query   fetchBoardComments($page: Int, $boardId: ID!) {\n        fetchBoardComments(page: $page, boardId: $boardId) {\n            _id\n            writer\n            contents\n            createdAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {\n        createBoardComment (createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {\n            _id\n        }\n    }\n"): (typeof documents)["\n    mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {\n        createBoardComment (createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {\n            _id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation deleteBoardComment($password: String, $boardCommentId: ID!) {\n        deleteBoardComment (password: $password, boardCommentId:$boardCommentId)\n    }\n"): (typeof documents)["\n    mutation deleteBoardComment($password: String, $boardCommentId: ID!) {\n        deleteBoardComment (password: $password, boardCommentId:$boardCommentId)\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;