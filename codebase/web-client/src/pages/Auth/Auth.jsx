import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { GoogleLogin } from 'react-google-login';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import bgImg from '../../assets/train.png';
import { useRegisterUserMutation } from "../../store/api/auth-api-slice";
import { useLoginUserMutation } from "../../store/api/auth-api-slice";
import { useLazyGetUserQuery } from "../../store/api/user-api-slice";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/slices/auth-slice";
import { useDispatch } from "react-redux";

const authSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Please enter your email"),
  firstName: yup.string().when("isSignup", {
    is: true,
    then: yup.string().required("Please enter your first name"),
  }),
  lastName: yup.string().when("isSignup", {
    is: true,
    then: yup.string().required("Please enter your last name"),
  }),
  password: yup.string().required("Please enter your password"),
  matchPassword: yup
    .string()
    .when("isSignup", {
      is: true,
      then: yup
        .string()
        .required("Please re-enter your password")
        .oneOf([yup.ref("password")], "Passwords must match"),
    }),
});

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"Copyright © "}
			<Link color="inherit" href="https://mui.com/">
				Culture Hub
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const theme = createTheme();

const initialState = {
	firstName: "",
	lastName: "",
	email: "",
  mobile: "",
	password: "",
	confirmPassword: "",
};

export default function Auth() {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const dispatch = useDispatch();

	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
	} = useForm({ resolver: yupResolver(authSchema) });

  // const [serverErrorMessage, setServerErrorMessage] = useState<string | undefined>();

  const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();
	const [registerUser, { isLoading, isSuccess, isError, reset }] = useRegisterUserMutation();
  const [getUser, { isLoading: isUserLoading }] = useLazyGetUserQuery();

  const onSubmit = async (formData) => {
    formData.mobile = "1234567890";
    formData.dateOfBirth = "01/01/2000";
    
    if (isSignup) {
      try {
        const response = await registerUser({
          ...formData,
          isSubscribed,
        }).unwrap();
        console.log(response);
        setIsSignup(false);
      } catch (error) {
        if (error.status === 409) {
          // setServerErrorMessage("This email is already in use");
          console.log("409 error");
        } else {
          // setServerErrorMessage("An error occurred. Please try again later");
          console.log(" error");
        }
      }
      reset();
    } else {
      const { email, password } = formData;
      try {
        const { tokens, user } = await loginUser({
          email,
          password,
        }).unwrap();
        
        dispatch(setUser({ user,tokens }));
        navigate("/blog");
      } catch (error) {
        console.log(error);
        if (error.status === 401) {
          // setServerErrorMessage("Invalid password or email");
          console.log("409 error");
        } else {
          // setServerErrorMessage("An error occurred. Please try again later.");
          console.log(" error");
        }
      }
    }
  };

	// useEffect(() => {
	// 	if (isSuccess) {
	// 		setIsRegisterSuccessful(true);
	// 	} else if (isError) {
	// 		setIsRegisterSuccessful(false);
	// 	}
	// 	reset();
	// }, [isSuccess, isError]);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

	const switchMode = () => {
		setForm(initialState);
		setIsSignup((prevIsSignup) => !prevIsSignup);
		setShowPassword(false);
	};

	// const handleChange = (e) =>
	// 	setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh', backgroundColor: 'antiquewhite' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bgImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              { isSignup ? 'Sign up' : 'Sign in' }
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
              { isSignup && (
              <>
                <TextField margin="normal" fullWidth required  name="firstName" label="First Name"  autoFocus 
                error={errors.firstName} 
                isLoading={isSubmitting || isLoading}
							  {...register("firstName")} />
                <TextField margin="normal" fullWidth required  name="lastName" label="Last Name"  autoFocus 
                error={errors.lastName} 
                isLoading={isSubmitting || isLoading}
							  {...register("lastName")} />
              </>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={errors.email}
                isLoading={isSubmitting || isLoading}
                {...register("email")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={errors.password}
                isLoading={isSubmitting || isLoading}
                {...register("password")}
              />
              { isSignup && <TextField margin="normal" required fullWidth name="matchPassword" label="Repeat Password"  type="password" 
              error={errors.matchPassword}
							isLoading={isSubmitting || isLoading}
							{...register("matchPassword")}/> }
              <FormControlLabel
                control={<Checkbox value={isSubscribed} color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                { isSignup ? 'Sign Up' : 'Sign In' }
              </Button>
              {/* <GoogleLogin
                clientId="324215342320-lqmvk909ki56b32rh62mko4d0ks0aulm.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                    Google Sign In
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy="single_host_origin"
              /> */}
							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2">
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link onClick={switchMode} variant="body2">
										{isSignup
											? "Already have an account? Sign in"
											: "Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
							<Copyright sx={{ mt: 5 }} />
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}
