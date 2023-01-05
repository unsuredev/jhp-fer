import * as React from 'react';
// form
import { FormProvider as Form } from 'react-hook-form';

// ----------------------------------------------------------------------

interface IFormProvider {
  children: React.ReactNode;
  methods: any;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function FormProvider({
  children,
  onSubmit,
  methods,
}: IFormProvider) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
