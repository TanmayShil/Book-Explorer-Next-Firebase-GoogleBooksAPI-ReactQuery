// import styles from "@/styles/Home.module.css";
import BookCard from "@/components/BookCard";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { useBooks } from "@/hooks/react-query/useBooks";
import { Container, Typography } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const { data, isLoading, error } = useBooks(query);

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
          Search Books
        </Typography>
        <SearchBar query={query} onChange={setQuery} />
        {isLoading && <p>Loading...</p>}
        {error && <p>Failed to load data</p>}
        {data?.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </Container>
    </>
  );
}
