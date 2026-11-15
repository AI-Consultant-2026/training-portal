import { DataTypes, Model, Sequelize } from "sequelize";

// Small settings Paleon edits in /admin (2026-11-15), see migration
// 20261115010000-university-seats. One row per key; the value is JSON.
export interface AppSettingAttributes {
  key: string;
  value: unknown;
  createdAt?: Date;
  updatedAt?: Date;
}

export class AppSetting extends Model<AppSettingAttributes> implements AppSettingAttributes {
  declare key: string;
  declare value: unknown;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initAppSettingModel(sequelize: Sequelize) {
  AppSetting.init(
    {
      key: { type: DataTypes.STRING(100), primaryKey: true },
      value: { type: DataTypes.JSONB, allowNull: false },
    },
    { sequelize, modelName: "AppSetting", tableName: "app_settings", underscored: true },
  );
}
