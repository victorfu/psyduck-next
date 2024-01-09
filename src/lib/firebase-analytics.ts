import { Log } from "./decorators";
import { app } from "./firebase-web-helper";
import { Analytics, getAnalytics, logEvent } from "firebase/analytics";

class FirebaseAnalytics {
  private static instance: FirebaseAnalytics | undefined = undefined;
  private analyticsInstance: Analytics | undefined = undefined;

  private constructor() {
    if (typeof window !== "undefined") {
      this.analyticsInstance = getAnalytics(app);
    }
  }

  public static getInstance(): FirebaseAnalytics {
    if (!FirebaseAnalytics.instance) {
      FirebaseAnalytics.instance = new FirebaseAnalytics();
    }
    return FirebaseAnalytics.instance;
  }

  @Log
  public logEvent(event: string, data: any): void {
    if (this.analyticsInstance) {
      logEvent(this.analyticsInstance, event, data);
    }
  }

  public logLogin(): void {
    this.logEvent("login", "click");
  }

  public logHospSearch(): void {
    this.logEvent("hosp_search", "click");
  }
}

export default FirebaseAnalytics;
