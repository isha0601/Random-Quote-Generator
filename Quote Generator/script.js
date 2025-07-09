window.onload = () => {
  const quoteText = document.getElementById('quote');
  const authorText = document.getElementById('author');
  const newQuoteBtn = document.getElementById('new-quote');
  const copyQuoteBtn = document.getElementById('copy-quote');
  const toggleDarkBtn = document.getElementById('toggle-dark');
  const spinner = document.getElementById('spinner');
  const quoteBox = document.querySelector('.quote-box');
  const quoteCount = document.getElementById('quote-count');

  let count = 0;

  async function getQuote() {
    spinner.classList.remove('hidden');
    quoteBox.classList.add('fade');

    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/quotes`, {
        headers: {
          'X-Api-Key': 'YOUR_API_KEY'
        }
      });

      const data = await response.json();
      quoteText.textContent = `"${data[0].quote}"`;
      authorText.textContent = `— ${data[0].author}`;
      count++;
      quoteCount.textContent = count;

    } catch (error) {
      quoteText.textContent = "Oops! Couldn't fetch a quote.";
      authorText.textContent = "";
      console.error(error);
    } finally {
      spinner.classList.add('hidden');
      quoteBox.classList.remove('fade');
    }
  }

  newQuoteBtn.addEventListener('click', getQuote);

  copyQuoteBtn.addEventListener('click', () => {
    const quote = `${quoteText.textContent} ${authorText.textContent}`;
    navigator.clipboard.writeText(quote).then(() => {
      alert("Quote copied to clipboard! 📋");
    });
  });

  toggleDarkBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });

  // Auto-fetch on page load
  getQuote();
};
