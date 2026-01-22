function MainModule(listingsID = "#listings") {
  const me = {};


  const listingsElement = document.querySelector(listingsID);

  function getListingCode(listing) {
    return `<div class="col-4">
  <div class="listing card">
    <img
      src="${listing.picture_url}"
      class="card-img-top"
      alt="AirBNB Listing"
    />
    <div class="card-body">
      <div class="d-flex align-items-center mb-2">
        <img src="${listing.host_picture_url}" alt="${listing.host_name}" 
            class="rounded-circle me-2" style="width: 40px; height: 40px;">
        <strong>${listing.host_name}</strong>
      </div>
      <h2 class="card-title">${listing.name}</h2>
      <div>${listing.price}</div>
      <p class="card-text">
        ${listing.description ? listing.description.substring(0, 150) + '...' : 'No description'}
      </p>
      <a href="#" class="btn btn-primary">Go somewhere</a>

      <div class="alert alert-light small">
        <strong>Amenities:</strong> ${JSON.parse(listing.amenities).slice(0, 3).join(', ')}
      </div>
    
    </div>
  </div>
  <!-- /card -->
  </div>

  `;
  }

  function redraw(listings) {
    listingsElement.innerHTML = "";
    // for (let i = 0; i < listings.length; i++) {
    //   listingsElement.innerHTML += getListingCode(listings[i]);
    // }

    // for (let listing of listings) {
    //   console.log("listing", listing );
    //   listingsElement.innerHTML += getListingCode(listing);
    // }

    listingsElement.innerHTML = listings.map(getListingCode).join("\n");
  }

  async function loadData() {
    const res = await fetch("./airbnb_sf_listings_500.json");
    const listings = await res.json();


    me.redraw(listings.slice(0, 50));
  }

  me.redraw = redraw;
  me.loadData = loadData;

  return me;
}

const main = MainModule();


main.loadData();