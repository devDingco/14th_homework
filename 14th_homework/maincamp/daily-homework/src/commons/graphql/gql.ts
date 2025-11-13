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
    "\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n      picture\n    }\n  }\n": typeof types.FetchUserLoggedInDocument,
    "\n  mutation createPointTransactionOfLoading($paymentId: ID!) {\n    createPointTransactionOfLoading(paymentId: $paymentId) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      createdAt\n    }\n  }\n": typeof types.CreatePointTransactionOfLoadingDocument,
    "\n  query fetchTravelproduct($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      images\n      pickedCount\n      tags\n      seller {\n        _id\n        name\n        picture\n      }\n      travelproductAddress {\n        _id\n        address\n        addressDetail\n        lat\n        lng\n        zipcode\n      }\n    }\n  }\n": typeof types.FetchTravelproductDocument,
    "\n  query fetchTravelproducts($page: Int, $search: String, $isSoldout: Boolean) {\n    fetchTravelproducts(page: $page, search: $search, isSoldout: $isSoldout) {\n      _id\n      name\n      remarks\n      contents\n      price\n      images\n      pickedCount\n      tags\n      seller {\n        _id\n        name\n        picture\n      }\n    }\n  }\n": typeof types.FetchTravelproductsDocument,
    "\n  query fetchBoardComments($boardId: ID!, $page: Int) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n": typeof types.FetchBoardCommentsDocument,
    "\n  mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {\n    createBoardComment(createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {\n      _id\n      contents\n      rating\n      createdAt\n    }\n  }\n": typeof types.CreateBoardCommentDocument,
    "\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String!\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n      contents\n      rating\n      updatedAt\n    }\n  }\n": typeof types.UpdateBoardCommentDocument,
    "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      images\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.FetchBoardDocument,
    "\n  query fetchBoards($page: Int, $search: String) {\n    fetchBoards(page: $page, search: $search) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": typeof types.FetchBoardsDocument,
    "\n  query fetchBoardsCount($search: String) {\n    fetchBoardsCount(search: $search)\n  }\n": typeof types.FetchBoardsCountDocument,
    "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": typeof types.DeleteBoardDocument,
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      images\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateBoardDocument,
    "\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {\n    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      images\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      updatedAt\n    }\n  }\n": typeof types.UpdateBoardDocument,
    "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n": typeof types.UploadFileDocument,
    "\n  mutation loginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n": typeof types.LoginUserDocument,
    "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      name\n    }\n  }\n": typeof types.CreateUserDocument,
};
const documents: Documents = {
    "\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n      picture\n    }\n  }\n": types.FetchUserLoggedInDocument,
    "\n  mutation createPointTransactionOfLoading($paymentId: ID!) {\n    createPointTransactionOfLoading(paymentId: $paymentId) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      createdAt\n    }\n  }\n": types.CreatePointTransactionOfLoadingDocument,
    "\n  query fetchTravelproduct($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      images\n      pickedCount\n      tags\n      seller {\n        _id\n        name\n        picture\n      }\n      travelproductAddress {\n        _id\n        address\n        addressDetail\n        lat\n        lng\n        zipcode\n      }\n    }\n  }\n": types.FetchTravelproductDocument,
    "\n  query fetchTravelproducts($page: Int, $search: String, $isSoldout: Boolean) {\n    fetchTravelproducts(page: $page, search: $search, isSoldout: $isSoldout) {\n      _id\n      name\n      remarks\n      contents\n      price\n      images\n      pickedCount\n      tags\n      seller {\n        _id\n        name\n        picture\n      }\n    }\n  }\n": types.FetchTravelproductsDocument,
    "\n  query fetchBoardComments($boardId: ID!, $page: Int) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n": types.FetchBoardCommentsDocument,
    "\n  mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {\n    createBoardComment(createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {\n      _id\n      contents\n      rating\n      createdAt\n    }\n  }\n": types.CreateBoardCommentDocument,
    "\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String!\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n      contents\n      rating\n      updatedAt\n    }\n  }\n": types.UpdateBoardCommentDocument,
    "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      images\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.FetchBoardDocument,
    "\n  query fetchBoards($page: Int, $search: String) {\n    fetchBoards(page: $page, search: $search) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.FetchBoardsDocument,
    "\n  query fetchBoardsCount($search: String) {\n    fetchBoardsCount(search: $search)\n  }\n": types.FetchBoardsCountDocument,
    "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": types.DeleteBoardDocument,
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      images\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateBoardDocument,
    "\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {\n    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      images\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      updatedAt\n    }\n  }\n": types.UpdateBoardDocument,
    "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n": types.UploadFileDocument,
    "\n  mutation loginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      name\n    }\n  }\n": types.CreateUserDocument,
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
export function graphql(source: "\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n      picture\n    }\n  }\n"): (typeof documents)["\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n      picture\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createPointTransactionOfLoading($paymentId: ID!) {\n    createPointTransactionOfLoading(paymentId: $paymentId) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation createPointTransactionOfLoading($paymentId: ID!) {\n    createPointTransactionOfLoading(paymentId: $paymentId) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproduct($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      images\n      pickedCount\n      tags\n      seller {\n        _id\n        name\n        picture\n      }\n      travelproductAddress {\n        _id\n        address\n        addressDetail\n        lat\n        lng\n        zipcode\n      }\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproduct($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      images\n      pickedCount\n      tags\n      seller {\n        _id\n        name\n        picture\n      }\n      travelproductAddress {\n        _id\n        address\n        addressDetail\n        lat\n        lng\n        zipcode\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproducts($page: Int, $search: String, $isSoldout: Boolean) {\n    fetchTravelproducts(page: $page, search: $search, isSoldout: $isSoldout) {\n      _id\n      name\n      remarks\n      contents\n      price\n      images\n      pickedCount\n      tags\n      seller {\n        _id\n        name\n        picture\n      }\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproducts($page: Int, $search: String, $isSoldout: Boolean) {\n    fetchTravelproducts(page: $page, search: $search, isSoldout: $isSoldout) {\n      _id\n      name\n      remarks\n      contents\n      price\n      images\n      pickedCount\n      tags\n      seller {\n        _id\n        name\n        picture\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardComments($boardId: ID!, $page: Int) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardComments($boardId: ID!, $page: Int) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {\n    createBoardComment(createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {\n      _id\n      contents\n      rating\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {\n    createBoardComment(createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {\n      _id\n      contents\n      rating\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String!\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n      contents\n      rating\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String!\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n      contents\n      rating\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      images\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      images\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards($page: Int, $search: String) {\n    fetchBoards(page: $page, search: $search) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards($page: Int, $search: String) {\n    fetchBoards(page: $page, search: $search) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardsCount($search: String) {\n    fetchBoardsCount(search: $search)\n  }\n"): (typeof documents)["\n  query fetchBoardsCount($search: String) {\n    fetchBoardsCount(search: $search)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      images\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n      images\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {\n    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      images\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {\n    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      images\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n"): (typeof documents)["\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation loginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation loginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      name\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;