type ActionEvent = Event;

export type ActionEventListener = (event: ActionEvent) => void;

type NoActionEvent = Event;

export type NoActionEventListener = (event: NoActionEvent) => void;
