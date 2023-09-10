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
  admin: boolean;
};

type Account = {
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

type UserQuickInfo = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
};
