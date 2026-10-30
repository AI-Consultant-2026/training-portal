import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Someone who joined a "launching soon" country's waitlist on its homepage (/za, /ke, /gh,
// 2026-10-30). `country` is the ISO code of the page they signed up on.
export interface WaitlistSignupAttributes {
  id: string;
  country: string;
  whatsapp: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type WaitlistSignupCreationAttributes = Optional<WaitlistSignupAttributes, "id" | "createdAt" | "updatedAt">;

export class WaitlistSignup
  extends Model<WaitlistSignupAttributes, WaitlistSignupCreationAttributes>
  implements WaitlistSignupAttributes
{
  declare id: string;
  declare country: string;
  declare whatsapp: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initWaitlistSignupModel(sequelize: Sequelize) {
  WaitlistSignup.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      country: { type: DataTypes.STRING(2), allowNull: false },
      whatsapp: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, tableName: "waitlist_signups", underscored: true },
  );
}
