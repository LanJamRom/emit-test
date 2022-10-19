import { cloneDeep } from "lodash";
import { useEffect, useRef } from "react";
type SubscriptionParams<T = any> = {
  params: T;
  event: string | number;
};
type Subscription<T> = ({ params, event }: SubscriptionParams<T>) => void;
class EventEmitter<T> {
  private subscriptions = new Map<string | number, Subscription<T>>();
  constructor() {
    this.clear();
  }
  useSubscription = (event: string, listener?: Subscription<T>) => {
    const callbackRef = useRef<Subscription<T>>();
    useEffect(() => {
      callbackRef.current = listener;
      function subscription(val: SubscriptionParams) {
        if (callbackRef.current) {
          callbackRef.current(val);
        }
      }
      this.subscriptions.set(event, subscription);
      return () => {
        this.subscriptions.delete(event);
      };
    }, []);
  };
  emit = (event: string | number, ...args: T extends any[] ? any[] : any) => {
    if (typeof event === "string" || typeof event === "number") {
      const subscriptionValuesCallback = this.subscriptions.get(event);
      subscriptionValuesCallback?.({
        params: cloneDeep(args) as any,
        event,
      });
    } else throw new TypeError("event must be string or number !");
  };
  removeListener = (event: string) => {
    this.subscriptions.delete(event);
  };
  clear = () => {
    this.subscriptions.clear();
  };
}
const eventEmitterOverall = new EventEmitter();
export { EventEmitter, eventEmitterOverall };
