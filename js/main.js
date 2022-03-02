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
// load single item details starts here
const loadDetails = data => {
  const url = `https://openapi.programming-hero.com/api/phone/${data}`
  fetch(url)
      .then(res => res.json())
      .then(data => displayDetails(data.data))
}

// display single item detalis starts here
const displayDetails = info => {
  // clearing single details div if its available
  document.getElementById('display-details').textContent = ''
  const detailsDiv = document.getElementById('display-details')
  const div = document.createElement('div')
  div.innerHTML = `
   <div class="card w-100 mx-auto my-3">
   <img src="${info.image}" class="card-img-top w-50 mx-auto pt-2" alt="...">
   <div class="card-body">
   <h3 class="card-title fw-bolder">${info.name}</h3>
   <h4 class="card-title">${info.releaseDate ? info.releaseDate : 'No release date found'}</h4>
   <h4 class="card-title">${info.brand}</h4>
   <h4 class="card-title fw-bold my-4">Main-Features:</h4>
   <h5 class="card-title">
   <span class="fw-bold">Chipset:</span> ${info.mainFeatures.chipSet ? info.mainFeatures.chipSet : 'Not Available'},<br>
   <span class="fw-bold">Storage:</span> ${info.mainFeatures.memory ? info.mainFeatures.memory : 'Not Available'},<br>
   <span class="fw-bold">Display:</span> ${info.mainFeatures.displaySize ? info.mainFeatures.displaySize : 'Not Available'},<br>
   <span class="fw-bold">Sensors: </span>${info.mainFeatures.sensors ? info.mainFeatures.sensors.join(',') : 'Not Available'}</h5>
</div>
  `;
  detailsDiv.appendChild(div)

  
}