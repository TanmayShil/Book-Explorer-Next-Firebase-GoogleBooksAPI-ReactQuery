import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Paper,
  Link as MuiLink,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/utils/useAuth";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validate = () => {
    let valid = true;

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Enter a valid email");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Minimum 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      await login(email, password);
      router.push("/");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Paper elevation={9} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
            >
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => {
                  const value = e.target.value;
                  setEmail(value);
                  if (!value) {
                    setEmailError("Email is required");
                  } else if (!/\S+@\S+\.\S+/.test(value)) {
                    setEmailError("Enter a valid email");
                  } else {
                    setEmailError("");
                  }
                }}
                fullWidth
                error={!!emailError}
                helperText={emailError}
              />

              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => {
                  const value = e.target.value;
                  setPassword(value);
                  if (!value) {
                    setPasswordError("Password is required");
                  } else if (value.length < 6) {
                    setPasswordError("Minimum 6 characters");
                  } else {
                    setPasswordError("");
                  }
                }}
                fullWidth
                error={!!passwordError}
                helperText={passwordError}
              />

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleLogin}
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  Login
                </Button>
              </motion.div>
            </Box>

            <Box mt={3} textAlign="center">
              <Typography variant="body2">
                Don't have an account?{" "}
                <MuiLink
                  component="button"
                  onClick={() => router.push("/signup")}
                  sx={{ fontWeight: 600 }}
                >
                  Sign Up
                </MuiLink>
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
