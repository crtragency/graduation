import { PageHeader } from "@/components/dashboard/page-header";
import { SettingsPanel } from "@/components/dashboard/settings-panel";

export default function SettingsPage(){return <main className="p-4 sm:p-6 lg:p-8"><PageHeader title="Settings" description="Configure your workspace, integrations, domains, and security."/><SettingsPanel/></main>}
