'use client';

import { gql } from '@apollo/client';

const FETCH_BOARDS_PAGINATION = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;
