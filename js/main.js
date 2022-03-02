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

//function for error message
const errorDisplay = currentStatus => {
  document.getElementById('error-msg').style.display = currentStatus
}
// display result 
const displayResult = (result) => {
  // removing error message 
  errorDisplay('none')
  // checking if input keywords 
  if (result.status == false) {
      // showing error msg
      errorDisplay('block')
  }
  let sliced = result.data
  document.getElementById('see-more').style.display = 'none'
  
  if (result.data.length > 20) {
      // slicing items 
      sliced = result.data.slice(0, 20)
      document.getElementById('see-more').style.display = 'block'
  }
  const seeMore = document.getElementById('see-more')
  // seemore button
  seeMore.onclick = () => {
      //sliced variable
      sliced = result.data
      // clearing contents
      document.getElementById('search-results').textContent = ''
      document.getElementById('display-details').textContent = ''