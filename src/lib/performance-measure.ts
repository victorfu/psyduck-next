class PerformanceMeasure {
  isDevelopment = process.env.NODE_ENV === "development";

  constructor(private _name: string) {
    if (this.isDevelopment) {
      console.time(this._name);
    }
  }

  end() {
    if (this.isDevelopment) {
      console.timeEnd(this._name);
    }
  }
}

export default PerformanceMeasure;
