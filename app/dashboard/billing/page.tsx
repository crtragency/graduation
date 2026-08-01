import { PageHeader } from "@/components/dashboard/page-header";
import { BillingPanel } from "@/components/dashboard/billing-panel";

export default function BillingPage(){return <main className="p-4 sm:p-6 lg:p-8"><PageHeader title="Billing & usage" description="Manage your plan, limits, payment method, and invoices."/><BillingPanel/></main>}
