import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface CapstoneAttributes {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  dueDate: Date | null;
  fileRequired: boolean;
  gradingRubric: Record<string, unknown> | null;
  pointsTotal: number;
  isEnabled: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CapstoneCreationAttributes = Optional<
  CapstoneAttributes,
  | "id"
  | "description"
  | "dueDate"
  | "fileRequired"
  | "gradingRubric"
  | "pointsTotal"
  | "isEnabled"
  | "createdAt"
  | "updatedAt"
>;

export class Capstone
  extends Model<CapstoneAttributes, CapstoneCreationAttributes>
  implements CapstoneAttributes
{
  declare id: string;
  declare courseId: string;
  declare title: string;
  declare description: string | null;
  declare dueDate: Date | null;
  declare fileRequired: boolean;
  declare gradingRubric: Record<string, unknown> | null;
  declare pointsTotal: number;
  declare isEnabled: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initCapstoneModel(sequelize: Sequelize) {
  Capstone.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      courseId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "course_id",
        references: { model: "courses", key: "id" },
      },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      dueDate: { type: DataTypes.DATE, allowNull: true, field: "due_date" },
      fileRequired: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "file_required",
      },
      gradingRubric: { type: DataTypes.JSONB, allowNull: true, field: "grading_rubric" },
      pointsTotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 100,
        field: "points_total",
      },
      isEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "is_enabled",
      },
    },
    {
      sequelize,
      modelName: "Capstone",
      tableName: "capstones",
      underscored: true,
      timestamps: true,
    },
  );

  return Capstone;
}
