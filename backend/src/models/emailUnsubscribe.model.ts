import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// An address that opted out of /admin/email-client campaigns. `email` is always stored
// lowercased. `source` records where the opt-out came from ("email-client").
export interface EmailUnsubscribeAttributes {
  id: string;
  email: string;
  source: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type EmailUnsubscribeCreationAttributes = Optional<EmailUnsubscribeAttributes, "id" | "createdAt" | "updatedAt">;

export class EmailUnsubscribe
  extends Model<EmailUnsubscribeAttributes, EmailUnsubscribeCreationAttributes>
  implements EmailUnsubscribeAttributes
{
  declare id: string;
  declare email: string;
  declare source: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initEmailUnsubscribeModel(sequelize: Sequelize) {
  EmailUnsubscribe.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      source: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, tableName: "email_unsubscribes", underscored: true },
  );
}
