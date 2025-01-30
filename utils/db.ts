import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.POSTGRES_URI as string, {
  dialect: "postgres",
  logging: false,
});

export default sequelize;
