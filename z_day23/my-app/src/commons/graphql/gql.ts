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
    "\n  query fetchBoardComments($boardId: ID!, $page: Int) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      createdAt\n      rating\n    }\n  }\n": typeof types.FetchBoardCommentsDocument,
    "\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n": typeof types.CreateBoardCommentDocument,
    "\n  query fetchBoardDetail($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      createdAt\n      likeCount\n      dislikeCount\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n": typeof types.FetchBoardDetailDocument,
    "\n  mutation updateBoardDetail(\n    $boardId: ID!\n    $password: String\n    $updateBoardInput: UpdateBoardInput!\n  ) {\n    updateBoard(\n      boardId: $boardId\n      password: $password\n      updateBoardInput: $updateBoardInput\n    ) {\n      _id\n      title\n      contents\n      writer\n      createdAt\n    }\n  }\n": typeof types.UpdateBoardDetailDocument,
    "\n  query fetchBoards {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n      createdAt\n    }\n  }\n": typeof types.FetchBoardsDocument,
    "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": typeof types.DeleteBoardDocument,
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": typeof types.CreateBoardDocument,
    "\n  query fetchBoardWrite($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        _id\n        email\n        name\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.FetchBoardWriteDocument,
    "\n  mutation updateBoardWrite(\n    $boardId: ID!\n    $password: String\n    $updateBoardInput: UpdateBoardInput!\n  ) {\n    updateBoard(\n      boardId: $boardId\n      password: $password\n      updateBoardInput: $updateBoardInput\n    ) {\n      _id\n      title\n      contents\n      writer\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n": typeof types.UpdateBoardWriteDocument,
};
const documents: Documents = {
    "\n  query fetchBoardComments($boardId: ID!, $page: Int) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      createdAt\n      rating\n    }\n  }\n": types.FetchBoardCommentsDocument,
    "\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n": types.CreateBoardCommentDocument,
    "\n  query fetchBoardDetail($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      createdAt\n      likeCount\n      dislikeCount\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n": types.FetchBoardDetailDocument,
    "\n  mutation updateBoardDetail(\n    $boardId: ID!\n    $password: String\n    $updateBoardInput: UpdateBoardInput!\n  ) {\n    updateBoard(\n      boardId: $boardId\n      password: $password\n      updateBoardInput: $updateBoardInput\n    ) {\n      _id\n      title\n      contents\n      writer\n      createdAt\n    }\n  }\n": types.UpdateBoardDetailDocument,
    "\n  query fetchBoards {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n      createdAt\n    }\n  }\n": types.FetchBoardsDocument,
    "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": types.DeleteBoardDocument,
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.CreateBoardDocument,
    "\n  query fetchBoardWrite($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        _id\n        email\n        name\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.FetchBoardWriteDocument,
    "\n  mutation updateBoardWrite(\n    $boardId: ID!\n    $password: String\n    $updateBoardInput: UpdateBoardInput!\n  ) {\n    updateBoard(\n      boardId: $boardId\n      password: $password\n      updateBoardInput: $updateBoardInput\n    ) {\n      _id\n      title\n      contents\n      writer\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n": types.UpdateBoardWriteDocument,
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
export function graphql(source: "\n  query fetchBoardComments($boardId: ID!, $page: Int) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      createdAt\n      rating\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardComments($boardId: ID!, $page: Int) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      createdAt\n      rating\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardDetail($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      createdAt\n      likeCount\n      dislikeCount\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardDetail($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      createdAt\n      likeCount\n      dislikeCount\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoardDetail(\n    $boardId: ID!\n    $password: String\n    $updateBoardInput: UpdateBoardInput!\n  ) {\n    updateBoard(\n      boardId: $boardId\n      password: $password\n      updateBoardInput: $updateBoardInput\n    ) {\n      _id\n      title\n      contents\n      writer\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoardDetail(\n    $boardId: ID!\n    $password: String\n    $updateBoardInput: UpdateBoardInput!\n  ) {\n    updateBoard(\n      boardId: $boardId\n      password: $password\n      updateBoardInput: $updateBoardInput\n    ) {\n      _id\n      title\n      contents\n      writer\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardWrite($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        _id\n        email\n        name\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardWrite($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        _id\n        email\n        name\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoardWrite(\n    $boardId: ID!\n    $password: String\n    $updateBoardInput: UpdateBoardInput!\n  ) {\n    updateBoard(\n      boardId: $boardId\n      password: $password\n      updateBoardInput: $updateBoardInput\n    ) {\n      _id\n      title\n      contents\n      writer\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoardWrite(\n    $boardId: ID!\n    $password: String\n    $updateBoardInput: UpdateBoardInput!\n  ) {\n    updateBoard(\n      boardId: $boardId\n      password: $password\n      updateBoardInput: $updateBoardInput\n    ) {\n      _id\n      title\n      contents\n      writer\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;