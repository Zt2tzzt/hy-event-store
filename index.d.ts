declare module 'hy-event-store' {
  interface EventHandler {
    eventCallback: (...payload: any[]) => void
    thisArg?: any
  }

  interface EventBus {
    [eventName: string]: EventHandler[]
  }

  export class HYEventBus {
    private eventBus: EventBus

    on(eventName: string, eventCallback: (...payload: any[]) => void, thisArg?: any): HYEventBus

    once(eventName: string, eventCallback: (...payload: any[]) => void, thisArg?: any): HYEventBus

    emit(eventName: string, ...payload: any[]): HYEventBus

    off(eventName: string, eventCallback?: (...payload: any[]) => void): void

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
    onState(stateKey: string, stateCallback: EventHandler): void
    onStates(stateKeys: string[], stateCallback: EventHandler): void
    offStates(stateKeys: string[], stateCallback: EventHandler): void
    offState(stateKey: string, stateCallback: EventHandler): void
  }
}
