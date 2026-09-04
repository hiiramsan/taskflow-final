import { describe, expect, it } from "vitest";
import type { Task } from "../types";
import { filterTasks } from "./filterTasks";

const tasks: Task[] = [
  { id: 1, title: "Write documentation", status: "TODO", priority: "HIGH", projectId: 1 },
  { id: 2, title: "Review pull request", status: "IN_PROGRESS", priority: "MED", projectId: 1 },
  { id: 3, title: "Deploy application", status: "DONE", priority: "LOW", projectId: 1 },
];

describe("filterTasks", () => {
  it("returns all tasks when no filters are active", () => {
    expect(filterTasks(tasks, "", "ALL", "ALL")).toEqual(tasks);
  });

  it("searches task titles without case sensitivity", () => {
    expect(filterTasks(tasks, "DOCUMENTATION", "ALL", "ALL")).toEqual([tasks[0]]);
  });

  it("filters by status and priority together", () => {
    expect(filterTasks(tasks, "", "IN_PROGRESS", "MED")).toEqual([tasks[1]]);
  });

  it("returns an empty list when there are no matches", () => {
    expect(filterTasks(tasks, "meeting", "ALL", "ALL")).toEqual([]);
  });
});