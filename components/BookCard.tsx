import { Book } from "@/typescript/types/book";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import Link from "next/link";

const BookCard = ({ book }: { book: Book }) => (
  <Card sx={{ display: "flex", mb: 2 }}>
    <CardMedia
      component="img"
      sx={{ width: 120 }}
      image={book.volumeInfo.imageLinks?.thumbnail || "/no-cover.png"}
      alt={book.volumeInfo.title}
    />
    <CardContent>
      <Typography variant="h6">{book.volumeInfo.title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {book.volumeInfo.authors?.join(", ")}
      </Typography>
      <Link href={`/books/${book.id}`} passHref>
        <Button variant="outlined" sx={{ mt: 1 }}>
          View Details
        </Button>
      </Link>
    </CardContent>
  </Card>
);

export default BookCard;
