let api_key= "6483a6e211092b09b7466883e175cd26";

let movie_trending_http = "https://api.themoviedb.org/3/trending/all/week?"

fetch(`${movie_trending_http}` + new URLSearchParams({
    api_key: api_key
  }))
  .then(res => res.json())
  .then(data => {
    counter_z = 10
    list_number = 1
    
    data.result.forEach(item => {
        cards(item, counter_z, list_number)
        list_number++;
        counter_z = counter_z - 1;
    })
        
    
   
  })

const ul_container = document.getElementById('ul1')

const cards = (data, z , i) => {
    ul_container.innerHTML += `<div class="item_container expanded" style="z-index: ${z}">
    <div class="item_number">
      ${i}
    </div>
    <div class="image_info_container">
      <div class="info_container">
        <div class="info_container_inner">
          <div class="info_number">
            <img class="number_image" width="512" height="512" src="https://assets.codepen.io/1890963/1.png?format=auto" alt="1">
          </div>
          <div class="info_bottom_container">
            <div class="info_bottom_text">
              Watched for <strong>148.72 million hours</strong> this week.
              <a href="#">Watch now</a>
            </div>
          </div>
        </div>
      </div>
      <div class="image">
        <picture>
          <source srcset="https://dnm.nflximg.net/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABcZCcruNL4qg1uy7rbRagPLF2_kMt2hWh5utDUKt3DgYuhAE-Qrr1wA8b2W9vFu9ABPSY1cNzQPBoPpWSZVvaoQMZAEFXfsXrcmUNSO5YTdjIdKMDtjYbTYKRR9J.webp?r=5f1" type="image/webp" media="(max-width: 400px)">
          <source srcset="https://assets.codepen.io/1890963/AAAABeyXW3mUTPqrK4NtKn2vJlcYmKVJU5XCn6Zeis_EdNEjMmhs5rRudqWRYo2Pj7R2_pYwHviXeOrP1GKgaC4flMu_QndVSRQ8Fk-B_al3ZGz5JOXyZ28ZK7I49UdxrQ.jpg?format=auto" type="image/jpeg" media="(max-width: 400px)">
          <source srcset="https://assets.codepen.io/1890963/AAAABeyXW3mUTPqrK4NtKn2vJlcYmKVJU5XCn6Zeis_EdNEjMmhs5rRudqWRYo2Pj7R2_pYwHviXeOrP1GKgaC4flMu_QndVSRQ8Fk-B_al3ZGz5JOXyZ28ZK7I49UdxrQ.jpg?format=auto" type="image/jpeg">
          <img class="" style="margin-left: 0px;" src="https://assets.codepen.io/1890963/AAAABeyXW3mUTPqrK4NtKn2vJlcYmKVJU5XCn6Zeis_EdNEjMmhs5rRudqWRYo2Pj7R2_pYwHviXeOrP1GKgaC4flMu_QndVSRQ8Fk-B_al3ZGz5JOXyZ28ZK7I49UdxrQ.jpg?format=auto" alt="The Guilty"></picture>
        <div class="bottom_title">
          <div class="bottom_title_text">
            Red notice
          </div>
        </div>
      </div>
    </div>
  </div>`
}
  