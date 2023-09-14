type ProviderData = {
  photoURL: string | null;
  providerId: string;
  uid: string;
  displayName: string | null;
  email: string | null;
};

type Metadata = {
  lastSignInTime: string;
  creationTime: string;
  lastRefreshTime: string;
};

type CustomClaims = {
  isAdmin: boolean;
};

type User = {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  photoURL: string;
  disabled: boolean;
  metadata: Metadata;
  customClaims: CustomClaims;
  tokensValidAfterTime: string;
  providerData: ProviderData[];
};

type Item = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
};
