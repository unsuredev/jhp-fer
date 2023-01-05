// form
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//locale
import { useTranslation } from "react-i18next";
// @mui
import { Grid, IconButton, InputAdornment, Stack } from "@mui/material";
import { FormProvider, RHFTextField } from "components/hook-form";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "app/hooks";
import { IUser } from "definitions/app/user";
import { addUserAsync, updateAUserAsync } from "app/services/users/userSlice";
import Iconify from "components/Iconify";
import { useState } from "react";

interface IUserForm extends IDrawerParent<IUser> {
  companyId?: string;
}

export const UserForm = ({ onParentClose, editData, readonly }: IUserForm) => {
  const { t } = useTranslation();

  // redux
  const dispatch = useAppDispatch();

  // state
  const [showPassword, setShowPassword] = useState(false);

  // yup form
  let userSchema = Yup.object().shape({
    firstName: Yup.string().required(t("First Name is Required")),
    middleName: Yup.string().optional(),
    lastName: Yup.string().required(t("Last Name is Required")),
    gender: Yup.string().required(t("Gender is Required")),
    email: Yup.string().required(t("Email is Required")),
    login_type: Yup.string().required(t("User Type is Required")),
  });

  const defaultValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "Male",
    email: "",
    type: "Admin",
    ...(editData as any),
  };
  if (editData == null) {
    defaultValues["password"] = "";
    userSchema = userSchema.shape({
      password: Yup.string().min(5).required(t("Password is required")),
    });
  }
  const methods = useForm({
    resolver: yupResolver(userSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: typeof defaultValues) => {
    if (editData)
      dispatch(updateAUserAsync(data as any)).then(() => {
        onClose(data);
      });
    else
      dispatch(addUserAsync(data as any)).then(() => {
        onClose(data);
      });
  };

  const onClose = (data: any) => {
    onParentClose && onParentClose(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField
          readonly={readonly}
          name="firstName"
          label={t("First Name")}
        />

        <RHFTextField
          readonly={readonly}
          name="lastName"
          label={t("Last Name")}
        />
        {editData && readonly && (
          <RHFTextField
            readonly={true}
            name="mobile"
            label={t("Mobile Number")}
          />
        )}
        <RHFTextField readonly={readonly} name="gender" label={t("Gender")} />
        <RHFTextField readonly={readonly} name="email" label={t("Email")} />
        <RHFTextField
          readonly={readonly}
          name="login_type"
          label={t("User Type")}
        />
        {!editData && (
          <RHFTextField
            name="password"
            label={t("label.password")}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      </Stack>

      <Grid container spacing={2} marginTop={4} justifyContent={"flex-end"}>
        <Grid item>
          <LoadingButton color="error" onClick={onClose}>
            Cancel
          </LoadingButton>
        </Grid>
        <Grid item>
          <LoadingButton
            disabled={readonly}
            type="submit"
            loading={isSubmitting}
            variant="contained"
          >
            Submit
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  );
};
