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

interface AuthResponse {
  user?: User;
  error?: string;
}

// LINE interfaces

interface Features {
  webhook: boolean;
  groupTalk: boolean;
  autoReply: boolean;
  autoGreet: boolean;
}

interface BotConfiguration {
  botId: number;
  basicId: string;
  webhookUrl: string;
  qrcodeUrl: string;
  friendCount: number;
  errorCount: number;
  features: Features;
  secrecyOfCommunicationConsent: {
    status: string;
  };
  authorities: string[];
  webhook: {
    url: string;
    active: boolean;
    isSwitcher: boolean;
    redelivery: boolean;
    errorAggregation: boolean;
  };
  links: Record<string, string>;
  capability: {
    groupTalkEditable: boolean;
    autoReplyEditable: boolean;
    autoGreetEditable: boolean;
  };
  responseMode: string;
  name: string;
  iconUrl: string;
  hasBot: boolean;
}

interface ProviderOrPartner {
  id: string;
  name: string;
  roleOfCurrentUser: string;
  certified: boolean;
}

interface LineBot {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  productTypes: string[];
  applicationTypes: string[];
  status: string;
  contactEmail: string;
  configurationStatus: string;
  roleOfCurrentUser: string;
  botConfiguration: BotConfiguration;
  provider: ProviderOrPartner;
  partner: ProviderOrPartner;
  statsAuthorities: any[];
  createdAt: number;
  force2FA: boolean;
  ////
  i18n: Record<string, unknown>;
  secret: string;
  members: Member[];
  issuedToken?: IssuedToken;
  allowedSubnets: string[];
  webAppConfiguration: WebAppConfiguration;
  openidConfiguration: OpenIdConfiguration;
  linkMessageTemplates: any[];
  capability: Capability;
  permissions: string[];
  legalRegionOptions: string[];
  userIdOfCurrentUser: string;
  linkedBot: LinkedBot;
  agreements: any[];
}

interface Account {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  hasLineAccount: boolean;
}

interface Member {
  role: string;
  account: Account;
}

interface WebAppConfiguration {
  callbackUrls: string[];
}

interface OpenIdConfiguration {
  scopes: string[];
}

interface Capability {
  updatingName: boolean;
  canDeleteChannel: boolean;
  canEditIcon: boolean;
  canEditName: boolean;
  canEditDescription: boolean;
  canEditI18n: boolean;
  canRefreshSecret: boolean;
  canRequestOpenIdConnectEmailPermission: boolean;
  canEditLoginAppTypes: boolean;
  canCreateLiffApp: boolean;
  canEditEmail: boolean;
  canEditPpUrl: boolean;
  canEditTouUrl: boolean;
  canEditLinkedBot: boolean;
  canViewLinkedBot: boolean;
  canVerifyWebhook: boolean;
  canEditLegalRegion: boolean;
  canViewLegalRegion: boolean;
  canEditWebhookRedelivery: boolean;
  canEditWebhookErrorAggregation: boolean;
}

interface LinkedBot {
  id: string;
  searchId: string;
  iconUrl: string;
  name: string;
}

interface IssuedToken {
  accessToken: string;
}

// End of LINE interfaces

interface Bot {
  id: string;
  type: string;
  name: string;
  description?: string;
  channelId: string;
  channelSecret: string;
  channelAccessToken: string;
  raw?: LineBot;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

interface Device {
  id: string;
  name: string;
  description?: string;
  uid: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}
