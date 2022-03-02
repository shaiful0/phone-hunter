const loadSearchResult = () => {
  const searchValue = document.getElementById('input-field').value
  
  if (searchValue.length != 0) {
      const caseSensitiveValue = searchValue.toLowerCase()
      const url = `https://openapi.programming-hero.com/api/phones?search=${caseSensitiveValue}`
      fetch(url)
          .then(res => res.json())
          .then(data => displayResult(data))
      // clear input field
      document.getElementById('input-field').value = ''
  }
  else {
      document.getElementById('search-results').textContent = ''
      document.getElementById('display-details').textContent = ''
      document.getElementById('see-more').style.display = 'none'
      errorDisplay('block')
  }
}