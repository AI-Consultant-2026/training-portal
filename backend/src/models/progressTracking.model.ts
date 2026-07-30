import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface ProgressTrackingAttributes {
  id: string;
  studentId: string;
  lessonId: string;
  completedAt: Date;
}

export type ProgressTrackingCreationAttributes = Optional<
  ProgressTrackingAttributes,
  "id" | "completedAt"
>;

export class ProgressTracking
  extends Model<ProgressTrackingAttributes, ProgressTrackingCreationAttributes>
  implements ProgressTrackingAttributes
{
  declare id: string;
  declare studentId: string;
  declare lessonId: string;
  declare completedAt: Date;
}

export function initProgressTrackingModel(sequelize: Sequelize) {
  ProgressTracking.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      studentId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "student_id",
        references: { model: "users", key: "id" },
      },
      lessonId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "lesson_id",
        references: { model: "lessons", key: "id" },
      },
      completedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "completed_at",
      },
    },
    {
      sequelize,
      modelName: "ProgressTracking",
      tableName: "progress_tracking",
      underscored: true,
      timestamps: false,
    },
  );

  return ProgressTracking;
}
