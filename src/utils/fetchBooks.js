export async function fetchBooks() {
    const res = await fetch("https://opensheet.elk.sh/1Arkmef5FPHhfBuwC8_1jyfQyMW1za8lxcASQhrkauy8/booklist"); // Change the URL unless you want boring books (Pun Intended - I love books!)
    return res.json();
  }