import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export type PaymentMethod = "card" | "bank_transfer";
export type PaymentStatus = "pending" | "succeeded" | "failed";

export interface PaymentAttributes {
  id: string;
  enrollmentId: string;
  studentId: string;
  method: PaymentMethod;
  status: PaymentStatus;
  currency: string;
  amount: number;
  baseAmountNgn: number;
  billingCountry: string;
  cardBrand: string | null;
  cardLast4: string | null;
  gatewayReference: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type PaymentCreationAttributes = Optional<
  PaymentAttributes,
  | "id"
  | "status"
  | "cardBrand"
  | "cardLast4"
  | "gatewayReference"
  | "notes"
  | "createdAt"
  | "updatedAt"
>;

export class Payment
  extends Model<PaymentAttributes, PaymentCreationAttributes>
  implements PaymentAttributes
{
  declare id: string;
  declare enrollmentId: string;
  declare studentId: string;
  declare method: PaymentMethod;
  declare status: PaymentStatus;
  declare currency: string;
  declare amount: number;
  declare baseAmountNgn: number;
  declare billingCountry: string;
  declare cardBrand: string | null;
  declare cardLast4: string | null;
  declare gatewayReference: string | null;
  declare notes: string | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

export function initPaymentModel(sequelize: Sequelize) {
  Payment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      enrollmentId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "enrollment_id",
        references: { model: "enrollments", key: "id" },
      },
      studentId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "student_id",
        references: { model: "users", key: "id" },
      },
      method: {
        type: DataTypes.ENUM("card", "bank_transfer"),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "succeeded", "failed"),
        allowNull: false,
        defaultValue: "pending",
      },
      currency: { type: DataTypes.STRING(3), allowNull: false },
      amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
      baseAmountNgn: { type: DataTypes.DECIMAL(12, 2), allowNull: false, field: "base_amount_ngn" },
      billingCountry: { type: DataTypes.STRING, allowNull: false, field: "billing_country" },
      cardBrand: { type: DataTypes.STRING, allowNull: true, field: "card_brand" },
      cardLast4: { type: DataTypes.STRING(4), allowNull: true, field: "card_last4" },
      gatewayReference: { type: DataTypes.STRING, allowNull: true, field: "gateway_reference" },
      notes: { type: DataTypes.TEXT, allowNull: true },
      createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "updated_at" },
    },
    {
      sequelize,
      modelName: "Payment",
      tableName: "payments",
      underscored: true,
      timestamps: true,
    },
  );

  return Payment;
}
