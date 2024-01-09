import "server-only";
import dynamic from "next/dynamic";
import { getDevices } from "@/lib/actions";

const DeviceDialog = dynamic(() => import("@/components/device-dialog"));
const DeviceTable = dynamic(() => import("@/components/device-table"));

export default async function DevicePage() {
  const { devices } = await getDevices();

  return (
    <div className="space-y-4">
      <DeviceDialog />
      <DeviceTable devices={devices ?? []} />
    </div>
  );
}
