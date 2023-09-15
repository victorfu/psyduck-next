import { app } from "./firebase-web-helper";
import { Analytics, getAnalytics, logEvent } from "firebase/analytics";
import { Logger } from "./logger";

class AnalyticsHelper {
  private static instance: AnalyticsHelper | undefined = undefined;
  private analyticsInstance: Analytics | undefined = undefined;

  private constructor() {
    if (typeof window !== "undefined") {
      this.analyticsInstance = getAnalytics(app);
    }
  }

  public static getInstance(): AnalyticsHelper {
    if (!AnalyticsHelper.instance) {
      AnalyticsHelper.instance = new AnalyticsHelper();
    }
    return AnalyticsHelper.instance;
  }

  public logEvent(event: string, data: any): void {
    if (this.analyticsInstance) {
      Logger.log("Analytics logEvent", event, data);
      logEvent(this.analyticsInstance, event, data);
    }
  }
}

export default AnalyticsHelper;
