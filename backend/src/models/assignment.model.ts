import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface AssignmentAttributes {
  id: string;
  moduleId: string;
  title: string;
  description: string | null;
  dueDate: Date | null;
  fileRequired: boolean;
  gradingRubric: Record<string, unknown> | null;
  pointsTotal: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type AssignmentCreationAttributes = Optional<
  AssignmentAttributes,
  "id" | "description" | "dueDate" | "fileRequired" | "gradingRubric" | "pointsTotal" | "createdAt" | "updatedAt"
>;

export class Assignment
  extends Model<AssignmentAttributes, AssignmentCreationAttributes>
  implements AssignmentAttributes
{
  declare id: string;
  declare moduleId: string;
  declare title: string;
  declare description: string | null;
  declare dueDate: Date | null;
  declare fileRequired: boolean;
  declare gradingRubric: Record<string, unknown> | null;
  declare pointsTotal: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initAssignmentModel(sequelize: Sequelize) {
  Assignment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      moduleId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "module_id",
        references: { model: "modules", key: "id" },
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
    },
    {
      sequelize,
      modelName: "Assignment",
      tableName: "assignments",
      underscored: true,
      timestamps: true,
    },
  );

  return Assignment;
}
