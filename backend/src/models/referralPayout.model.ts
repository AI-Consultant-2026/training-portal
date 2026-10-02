import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// One VTpass airtime/data send for a referral reward (see referralPayout.service.ts).
// processing -> sent, VTpass hasn't confirmed delivery yet (or we couldn't tell); requery it
// delivered  -> VTpass confirmed delivery; the referral's reward is marked issued
// failed     -> VTpass rejected or reversed it; nothing was delivered, safe to retry
export type ReferralPayoutStatus = "processing" | "delivered" | "failed";

export interface ReferralPayoutAttributes {
  id: string;
  referralId: string;
  party: "referrer" | "referee";
  kind: "airtime" | "data";
  network: string;
  phone: string;
  amountNgn: number;
  variationCode: string | null;
  variationName: string | null;
  requestId: string;
  status: ReferralPayoutStatus;
  providerCode: string | null;
  providerMessage: string | null;
  providerTransactionId: string | null;
  providerResponse: unknown;
  live: boolean;
  sentById: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ReferralPayoutCreationAttributes = Optional<
  ReferralPayoutAttributes,
  | "id"
  | "variationCode"
  | "variationName"
  | "providerCode"
  | "providerMessage"
  | "providerTransactionId"
  | "providerResponse"
  | "sentById"
  | "createdAt"
  | "updatedAt"
>;

export class ReferralPayout
  extends Model<ReferralPayoutAttributes, ReferralPayoutCreationAttributes>
  implements ReferralPayoutAttributes
{
  declare id: string;
  declare referralId: string;
  declare party: "referrer" | "referee";
  declare kind: "airtime" | "data";
  declare network: string;
  declare phone: string;
  declare amountNgn: number;
  declare variationCode: string | null;
  declare variationName: string | null;
  declare requestId: string;
  declare status: ReferralPayoutStatus;
  declare providerCode: string | null;
  declare providerMessage: string | null;
  declare providerTransactionId: string | null;
  declare providerResponse: unknown;
  declare live: boolean;
  declare sentById: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initReferralPayoutModel(sequelize: Sequelize) {
  ReferralPayout.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      referralId: { type: DataTypes.UUID, allowNull: false },
      party: { type: DataTypes.STRING, allowNull: false },
      kind: { type: DataTypes.STRING, allowNull: false },
      network: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false },
      amountNgn: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
      variationCode: { type: DataTypes.STRING, allowNull: true },
      variationName: { type: DataTypes.STRING, allowNull: true },
      requestId: { type: DataTypes.STRING, allowNull: false, unique: true },
      status: { type: DataTypes.STRING, allowNull: false },
      providerCode: { type: DataTypes.STRING, allowNull: true },
      providerMessage: { type: DataTypes.TEXT, allowNull: true },
      providerTransactionId: { type: DataTypes.STRING, allowNull: true },
      providerResponse: { type: DataTypes.JSONB, allowNull: true },
      live: { type: DataTypes.BOOLEAN, allowNull: false },
      sentById: { type: DataTypes.UUID, allowNull: true },
    },
    { sequelize, tableName: "referral_payouts", underscored: true },
  );
}
