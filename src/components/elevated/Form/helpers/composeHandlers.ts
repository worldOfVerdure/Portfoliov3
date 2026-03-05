export const composeHandlers = <TEvent,>(
  ...handlers: Array<((event: TEvent) => void) | undefined>
) => {
  return (event: TEvent) => {
    handlers.forEach((handler) => {
      handler?.(event);
    });
  };
};
