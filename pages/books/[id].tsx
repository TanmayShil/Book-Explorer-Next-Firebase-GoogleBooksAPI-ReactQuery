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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Navbar from "@/components/Navbar";
import { useBook } from "@/hooks/react-query/useBooks";

export default function BookDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: book, isLoading, error } = useBook(id as string);

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
            }}
          >
            <CardMedia
              component="img"
              height="400"
              image={imageLinks?.thumbnail || "/no-cover.png"}
              alt={title}
              sx={{ objectFit: "contain", p: 2 }}
            />
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
                {publishedDate} {publisher && ` • Published by ${publisher}`}
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
