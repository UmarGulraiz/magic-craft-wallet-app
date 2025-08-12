import { memo, useCallback, useEffect } from "react";
import { useSetAtom } from "jotai";
import { Field, Form } from "react-final-form";
import { FORM_ERROR, FormApi } from "final-form";
import { nanoid } from "nanoid";
import { storage } from "lib/ext/storage";

import { AddAccountParams, SeedPharse } from "core/types";
import { Setting } from "core/common";
import { setupWallet, TEvent, trackEvent } from "core/client";

import {
  differentPasswords,
  required,
  withHumanDelay,
  focusOnErrors,
  composeValidators,
  validatePassword,
  resetFormPassword,
} from "app/utils";
import { addAccountModalAtom } from "app/atoms";
import { useSteps } from "app/hooks/steps";
import AddAccountContinueButton from "app/components/blocks/AddAccountContinueButton";
import AddAccountHeader from "app/components/blocks/AddAccountHeader";
import PasswordField from "app/components/elements/PasswordField";
import PasswordValidationField from "app/components/elements/PasswordValidationField";

type FormValues = {
  password: string;
  confirm: string;
  analytics: boolean;
  terms: boolean;
};

const SetupPassword = memo(() => {
  const setAccModalOpened = useSetAtom(addAccountModalAtom);

  const { stateRef, reset } = useSteps();

  const addAccountsParams: AddAccountParams[] | undefined =
    stateRef.current.addAccountsParams;
  const seedPhrase: SeedPharse | undefined = stateRef.current.seedPhrase;

  useEffect(() => {
    if (!addAccountsParams) {
      reset();
    }
  }, [addAccountsParams, reset]);

  const handleFinish = useCallback(
    async (
      { password, analytics }: FormValues,
      form: FormApi<FormValues, Partial<FormValues>>,
    ) =>
      withHumanDelay(async () => {
        try {
          if (!addAccountsParams) return;

          await setupWallet(password, addAccountsParams, seedPhrase);
          await resetFormPassword(form);
          await resetFormPassword(form, "confirm");

          if (analytics) {
            await storage.put(Setting.Analytics, {
              enabled: true,
              userId: nanoid(),
            });

            trackEvent(TEvent.SetupWigwam);
          }

          setAccModalOpened([false]);
        } catch (err: any) {
          return { [FORM_ERROR]: err?.message };
        }
        return;
      }),
    [addAccountsParams, seedPhrase, setAccModalOpened],
  );

  if (!addAccountsParams) {
    return null;
  }

  return (
    <>
      <AddAccountHeader className="mb-7">Setup Password</AddAccountHeader>

      <Form<FormValues>
        initialValues={{ analytics: true, terms: false }}
        onSubmit={handleFinish}
        validate={(values) => ({
          confirm: differentPasswords(values.password, values.confirm),
        })}
        decorators={[focusOnErrors]}
        destroyOnUnregister
        render={({ handleSubmit, submitting }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col max-w-[27.5rem] mx-auto"
          >
            <div className="max-w-[19rem] mx-auto flex flex-col items-center justify-center">
              <Field
                name="password"
                validate={composeValidators(required, validatePassword)}
              >
                {({ input, meta }) => (
                  <PasswordValidationField
                    error={
                      meta.error &&
                      meta.submitFailed &&
                      !meta.modifiedSinceLastSubmit
                    }
                    modified={meta.modified}
                    label="Create Password"
                    placeholder={"*".repeat(8)}
                    className="w-full mb-3"
                    {...input}
                  />
                )}
              </Field>
              <Field name="confirm" validate={required}>
                {({ input, meta }) => (
                  <PasswordField
                    placeholder={"*".repeat(8)}
                    label="Confirm Password"
                    error={meta.touched && meta.error}
                    errorMessage={meta.error}
                    className="w-full"
                    {...input}
                  />
                )}
              </Field>
            </div>
            <AddAccountContinueButton loading={submitting} />
          </form>
        )}
      />
    </>
  );
});

export default SetupPassword;
