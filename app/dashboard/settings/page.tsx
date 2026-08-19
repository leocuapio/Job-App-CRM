import SettingsClient from "@/components/settings/settingsClient"
import { auth } from "@/lib/auth"

export default async function SettingsPage() {
  const session = await auth()

  return <SettingsClient session={session!} />
}
