import { loadSSMConfig } from "./ssm-config";

export async function getDatabaseUrl(): Promise<string> {
    const config = await loadSSMConfig();

    return config.DATABASE_URL;
}