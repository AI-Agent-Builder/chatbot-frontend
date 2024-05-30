import { db } from "@/server/db"
import { expertises, traits } from "@/server/db/schema"
import { eq } from 'drizzle-orm';

export const getTraitsDb = async () => {
  return await db
    .select()
    .from(traits)
    .orderBy(traits.trait);
}

export const updateTraitDb = async ({
  oldTrait, trait, descr,
}:{
  oldTrait: string;
  trait: string;
  descr: string;
}) => {
  return await db
    .update(traits)
    .set({
      trait,
      descr, 
    })
    .where(eq(traits.trait, oldTrait))
}

export const getExpertisesDb = async () => {
  return await db
    .select()
    .from(expertises)
    .orderBy(expertises.expertise);
}

export const updateExpertisDb = async ({
  oldExpertise, expertise, descr,
}:{
  oldExpertise: string;
  expertise: string;
  descr: string;
}) => {
  return await db
    .update(expertises)
    .set({
      expertise,
      descr, 
    })
    .where(eq(expertises.expertise, oldExpertise))
}