declare module 'hy-event-store' {

  type EventCallback<ThisType = any> = (this: ThisType, ...payload: any[]) => void

  interface EventHandler {
    eventCallback: EventCallback
    thisArg?: any
  }

  interface EventBus {
    [eventName: string]: EventHandler[]
  }

  export class HYEventBus {
    private eventBus: EventBus

    on(eventName: string, eventCallback: EventCallback, thisArg?: any): HYEventBus

    once(eventName: string, eventCallback: EventCallback, thisArg?: any): HYEventBus

    emit(eventName: string, ...payload: any[]): HYEventBus

    off(eventName: string, eventCallback?: EventCallback): void

		clear(eventNames: string[]): void
  }

  interface State {
    [key: string]: any
  }

  interface Actions {
    [key: string]: (...args: any[]) => any
  }

  export class HYEventStore {
    state: State
    actions: Actions
    event: HYEventBus
    eventV2: HYEventBus

    constructor(options: { state: State; actions?: Actions })
    private _observe(state: State): void
    onState(stateKey: string, stateCallback: EventCallback): void
    onStates(stateKeys: string[], stateCallback: EventCallback): void
    offStates(stateKeys: string[], stateCallback: EventCallback): void
    offState(stateKey: string, stateCallback: EventCallback): void
    setState(stateKey: keyof State, stateValue: any)
    dispatch(actionName: keyof Actions, ...args: any[]): void
  }

}
