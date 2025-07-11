import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  CircularProgress,
  IconButton,
  Tooltip,
  Box,
  Alert,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "@/components/Navbar";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface FavoriteBook {
  id: string;
  title: string;
  authors: string[];
  image: string | null;
  addedAt: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const favRef = collection(db, "favorites");
      const snap = await getDocs(favRef);
      const data: FavoriteBook[] = snap.docs.map(
        (doc) => doc.data() as FavoriteBook
      );
      setFavorites(data);
    } catch (err) {
      console.error("Failed to fetch favorites:", err);
      setError("Failed to load favorite books.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (bookId: string) => {
    try {
      await deleteDoc(doc(db, "favorites", bookId));
      setFavorites((prev) => prev.filter((book) => book.id !== bookId));
    } catch (err) {
      console.error("Failed to remove favorite:", err);
      alert("Failed to remove book.");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Favorite Books
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        ) : favorites.length === 0 ? (
          <Alert severity="info" sx={{ mt: 3 }}>
            No favorite books added yet.
          </Alert>
        ) : (
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {favorites.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    bgcolor: "#fafafa",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={book.image || "/no-cover.png"}
                    alt={book.title}
                    sx={{ objectFit: "contain", p: 2 }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {book.title}
                    </Typography>
                    {book.authors?.length > 0 && (
                      <Typography variant="body2" color="text.secondary">
                        By {book.authors.join(", ")}
                      </Typography>
                    )}
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 2,
                      pb: 2,
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => router.push(`/books/${book.id}`)}
                    >
                      View Details
                    </Button>
                    <Tooltip title="Remove from Favorites">
                      <IconButton
                        color="error"
                        onClick={() => handleRemove(book.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}
