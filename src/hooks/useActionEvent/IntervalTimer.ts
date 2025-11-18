export class IntervalTimer {
  private timer?: ReturnType<typeof setInterval>;
  private time = 0;
  private lastTouchTime = 0;
  private alarmOnceAfterTouch: boolean;
  private doesAlarm = false;
  private step: number;
  private didFirstTouch = false;
  private readonly interval: number;

  constructor({
    interval,
    step = 1000,
    alarmOnceAfterTouch,
  }: {
    interval: number;
    step?: number;
    alarmOnceAfterTouch: boolean;
  }) {
    this.interval = interval;
    this.alarmOnceAfterTouch = alarmOnceAfterTouch;
    this.step = step;
  }

  public start(alarm: () => void) {
    this.timer = setInterval(() => {
      this.time = this.time + this.step;

      const isOverInterval = this.isOverInterval();

      if (!this.didFirstTouch) {
        return;
      }

      if (!isOverInterval) {
        return;
      }

      if (this.alarmOnceAfterTouch) {
        if (!this.doesAlarm) {
          this.doesAlarm = true;
          alarm();
        }

        return;
      }

      this.doesAlarm = true;
      alarm();
    }, this.step);
  }

  public touch() {
    this.lastTouchTime = this.time;
    this.doesAlarm = false;
    this.didFirstTouch = true;
  }

  private isOverInterval() {
    return this.time - this.lastTouchTime >= this.interval;
  }

  public stop() {
    clearInterval(this.timer);
    this.time = 0;
    this.lastTouchTime = 0;
  }
}
