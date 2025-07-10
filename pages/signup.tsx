import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useAuth } from "@/hooks/utils/useAuth";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Signup() {
  const { signup } = useAuth();
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
      setEmailError("Enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleSignup = async () => {
    if (!validate()) return;

    try {
      await signup(email, password);
      router.push("/");
    } catch (err: any) {
      console.error("Signup error", err);
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
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Paper elevation={9} sx={{ p: 4, borderRadius: 3 }}>
            {/* Back to Login */}
            <Box display="flex" alignItems="center" mb={2}>
              <IconButton onClick={() => router.push("/login")} size="small">
                <ArrowBackIcon fontSize="small" />
              </IconButton>
              <Typography
                variant="body2"
                onClick={() => router.push("/login")}
                sx={{ cursor: "pointer", ml: 1 }}
              >
                Back to Login
              </Typography>
            </Box>
            <Typography variant="h4" align="center" gutterBottom>
              Sign Up
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
                    setEmailError("Enter a valid email address");
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
                    setPasswordError("Password must be at least 6 characters");
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
                  onClick={handleSignup}
                  fullWidth
                  size="large"
                  sx={{ mt: 1 }}
                >
                  Sign Up
                </Button>
              </motion.div>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
