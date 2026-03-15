## Files Added

- `TOLEARN.md`
- `src/components/elevated/Form/context/formRegistryContext.tsx`
- `src/components/elevated/Form/primitives/useAutofillReconciliation.ts`
- `src/components/elevated/Form/primitives/AutofillManager.tsx`
- `src/components/elevated/Form/controls/uncontrolled/useRegisterUncontrolledControl.ts`

## Existing Files Updated With Added Code

- `src/components/elevated/Form/primitives/FormRoot.tsx`
	```tsx
	import { useId, useMemo, useRef, useState } from 'react';
	import { FormRegistryProvider } from '../context/formRegistryContext';
	import { AutofillManager } from './AutofillManager';

	const rootRef = useRef<HTMLFormElement | null>(null);

	<FormRegistryProvider>
		<Form.Root ref={rootRef} className={cn(classes?.form, className)} style={{ ...tokens, ...style }} {...props}>
			<AutofillManager formRootRef={rootRef} />
			{children}
		</Form.Root>
	</FormRegistryProvider>
	```
- `src/components/elevated/Form/controls/uncontrolled/BaseInputControl.tsx`
	```tsx
	import { ChangeEvent, ComponentPropsWithoutRef, useRef } from 'react';
	import { useRegisterUncontrolledControl } from './useRegisterUncontrolledControl';

	const controlRef = useRef<HTMLInputElement | null>(null);
	const isControlled = props.value !== undefined || props.checked !== undefined;

	useRegisterUncontrolledControl({
		name,
		isControlled,
		controlRef
	});

	<input
		{...props}
		ref={controlRef}
		...
	/>
	```
- `src/components/elevated/Form/controls/uncontrolled/TextareaControl.tsx`
	```tsx
	import { ChangeEvent, ComponentPropsWithoutRef, useRef } from 'react';
	import { useRegisterUncontrolledControl } from './useRegisterUncontrolledControl';

	const controlRef = useRef<HTMLTextAreaElement | null>(null);
	const isControlled = props.value !== undefined;

	useRegisterUncontrolledControl({
		name,
		isControlled,
		controlRef
	});

	<textarea
		{...props}
		ref={controlRef}
		...
	/>
	```
- `next-env.d.ts`
	```ts
	import "./.next/dev/types/routes.d.ts";
	```
