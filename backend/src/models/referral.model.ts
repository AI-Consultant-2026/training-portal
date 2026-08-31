import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { DEFAULT_REWARD_TYPE, REFERRER_REWARD_NGN, REFEREE_REWARD_NGN } from "../constants/referral";

// pending  -> code was used at registration, referred student hasn't paid yet
// qualified -> referred student's first course payment is confirmed; both rewards accrue
// void     -> disqualified by an admin (fraud, self-referral discovered, refund, etc.)
export type ReferralStatus = "pending" | "qualified" | "void";
export type ReferralRewardStatus = "pending" | "issued";

export interface ReferralAttributes {
  id: string;
  referrerId: string;
  refereeId: string;
  code: string;
  status: ReferralStatus;
  qualifiedAt: Date | null;
  qualifyingEnrollmentId: string | null;
  referrerRewardType: string;
  referrerRewardAmountNgn: number;
  referrerRewardStatus: ReferralRewardStatus;
  referrerRewardIssuedAt: Date | null;
  refereeRewardType: string;
  refereeRewardAmountNgn: number;
  refereeRewardStatus: ReferralRewardStatus;
  refereeRewardIssuedAt: Date | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type ReferralCreationAttributes = Optional<
  ReferralAttributes,
  | "id"
  | "status"
  | "qualifiedAt"
  | "qualifyingEnrollmentId"
  | "referrerRewardType"
  | "referrerRewardAmountNgn"
  | "referrerRewardStatus"
  | "referrerRewardIssuedAt"
  | "refereeRewardType"
  | "refereeRewardAmountNgn"
  | "refereeRewardStatus"
  | "refereeRewardIssuedAt"
  | "notes"
  | "createdAt"
  | "updatedAt"
>;

export class Referral
  extends Model<ReferralAttributes, ReferralCreationAttributes>
  implements ReferralAttributes
{
  declare id: string;
  declare referrerId: string;
  declare refereeId: string;
  declare code: string;
  declare status: ReferralStatus;
  declare qualifiedAt: Date | null;
  declare qualifyingEnrollmentId: string | null;
  declare referrerRewardType: string;
  declare referrerRewardAmountNgn: number;
  declare referrerRewardStatus: ReferralRewardStatus;
  declare referrerRewardIssuedAt: Date | null;
  declare refereeRewardType: string;
  declare refereeRewardAmountNgn: number;
  declare refereeRewardStatus: ReferralRewardStatus;
  declare refereeRewardIssuedAt: Date | null;
  declare notes: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initReferralModel(sequelize: Sequelize) {
  Referral.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      referrerId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "referrer_id",
        references: { model: "users", key: "id" },
      },
      refereeId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        field: "referee_id",
        references: { model: "users", key: "id" },
      },
      code: { type: DataTypes.STRING, allowNull: false },
      // Plain strings with app-level (zod) validation rather than DB enums, matching
      // partners.status -- keeps this still-settling vocabulary out of ALTER TYPE
      // migration territory.
      status: { type: DataTypes.STRING, allowNull: false, defaultValue: "pending" },
      qualifiedAt: { type: DataTypes.DATE, allowNull: true, field: "qualified_at" },
      qualifyingEnrollmentId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: "qualifying_enrollment_id",
        references: { model: "enrollments", key: "id" },
      },
      referrerRewardType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: DEFAULT_REWARD_TYPE,
        field: "referrer_reward_type",
      },
      referrerRewardAmountNgn: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: REFERRER_REWARD_NGN,
        field: "referrer_reward_amount_ngn",
      },
      referrerRewardStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
        field: "referrer_reward_status",
      },
      referrerRewardIssuedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "referrer_reward_issued_at",
      },
      refereeRewardType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: DEFAULT_REWARD_TYPE,
        field: "referee_reward_type",
      },
      refereeRewardAmountNgn: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: REFEREE_REWARD_NGN,
        field: "referee_reward_amount_ngn",
      },
      refereeRewardStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
        field: "referee_reward_status",
      },
      refereeRewardIssuedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "referee_reward_issued_at",
      },
      notes: { type: DataTypes.TEXT, allowNull: true },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "updated_at",
      },
    },
    {
      sequelize,
      modelName: "Referral",
      tableName: "referrals",
      underscored: true,
      timestamps: true,
    },
  );

  return Referral;
}
