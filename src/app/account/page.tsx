"use client";

import { GlobalContext } from "@/components/GlobalContext";
import { FC, useContext } from "react";
import Image from "next/image";

interface AuthInfoProps {
  providerData: ProviderData[] | null | undefined;
}

function AccountPage() {
  const { user } = useContext(GlobalContext);

  const AuthInfo: FC<AuthInfoProps> = ({ providerData }) => {
    if (!providerData || !providerData.length) {
      return null;
    }

    const provider = providerData[0];
    return (
      <div>
        <Image
          style={{
            height: "auto",
            width: "auto",
            maxWidth: 150,
            minWidth: 70,
          }}
          height={0}
          width={0}
          sizes={"100vw"}
          src={provider.photoURL || ""}
          alt="profile"
        />
        <div>providerId: {provider.providerId}</div>
        <div>uid: {provider.uid}</div>
        <div>displayName: {provider.displayName}</div>
        <div>email: {provider.email}</div>
      </div>
    );
  };

  return (
    <div>
      <AuthInfo providerData={user?.providerData} />
    </div>
  );
}

export default AccountPage;
