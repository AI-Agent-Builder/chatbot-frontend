"use server";

import { updateExpertisDb, updateTraitDb } from "@/server/data-access";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateTrait(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const oldTrait = formData.get("oldTrait")?.toString() ?? "";
    const trait = formData.get("trait")?.toString() ?? "";
    const descr = formData.get("prompt")?.toString() ?? "";

    await updateTraitDb({
      oldTrait,
      trait,
      descr,
    });
  } catch (e) {
    console.log(e)
    return { message: "Failed to update trait" };
  }
  revalidatePath("/admin");
  return { message: "success" };
}

export async function updateExpertis(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const oldExpertise = formData.get("oldExpertise")?.toString() ?? "";
    const expertise = formData.get("expertise")?.toString() ?? "";
    const descr = formData.get("prompt")?.toString() ?? "";

    await updateExpertisDb({
      oldExpertise,
      expertise,
      descr,
    });
  } catch (e) {
    console.log(e)
    return { message: "Failed to update expertis" };
  }
  revalidatePath("/admin");
  return { message: "success" };
}
