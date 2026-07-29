import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export type ModuleStatus = "draft" | "published";

export interface CourseModuleAttributes {
  id: string;
  courseId: string;
  title: string;
  description: string;
  weekNumber: number;
  order: number;
  status: ModuleStatus;
  createdAt?: Date;
}

export type CourseModuleCreationAttributes = Optional<
  CourseModuleAttributes,
  "id" | "description" | "order" | "status" | "createdAt"
>;

export class CourseModule
  extends Model<CourseModuleAttributes, CourseModuleCreationAttributes>
  implements CourseModuleAttributes
{
  declare id: string;
  declare courseId: string;
  declare title: string;
  declare description: string;
  declare weekNumber: number;
  declare order: number;
  declare status: ModuleStatus;
  declare readonly createdAt: Date;
}

export function initCourseModuleModel(sequelize: Sequelize) {
  CourseModule.init(
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
      description: { type: DataTypes.TEXT, allowNull: false, defaultValue: "" },
      weekNumber: { type: DataTypes.INTEGER, allowNull: false, field: "week_number" },
      order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      status: {
        type: DataTypes.ENUM("draft", "published"),
        allowNull: false,
        defaultValue: "draft",
      },
    },
    {
      sequelize,
      modelName: "CourseModule",
      tableName: "modules",
      underscored: true,
      timestamps: true,
      updatedAt: false,
    },
  );

  return CourseModule;
}
