"use server";
import { db } from "./lib/db";
import { revalidatePath } from "next/cache";

export async function getPins() {
  return await db.pin.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createPin(formData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const type = formData.get("type");
  const content = formData.get("content");

  if (!title) return { error: "Title is required" };
  if (!description) return { error: "Description is required" };
  if (!type) return { error: "Type is required" };

  try {
    await db.pin.create({ data: { title, description, type, content } });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error creating pin:", error);
    return { error: "Something went wrong" };
  }
}

export async function deletePin(id) {
  try {
    await db.pin.delete({ where: { id } });
    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting pin:", error);
  }
}

export async function updatePin(id, formData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const type = formData.get("type");
  const content = formData.get("content");

  if (!title) return { error: "Title is required" };
  if (!description) return { error: "Description is required" };
  if (!type) return { error: "Type is required" };

  try {
    await db.pin.update({ where: { id }, data: { title, description, type, content } });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating pin:", error);
    return { error: "Something went wrong" };
  }
}
