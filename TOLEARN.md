So EmailControl does not manually “check tooShort vs valueMissing.”
It forwards events, and your handler/rulebook reads event.currentTarget.validity to see what the
browser says failed (src/components/elevated/Form/controls/useControlValidationHandlers.ts:39).

