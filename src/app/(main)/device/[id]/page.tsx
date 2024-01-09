import { DeviceChart } from "@/components/device-chart";
import DeviceForm from "@/components/device-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Separator } from "@/components/ui/separator";
import Map from "@/components/map";
import { getDeviceById } from "@/lib/actions";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import "server-only";

export default async function DeviceInfoPage({
  params,
}: {
  params: { id: string };
}) {
  const { device } = await getDeviceById(params.id);
  if (!device) {
    return <div>Device not found</div>;
  }

  const DeviceStatus = () => {
    return (
      <div className="h-10">
        <Badge className="bg-green-500">Online</Badge>
      </div>
    );
  };

  const GoBack = () => {
    return (
      <Link href="/device">
        <Button variant="outline" className="flex items-center">
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
      </Link>
    );
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-full max-w-[500px]">
          <div className="flex items-center justify-between">
            <GoBack />
            <DeviceStatus />
          </div>
          <DeviceForm device={device} />
        </div>
        <div>
          <Map />
        </div>
      </div>
      <div className="flex mt-10 justify-end">
        <DateRangePicker />
      </div>
      <div className="mt-6 max-w-full">
        <div>
          <div>Voltage(V)</div>
          <Separator />
          <DeviceChart />
        </div>
        <div>
          <div>Current(I)</div>
          <Separator />
          <DeviceChart />
        </div>
        <div>
          <div>Current(I)</div>
          <Separator />
          <DeviceChart />
        </div>
        <div>
          <div>Power(W)</div>
          <Separator />
          <DeviceChart />
        </div>
        <div>
          <div>Capacity_Use(Ah)</div>
          <Separator />
          <DeviceChart />
        </div>
        <div>
          <div>Throttle_In_Percentage</div>
          <Separator />
          <DeviceChart />
        </div>
        <div>
          <div>Throttle_Curve</div>
          <Separator />
          <DeviceChart />
        </div>
        <div>
          <div>Throttle_Curve</div>
          <Separator />
          <DeviceChart />
        </div>
        <div>
          <div>Speed(kph)</div>
          <Separator />
          <DeviceChart />
        </div>
        <div>
          <div>Distance(km)</div>
          <Separator />
          <DeviceChart />
        </div>
        d
      </div>
    </div>
  );
}
