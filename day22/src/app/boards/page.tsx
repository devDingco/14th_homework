"use client";

import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_BOARD = gql`
  mutation createBoard(
    $writer: String!
    $password: String!
    $title: String!
    $contents: String!
  ) {
    createBoard(
      createBoardInput: {
        writer: $writer
        password: $password
        title: $title
        contents: $contents
      }
    ) {
      _id
      writer
      title
      contents
    }
  }
`;
