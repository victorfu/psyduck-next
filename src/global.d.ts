type ProviderData = {
  photoURL?: string;
  providerId: string;
  uid: string;
  displayName?: string;
  email?: string;
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
