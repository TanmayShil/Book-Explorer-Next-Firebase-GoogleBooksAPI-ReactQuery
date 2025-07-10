import { Book } from "@/typescript/types/book";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Link from "next/link";

const BookCard = ({ book }: { book: Book }) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      mb: 3,
      borderRadius: 2,
      boxShadow: 3,
      transition: "transform 0.2s",
      "&:hover": {
        transform: "scale(1.02)",
      },
    }}
  >
    <CardMedia
      component="img"
      image={book.volumeInfo.imageLinks?.thumbnail || "/no-cover.png"}
      alt={book.volumeInfo.title}
      sx={{
        width: { xs: "100%", sm: 140 },
        height: "auto",
        objectFit: "cover",
        borderTopLeftRadius: 8,
        borderTopRightRadius: { xs: 8, sm: 0 },
        borderBottomLeftRadius: { xs: 0, sm: 8 },
      }}
    />
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography variant="h6" noWrap>
          {book.volumeInfo.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5 }}
          noWrap
        >
          {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
        </Typography>
        <Link href={`/books/${book.id}`} passHref>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            size="small"
          >
            View Details
          </Button>
        </Link>
      </CardContent>
    </Box>
  </Card>
);

export default BookCard;
