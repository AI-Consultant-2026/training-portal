import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Corporate online orders (2026-11-12), see migration 20261112070000-create-corporate-orders.

export type CorporateOrderStatus = "pending" | "paid" | "invoice_requested" | "failed";

export interface CorporateOrderAttributes {
  id: string;
  txRef: string;
  status: CorporateOrderStatus;
  organisation: string;
  contactName: string;
  contactEmail: string;
  phone: string | null;
  region: string;
  buyerCountry: string | null;
  programme: string;
  seats: number;
  currency: string;
  unitPrice: number;
  discountPercent: number;
  total: number;
  clientId: string | null;
  flutterwaveTransactionId: string | null;
  paidAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

type CreationAttributes = Optional<
  CorporateOrderAttributes,
  | "id"
  | "status"
  | "phone"
  | "buyerCountry"
  | "discountPercent"
  | "clientId"
  | "flutterwaveTransactionId"
  | "paidAt"
  | "createdAt"
  | "updatedAt"
>;

export class CorporateOrder extends Model<CorporateOrderAttributes, CreationAttributes> implements CorporateOrderAttributes {
  declare id: string;
  declare txRef: string;
  declare status: CorporateOrderStatus;
  declare organisation: string;
  declare contactName: string;
  declare contactEmail: string;
  declare phone: string | null;
  declare region: string;
  declare buyerCountry: string | null;
  declare programme: string;
  declare seats: number;
  declare currency: string;
  declare unitPrice: number;
  declare discountPercent: number;
  declare total: number;
  declare clientId: string | null;
  declare flutterwaveTransactionId: string | null;
  declare paidAt: Date | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

// DECIMAL comes back from Postgres as a string; read it as a number.
const decimal = (field: string) => ({
  type: DataTypes.DECIMAL(14, 2),
  allowNull: false,
  get(this: Model) {
    const raw = this.getDataValue(field as never) as unknown;
    return raw === null || raw === undefined ? raw : Number(raw);
  },
});

export function initCorporateOrderModel(sequelize: Sequelize) {
  CorporateOrder.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      txRef: { type: DataTypes.STRING, allowNull: false, unique: true },
      status: { type: DataTypes.STRING, allowNull: false, defaultValue: "pending" },
      organisation: { type: DataTypes.STRING, allowNull: false },
      contactName: { type: DataTypes.STRING, allowNull: false },
      contactEmail: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: true },
      region: { type: DataTypes.STRING(4), allowNull: false },
      buyerCountry: { type: DataTypes.STRING, allowNull: true },
      programme: { type: DataTypes.STRING, allowNull: false },
      seats: { type: DataTypes.INTEGER, allowNull: false },
      currency: { type: DataTypes.STRING(3), allowNull: false },
      unitPrice: decimal("unitPrice"),
      discountPercent: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      total: decimal("total"),
      clientId: { type: DataTypes.UUID, allowNull: true },
      flutterwaveTransactionId: { type: DataTypes.STRING, allowNull: true },
      paidAt: { type: DataTypes.DATE, allowNull: true },
    },
    { sequelize, modelName: "CorporateOrder", tableName: "corporate_orders", underscored: true },
  );
}
