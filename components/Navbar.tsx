import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/utils/useAuth";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogoutClick = () => {
    setDialogOpen(true);
  };

  const handleConfirmLogout = async () => {
    try {
      setErrorMessage("");
      await logout();
      setDialogOpen(false);
      router.push("/login");
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Logout failed. Please try again.";
      setErrorMessage(errorMsg);
    }
  };

  const handleCancelLogout = () => {
    setErrorMessage("");
    setDialogOpen(false);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(to right, #3f51b5, #1a237e)",
          boxShadow: 4,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link href="/" passHref>
              <Typography
                variant="h5"
                sx={{
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                📚 Book Explorer
              </Typography>
            </Link>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Link href="/" passHref>
                <IconButton sx={{ color: "white" }}>
                  <HomeIcon />
                </IconButton>
              </Link>
              <Link href="/favorites" passHref>
                <IconButton sx={{ color: "white" }}>
                  <FavoriteIcon />
                </IconButton>
              </Link>
              <IconButton
                color="inherit"
                onClick={handleLogoutClick}
                sx={{
                  border: "1px solid white",
                  borderRadius: "8px",
                  padding: "6px 12px",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <LogoutIcon sx={{ mr: 1 }} />
                <Typography variant="body2" sx={{ color: "#fff" }}>
                  Logout
                </Typography>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Dialog maxWidth="md" open={dialogOpen} onClose={handleCancelLogout}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
          {errorMessage && (
            <DialogContentText sx={{ color: "red", mt: 2 }}>
              {errorMessage}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmLogout}
            color="error"
            variant="contained"
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
