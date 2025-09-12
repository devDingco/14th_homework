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
    "\n    mutation createBoard($createBoardInput: CreateBoardInput!){\n    createBoard(createBoardInput: $createBoardInput) {\n        _id\n        writer\n        title\n        contents\n    }\n    }\n": typeof types.CreateBoardDocument,
    "\n    mutation deleteBoard($boardId:ID!){\n        deleteBoard(boardId:$boardId)\n    }\n": typeof types.DeleteBoardDocument,
    "\n    mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!){\n    updateBoard(\n        updateBoardInput: $updateBoardInput\n        password: $password\n        boardId: $boardId\n    ){\n        _id\n    }\n}\n": typeof types.UpdateBoardDocument,
    "\n    mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!){\n        createBoardComment(\n            createBoardCommentInput: $createBoardCommentInput\n            boardId: $boardId\n        ){\n            _id\n            writer\n            contents\n            rating\n            createdAt\n        }\n    }\n": typeof types.CreateBoardCommentDocument,
    "\n    mutation likeBoard($boardId:ID!){\n        likeBoard(boardId:$boardId)\n}\n": typeof types.LikeBoardDocument,
    "\n    mutation dislikeBoard($boardId:ID!){\n        dislikeBoard(boardId:$boardId)\n}\n": typeof types.DislikeBoardDocument,
    "\n    query fetchBoard($boardId: ID!) {\n        fetchBoard(boardId: $boardId){\n            writer\n            title\n            contents\n            youtubeUrl\n            images\n            createdAt\n            likeCount\n            dislikeCount\n            boardAddress{zipcode, address, addressDetail}\n        }\n    }\n": typeof types.FetchBoardDocument,
    "\n    query fetchBoards($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int){\n        fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page){\n            _id\n            writer\n            title\n            createdAt\n            deletedAt\n        }\n    }\n": typeof types.FetchBoardsDocument,
    "\n    query fetchBoardsCount($endDate: DateTime, $startDate: DateTime, $search: String){\n        fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n    }\n": typeof types.FetchBoardsCountDocument,
    "\n    query \n        fetchBoardsAndCount($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int)\n        {\n        fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page) {\n            _id\n            writer\n            title\n            createdAt\n            deletedAt\n        }\n        fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n}\n": typeof types.FetchBoardsAndCountDocument,
    "\n    query fetchBoardComments($boardId: ID!) {\n        fetchBoardComments(boardId: $boardId) {\n            _id\n            writer\n            contents\n            rating\n            createdAt\n        }\n    }\n": typeof types.FetchBoardCommentsDocument,
    "\n    mutation uploadFile($file: Upload!){\n        uploadFile(file: $file){\n            url\n        }\n    }\n": typeof types.UploadFileDocument,
};
const documents: Documents = {
    "\n    mutation createBoard($createBoardInput: CreateBoardInput!){\n    createBoard(createBoardInput: $createBoardInput) {\n        _id\n        writer\n        title\n        contents\n    }\n    }\n": types.CreateBoardDocument,
    "\n    mutation deleteBoard($boardId:ID!){\n        deleteBoard(boardId:$boardId)\n    }\n": types.DeleteBoardDocument,
    "\n    mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!){\n    updateBoard(\n        updateBoardInput: $updateBoardInput\n        password: $password\n        boardId: $boardId\n    ){\n        _id\n    }\n}\n": types.UpdateBoardDocument,
    "\n    mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!){\n        createBoardComment(\n            createBoardCommentInput: $createBoardCommentInput\n            boardId: $boardId\n        ){\n            _id\n            writer\n            contents\n            rating\n            createdAt\n        }\n    }\n": types.CreateBoardCommentDocument,
    "\n    mutation likeBoard($boardId:ID!){\n        likeBoard(boardId:$boardId)\n}\n": types.LikeBoardDocument,
    "\n    mutation dislikeBoard($boardId:ID!){\n        dislikeBoard(boardId:$boardId)\n}\n": types.DislikeBoardDocument,
    "\n    query fetchBoard($boardId: ID!) {\n        fetchBoard(boardId: $boardId){\n            writer\n            title\n            contents\n            youtubeUrl\n            images\n            createdAt\n            likeCount\n            dislikeCount\n            boardAddress{zipcode, address, addressDetail}\n        }\n    }\n": types.FetchBoardDocument,
    "\n    query fetchBoards($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int){\n        fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page){\n            _id\n            writer\n            title\n            createdAt\n            deletedAt\n        }\n    }\n": types.FetchBoardsDocument,
    "\n    query fetchBoardsCount($endDate: DateTime, $startDate: DateTime, $search: String){\n        fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n    }\n": types.FetchBoardsCountDocument,
    "\n    query \n        fetchBoardsAndCount($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int)\n        {\n        fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page) {\n            _id\n            writer\n            title\n            createdAt\n            deletedAt\n        }\n        fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n}\n": types.FetchBoardsAndCountDocument,
    "\n    query fetchBoardComments($boardId: ID!) {\n        fetchBoardComments(boardId: $boardId) {\n            _id\n            writer\n            contents\n            rating\n            createdAt\n        }\n    }\n": types.FetchBoardCommentsDocument,
    "\n    mutation uploadFile($file: Upload!){\n        uploadFile(file: $file){\n            url\n        }\n    }\n": types.UploadFileDocument,
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
export function graphql(source: "\n    mutation createBoard($createBoardInput: CreateBoardInput!){\n    createBoard(createBoardInput: $createBoardInput) {\n        _id\n        writer\n        title\n        contents\n    }\n    }\n"): (typeof documents)["\n    mutation createBoard($createBoardInput: CreateBoardInput!){\n    createBoard(createBoardInput: $createBoardInput) {\n        _id\n        writer\n        title\n        contents\n    }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation deleteBoard($boardId:ID!){\n        deleteBoard(boardId:$boardId)\n    }\n"): (typeof documents)["\n    mutation deleteBoard($boardId:ID!){\n        deleteBoard(boardId:$boardId)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!){\n    updateBoard(\n        updateBoardInput: $updateBoardInput\n        password: $password\n        boardId: $boardId\n    ){\n        _id\n    }\n}\n"): (typeof documents)["\n    mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!){\n    updateBoard(\n        updateBoardInput: $updateBoardInput\n        password: $password\n        boardId: $boardId\n    ){\n        _id\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!){\n        createBoardComment(\n            createBoardCommentInput: $createBoardCommentInput\n            boardId: $boardId\n        ){\n            _id\n            writer\n            contents\n            rating\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!){\n        createBoardComment(\n            createBoardCommentInput: $createBoardCommentInput\n            boardId: $boardId\n        ){\n            _id\n            writer\n            contents\n            rating\n            createdAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation likeBoard($boardId:ID!){\n        likeBoard(boardId:$boardId)\n}\n"): (typeof documents)["\n    mutation likeBoard($boardId:ID!){\n        likeBoard(boardId:$boardId)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation dislikeBoard($boardId:ID!){\n        dislikeBoard(boardId:$boardId)\n}\n"): (typeof documents)["\n    mutation dislikeBoard($boardId:ID!){\n        dislikeBoard(boardId:$boardId)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query fetchBoard($boardId: ID!) {\n        fetchBoard(boardId: $boardId){\n            writer\n            title\n            contents\n            youtubeUrl\n            images\n            createdAt\n            likeCount\n            dislikeCount\n            boardAddress{zipcode, address, addressDetail}\n        }\n    }\n"): (typeof documents)["\n    query fetchBoard($boardId: ID!) {\n        fetchBoard(boardId: $boardId){\n            writer\n            title\n            contents\n            youtubeUrl\n            images\n            createdAt\n            likeCount\n            dislikeCount\n            boardAddress{zipcode, address, addressDetail}\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query fetchBoards($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int){\n        fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page){\n            _id\n            writer\n            title\n            createdAt\n            deletedAt\n        }\n    }\n"): (typeof documents)["\n    query fetchBoards($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int){\n        fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page){\n            _id\n            writer\n            title\n            createdAt\n            deletedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query fetchBoardsCount($endDate: DateTime, $startDate: DateTime, $search: String){\n        fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n    }\n"): (typeof documents)["\n    query fetchBoardsCount($endDate: DateTime, $startDate: DateTime, $search: String){\n        fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query \n        fetchBoardsAndCount($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int)\n        {\n        fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page) {\n            _id\n            writer\n            title\n            createdAt\n            deletedAt\n        }\n        fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n}\n"): (typeof documents)["\n    query \n        fetchBoardsAndCount($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int)\n        {\n        fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page) {\n            _id\n            writer\n            title\n            createdAt\n            deletedAt\n        }\n        fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query fetchBoardComments($boardId: ID!) {\n        fetchBoardComments(boardId: $boardId) {\n            _id\n            writer\n            contents\n            rating\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    query fetchBoardComments($boardId: ID!) {\n        fetchBoardComments(boardId: $boardId) {\n            _id\n            writer\n            contents\n            rating\n            createdAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation uploadFile($file: Upload!){\n        uploadFile(file: $file){\n            url\n        }\n    }\n"): (typeof documents)["\n    mutation uploadFile($file: Upload!){\n        uploadFile(file: $file){\n            url\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;