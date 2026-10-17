import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// A commission sales rep (see salesRep.service.ts). Dates are calendar dates (YYYY-MM-DD).
export interface SalesRepAttributes {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  code: string;
  startedAt: string;
  endedAt: string | null;
  notes: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type SalesRepCreationAttributes = Optional<
  SalesRepAttributes,
  "id" | "phone" | "endedAt" | "notes" | "createdAt" | "updatedAt"
>;

export class SalesRep extends Model<SalesRepAttributes, SalesRepCreationAttributes> implements SalesRepAttributes {
  declare id: string;
  declare name: string;
  declare email: string;
  declare phone: string | null;
  declare code: string;
  declare startedAt: string;
  declare endedAt: string | null;
  declare notes: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initSalesRepModel(sequelize: Sequelize) {
  SalesRep.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: true },
      code: { type: DataTypes.STRING, allowNull: false, unique: true },
      startedAt: { type: DataTypes.DATEONLY, allowNull: false },
      endedAt: { type: DataTypes.DATEONLY, allowNull: true },
      notes: { type: DataTypes.TEXT, allowNull: true },
    },
    { sequelize, tableName: "sales_reps", underscored: true },
  );
}

// The student a rep brought in, recorded when the student registers with the rep's code.
export interface SalesRepStudentAttributes {
  id: string;
  salesRepId: string;
  studentId: string;
  code: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class SalesRepStudent
  extends Model<SalesRepStudentAttributes, Optional<SalesRepStudentAttributes, "id" | "createdAt" | "updatedAt">>
  implements SalesRepStudentAttributes
{
  declare id: string;
  declare salesRepId: string;
  declare studentId: string;
  declare code: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initSalesRepStudentModel(sequelize: Sequelize) {
  SalesRepStudent.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      salesRepId: { type: DataTypes.UUID, allowNull: false },
      studentId: { type: DataTypes.UUID, allowNull: false, unique: true },
      code: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, tableName: "sales_rep_students", underscored: true },
  );
}

export const SALES_REP_PAYMENT_KINDS = ["commission", "allowance", "other"] as const;
export type SalesRepPaymentKind = (typeof SALES_REP_PAYMENT_KINDS)[number];

// A payment to a rep. Only "commission" payments count against the balance owed.
export interface SalesRepPaymentAttributes {
  id: string;
  salesRepId: string;
  kind: SalesRepPaymentKind;
  amountNgn: number;
  paidOn: string;
  note: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class SalesRepPayment
  extends Model<
    SalesRepPaymentAttributes,
    Optional<SalesRepPaymentAttributes, "id" | "note" | "createdAt" | "updatedAt">
  >
  implements SalesRepPaymentAttributes
{
  declare id: string;
  declare salesRepId: string;
  declare kind: SalesRepPaymentKind;
  declare amountNgn: number;
  declare paidOn: string;
  declare note: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initSalesRepPaymentModel(sequelize: Sequelize) {
  SalesRepPayment.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      salesRepId: { type: DataTypes.UUID, allowNull: false },
      kind: { type: DataTypes.STRING, allowNull: false },
      amountNgn: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
      paidOn: { type: DataTypes.DATEONLY, allowNull: false },
      note: { type: DataTypes.TEXT, allowNull: true },
    },
    { sequelize, tableName: "sales_rep_payments", underscored: true },
  );
}
