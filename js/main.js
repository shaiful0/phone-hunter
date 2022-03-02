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
  // showing card
  sliced.forEach(item => {
 const sectionContainer = document.getElementById('search-results')
  const div = document.createElement('div')
 div.classList.add('col')
  div.innerHTML = `
  <div class="card h-100 bg-white">
      <img src="${item.image}" class="card-img-top" alt="...">
      <div class="card-body d-flex flex-column justify-content-between">
          <h4 class="card-title fw-bold">Name: ${item.phone_name}</h4>
          <h5 class="card-title fw-bold">Brand: ${item.brand}</h5>
           <div class="d-flex justify-content-center">
              <button class="btn btn-primary w-75" onclick="loadDetails('${item.slug}')">See Details</button>
          </div>
      </div>
  </div>
  `;
 sectionContainer.appendChild(div)
// show more button hiding
 document.getElementById('see-more').style.display = 'none'
})
}
  // clearing contents of textcontents 
  document.getElementById('search-results').textContent = ''
  document.getElementById('display-details').textContent = ''
  // showing each card by foreach loop
  sliced.forEach(item => {
  const sectionContainer = document.getElementById('search-results')
  const div = document.createElement('div')
  div.classList.add('col')
  div.innerHTML = `
    <div class="card h-100 bg-white">
        <img src="${item.image}" class="card-img-top" alt="...">
        <div class="card-body d-flex flex-column justify-content-between">
            <h4 class="card-title fw-bold">Name: ${item.phone_name}</h4>
            <h5 class="card-title fw-bold">Brand: ${item.brand}</h5>
            <div class="d-flex justify-content-center">
                <button class="btn btn-primary w-75" onclick="loadDetails('${item.slug}')">See Details</button>
            </div>
        </div>
    </div>
`;
     
      sectionContainer.appendChild(div)
  })
}