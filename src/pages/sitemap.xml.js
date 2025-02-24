import { fetchBooks } from "../utils/fetchBooks";

export async function GET() {
  const books = await fetchBooks();
  return new Response(
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>https://sheetbook.iabhinavj.com/</loc></url>
      ${books.map(book => `<url><loc>https://sheetbook.iabhinavj.com/book/${book.slug}</loc></url>`).join('')}
    </urlset>`,
    { headers: { "Content-Type": "application/xml" } }
  );
}