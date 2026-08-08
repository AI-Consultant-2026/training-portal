import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface LeadAttributes {
  id: string;
  name: string;
  email: string;
  course: string;
  createdAt?: Date;
}

export type LeadCreationAttributes = Optional<LeadAttributes, "id" | "createdAt">;

export class Lead extends Model<LeadAttributes, LeadCreationAttributes> implements LeadAttributes {
  declare id: string;
  declare name: string;
  declare email: string;
  declare course: string;
  declare readonly createdAt: Date;
}

export function initLeadModel(sequelize: Sequelize) {
  Lead.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      course: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Lead",
      tableName: "leads",
      underscored: true,
      timestamps: true,
      updatedAt: false,
    },
  );
  return Lead;
}
