import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// A percentage off the course price for a candidate who pays in full (2026-11-18).
// Managed at /admin/discount-codes. Codes are stored upper-case.
export interface DiscountCodeAttributes {
  id: string;
  code: string;
  percentOff: number;
  description: string | null;
  active: boolean;
  expiresAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type DiscountCodeCreationAttributes = Optional<
  DiscountCodeAttributes,
  "id" | "description" | "active" | "expiresAt" | "createdAt" | "updatedAt"
>;

export class DiscountCode
  extends Model<DiscountCodeAttributes, DiscountCodeCreationAttributes>
  implements DiscountCodeAttributes
{
  declare id: string;
  declare code: string;
  declare percentOff: number;
  declare description: string | null;
  declare active: boolean;
  declare expiresAt: Date | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initDiscountCodeModel(sequelize: Sequelize) {
  DiscountCode.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      code: { type: DataTypes.STRING(40), allowNull: false, unique: true },
      percentOff: { type: DataTypes.INTEGER, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
      active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      expiresAt: { type: DataTypes.DATE, allowNull: true },
    },
    { sequelize, tableName: "discount_codes", underscored: true },
  );
}
