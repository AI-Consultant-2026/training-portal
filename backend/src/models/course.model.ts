import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseStatus = "draft" | "published" | "archived";

export interface CourseAttributes {
  id: string;
  title: string;
  slug: string;
  description: string;
  instructorId: string | null;
  durationWeeks: number;
  level: CourseLevel;
  status: CourseStatus;
  metadata: Record<string, unknown>;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CourseCreationAttributes = Optional<
  CourseAttributes,
  "id" | "description" | "instructorId" | "level" | "status" | "metadata" | "createdAt" | "updatedAt"
>;

export class Course extends Model<CourseAttributes, CourseCreationAttributes> implements CourseAttributes {
  declare id: string;
  declare title: string;
  declare slug: string;
  declare description: string;
  declare instructorId: string | null;
  declare durationWeeks: number;
  declare level: CourseLevel;
  declare status: CourseStatus;
  declare metadata: Record<string, unknown>;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initCourseModel(sequelize: Sequelize) {
  Course.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      description: { type: DataTypes.TEXT, allowNull: false, defaultValue: "" },
      instructorId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: "instructor_id",
        references: { model: "users", key: "id" },
      },
      durationWeeks: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "duration_weeks",
      },
      level: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "beginner",
      },
      status: {
        type: DataTypes.ENUM("draft", "published", "archived"),
        allowNull: false,
        defaultValue: "draft",
      },
      metadata: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
    },
    {
      sequelize,
      modelName: "Course",
      tableName: "courses",
      underscored: true,
      timestamps: true,
    },
  );

  return Course;
}
