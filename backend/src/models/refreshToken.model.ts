import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface RefreshTokenAttributes {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
  replacedByTokenId: string | null;
  createdAt?: Date;
}

export type RefreshTokenCreationAttributes = Optional<
  RefreshTokenAttributes,
  "id" | "revokedAt" | "replacedByTokenId" | "createdAt"
>;

export class RefreshToken
  extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes>
  implements RefreshTokenAttributes
{
  declare id: string;
  declare userId: string;
  declare tokenHash: string;
  declare expiresAt: Date;
  declare revokedAt: Date | null;
  declare replacedByTokenId: string | null;
  declare readonly createdAt: Date;
}

export function initRefreshTokenModel(sequelize: Sequelize) {
  RefreshToken.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "user_id",
        references: { model: "users", key: "id" },
      },
      tokenHash: { type: DataTypes.STRING, allowNull: false, field: "token_hash" },
      expiresAt: { type: DataTypes.DATE, allowNull: false, field: "expires_at" },
      revokedAt: { type: DataTypes.DATE, allowNull: true, field: "revoked_at" },
      replacedByTokenId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: "replaced_by_token_id",
      },
    },
    {
      sequelize,
      modelName: "RefreshToken",
      tableName: "refresh_tokens",
      underscored: true,
      timestamps: true,
      updatedAt: false,
    },
  );

  return RefreshToken;
}
