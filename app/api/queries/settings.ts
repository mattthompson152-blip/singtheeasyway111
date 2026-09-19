import { getDb } from "./connection";
import { settings } from "@db/schema";
import { eq } from "drizzle-orm";

export async function findAllSettings() {
  return getDb().query.settings.findMany();
}

export async function findSettingByKey(key: string) {
  return getDb().query.settings.findFirst({
    where: eq(settings.key, key),
  });
}

export async function setSetting(key: string, value: string) {
  const existing = await findSettingByKey(key);
  if (existing) {
    await getDb()
      .update(settings)
      .set({ value })
      .where(eq(settings.id, existing.id));
    return findSettingByKey(key);
  }
  const [{ id }] = await getDb()
    .insert(settings)
    .values({ key, value })
    .$returningId();
  return getDb().query.settings.findFirst({
    where: eq(settings.id, id),
  });
}

export async function getBusinessTimezone(): Promise<string> {
  const setting = await findSettingByKey("businessTimezone");
  return setting?.value ?? "Europe/London";
}

export async function getBusinessName(): Promise<string> {
  const setting = await findSettingByKey("businessName");
  return setting?.value ?? "Seeing The Easy Way";
}

export async function getBusinessEmail(): Promise<string> {
  const setting = await findSettingByKey("businessEmail");
  return setting?.value ?? "";
}
