import { UnreachableError } from 'base/preconditions';

enum State {
  INITIAL,
  LOADING,
  RESOLVED,
  REJECTED,
}

type RequestState<V, T> =
    | { state: State.INITIAL }
    | { state: State.LOADING }
    | { state: State.RESOLVED, value: V }
    | { state: State.REJECTED, error: T };

type Handlers<V, E, R> = {
  initial: () => R,
  loading: () => R,
  resolved: (v: V) => R,
  rejected: (e: E) => R,
}

export const RequestState = {
  Initial<V, E = Error>(): RequestState<V, E> {
    return { state: State.INITIAL };
  },
  Loading<V, E = Error>(): RequestState<V, E> {
    return { state: State.LOADING };
  },
  Resolve<V, E = Error>(value: V): RequestState<V, E> {
    return { state: State.RESOLVED, value };
  },
  Reject<V, E = Error>(error: E): RequestState<V, E> {
    return { state: State.REJECTED, error };
  },

  map<V, E, R>(s: RequestState<V, E>, handlers: Handlers<V, E, R>): R {
    switch (s.state) {
      case State.INITIAL:
        return handlers.initial();
      case State.LOADING:
        return handlers.loading();
      case State.RESOLVED:
        return handlers.resolved(s.value);
      case State.REJECTED:
        return handlers.rejected(s.error);
      default:
        throw new UnreachableError(s);
    }
  },
};
