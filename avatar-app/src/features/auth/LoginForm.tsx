import { useState } from "react";
// form
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Link, Container, Typography } from "@mui/material";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
// @mui
import { Stack, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../components/Iconify";
import {
  FormProvider,
  RHFTextField,
  RHFCheckbox,
  RHFRadio,
} from "../../components/hook-form";
// locale
import { useTranslation } from "react-i18next";
// redux
import { loginUserAsync } from "../../app/services/auth/authSlice";
import { useAppDispatch } from "../../app/hooks";

// ----------------------------------------------------------------------

export function LoginForm() {
  const { t } = useTranslation();

  // redux
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("employee");

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("validationError.emailValid"))
      .required(t("validationError.emailRequired")),
    password: Yup.string().required(t("validationError.passwordRequired")),
  });
  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const defaultValues = {
    email: "",
    password: "",
    loginType: value,
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: typeof defaultValues) => {
    dispatch(
      loginUserAsync({
        email: data.email,
        password: data.password,
        login_type: "email",
      })
    );
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <FormControl component="fieldset" style={{ display: "inline" }}>
          <FormLabel component="legend">Choose account type</FormLabel>
          <RadioGroup
            name="user"
            style={{ display: "inline" }}
            value={value}
            onChange={handleChangeRadio}
          >
            <FormControlLabel
              value="employee"
              control={<Radio />}
              label="Employee"
            />
            <FormControlLabel value="agent" control={<Radio />} label="Agent" />
          </RadioGroup>
        </FormControl>
        {value === "employee" && <RHFTextField name="email" label={"Email"} />}
        {value === "agent" && <RHFTextField name="Mobile" label={"Mobile"} />}
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
      </Stack>

      <br />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
