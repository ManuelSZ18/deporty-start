fetch('http://localhost:5173/register')
  .then(async (res) => {
    const text = await res.text();
    // Look for SvelteKit error payload in HTML
    const match = text.match(/"status":500,"message":"([^"]+)"/);
    if (match) {
      console.log('Error message:', match[1]);
    } else {
      console.log('Could not find concise block. Length:', text.length);
      console.log(text.substring(text.length - 2000));
    }
  })
  .catch(console.error);
