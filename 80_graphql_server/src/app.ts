// API-DOCS

import { ApolloServer } from "@apollo/server";
import { Board } from "./entities/board.entity.js";
import { randomUUID } from "crypto";

const typeDefs = `#graphql
  type MyBoard{
    id: String
    writer: String
    title: String
    contents: String
  }

  type Query {
    fetchBoards: [MyBoard]
    fetchBoard(id: String!): MyBoard
  }

  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }

  input UpdateBoardInput {
    writer: String
    title: String
    contents: String
  }

  type Mutation {
    # createBoard(writer: String, title: String, contents: String): String
    createBoard(CreateBoardInput: CreateBoardInput): String
    updateBoard(id: String!, UpdateBoardInput: UpdateBoardInput): String
    deleteBoard(id: String!): String

  }
`;

// API-RESOLVERS
const resolvers = {
  Query: {
    fetchBoards: async () => {
      const result = await Board.find();
      return result;
    },

    fetchBoard: async (parent: any, args: any, context: any, info: any) => {
      const result = await Board.findOne({ where: { id: args.id } });
      return result;
    },
  },

  Mutation: {
    createBoard: async (parent: any, args: any, context: any, info: any) => {
      const { writer, title, contents } = args.CreateBoardInput;

      // const board = new Board(randomUUID(), writer, title, contents);
      // await board.save();
      await Board.insert({ writer, title, contents });
      return "등록성공";
    },

    updateBoard: async (parent: any, args: any, context: any, info: any) => {
      await Board.update({ id: args.id }, { ...args.UpdateBoardInput });
      return "수정성공";
    },

    deleteBoard: async (parent: any, args: any, context: any, info: any) => {
      // Hard Delete
      // await Board.delete({ id: args.id });

      // Soft Delete
      await Board.update({ id: args.id }, { isDeleted: true });
      await Board.update({ id: args.id }, { deletedAt: new Date() });
      return "삭제성공";
    },
  },
};

export const app = new ApolloServer({
  typeDefs,
  resolvers,
});
