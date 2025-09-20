import { DataSource } from "typeorm";
import { Board } from "@/entities/board.entity.js";
import dotenv from "dotenv";
dotenv.config();

const DBconfig = new DataSource({
  type: "postgres",
  host: process.env.DB_POSTGRES_HOST ?? "",
  port: Number(process.env.DB_POSTGRES_PORT) ?? 5002,
  username: process.env.DB_POSTGRES_USERNAME ?? "",
  password: process.env.DB_POSTGRES_PASSWORD ?? "",
  database: process.env.DB_POSTGRES_DATABASE ?? "",
  entities: [Board],
  synchronize: true,
  logging: true,
  dropSchema: true, // db초기화
});

export const dbconnect = async () => {
  try {
    await DBconfig.initialize();
    console.log("DB접속성공");
  } catch (error) {
    console.log("DB접속실패");
    console.log(error);
  }
};
