import { Sequelize, DataTypes, Model, Optional } from "sequelize";

// Define interface for Ticket attributes
interface TicketAttributes {
  id?: number;
  title: string;
  description?: string;
  category?: string;
  priority?: number;
  progress?: number;
  status?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define optional fields for creating a new Ticket
interface TicketCreationAttributes extends Optional<TicketAttributes, "id"> {}

// Extend Sequelize Model with Ticket Attributes
class Ticket
  extends Model<TicketAttributes, TicketCreationAttributes>
  implements TicketAttributes
{
  public id!: number;
  public title!: string;
  public description?: string;
  public category?: string;
  public priority?: number;
  public progress?: number;
  public status?: string;
  public active?: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Connect to PostgreSQL
const sequelize = new Sequelize(process.env.POSTGRES_URI as string, {
  dialect: "postgres",
  logging: false, // Disable logging (optional)
});

// Define the Ticket model
Ticket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.STRING,
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    progress: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Open",
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "tickets",
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Sync the model with the database
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL");
    await sequelize.sync(); // Creates the table if it doesn't exist
  } catch (error) {
    console.error("Database connection error:", error);
  }
})();

export default Ticket;
