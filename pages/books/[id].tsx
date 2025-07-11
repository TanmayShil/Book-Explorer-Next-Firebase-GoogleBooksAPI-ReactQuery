import { useRouter } from "next/router";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
  Alert,
  Box,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Navbar from "@/components/Navbar";
import { useBook } from "@/hooks/react-query/useBooks";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useState, useEffect } from "react";

export default function BookDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: book, isLoading, error } = useBook(id as string);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!book) return;
      try {
        const bookRef = doc(db, "favorites", book.id);
        const docSnap = await getDoc(bookRef);
        if (docSnap.exists()) {
          setIsFavorite(true);
        }
      } catch (error) {
        console.error("Error checking favorite:", error);
      }
    };

    checkIfFavorite();
  }, [book]);

  const handleFavorite = async () => {
    if (!book || isFavorite) return;

    try {
      setLoadingFav(true);
      const bookRef = doc(db, "favorites", book.id);
      await setDoc(bookRef, {
        id: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors || [],
        image: book.volumeInfo.imageLinks?.thumbnail || null,
        addedAt: new Date().toISOString(),
      });
      setIsFavorite(true);
    } catch (err) {
      console.error("Error adding to favorites", err);
      alert("Failed to add to favorites.");
    } finally {
      setLoadingFav(false);
    }
  };

  if (isLoading)
    return (
      <>
        <Navbar />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      </>
    );

  if (error)
    return (
      <>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Alert severity="error">Error loading book.</Alert>
        </Container>
      </>
    );

  if (!book)
    return (
      <>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Alert severity="warning">No book found.</Alert>
        </Container>
      </>
    );

  const { title, authors, description, imageLinks, publishedDate, publisher } =
    book.volumeInfo;

  return (
    <>
      <Navbar />
      <Box sx={{ mt: 4, px: 6 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ mb: 3 }}
        >
          Back
        </Button>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: "flex-start",
          }}
        >
          <Card
            sx={{
              width: { xs: "100%", md: 300 },
              borderRadius: 3,
              boxShadow: 3,
              bgcolor: "#fafafa",
              position: "relative",
            }}
          >
            <CardMedia
              component="img"
              height="400"
              image={imageLinks?.thumbnail || "/no-cover.png"}
              alt={title}
              sx={{ objectFit: "contain", p: 2 }}
            />

            <Tooltip
              title={isFavorite ? "Added to Favorites" : "Add to Favorites"}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                }}
              >
                <IconButton
                  onClick={() => {
                    if (!isFavorite && !loadingFav) handleFavorite();
                  }}
                  sx={{
                    bgcolor: isFavorite ? "error.main" : "white",
                    color: isFavorite ? "white" : "error.main",
                    boxShadow: 2,
                    transition: "all 0.3s ease",
                    cursor:
                      isFavorite || loadingFav ? "not-allowed" : "pointer",
                    "&:hover": {
                      bgcolor: isFavorite ? "error.dark" : "error.light",
                      color: "white",
                    },
                    pointerEvents: isFavorite || loadingFav ? "none" : "auto",
                  }}
                >
                  {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>
            </Tooltip>
          </Card>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {title}
            </Typography>

            {authors && (
              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
              >
                By {authors.join(", ")}
              </Typography>
            )}

            {(publishedDate || publisher) && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {publishedDate}
                {publisher && ` • Published by ${publisher}`}
              </Typography>
            )}

            <Typography variant="body1" sx={{ mt: 2, whiteSpace: "pre-line" }}>
              {description || "No description available."}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
