<script>
    export let object;
</script>
  
  <main class="bg-stone-100 dark:bg-stone-800">
    <div class="container ">
      <!-- TODO: full size takes too long to load, add support for loading upon user request and allow magnification -->
        <!--        <img src={`https://0.api.artsmia.org/full/${object.id}.jpg`}  -->
      
        <!-- <svelte:component class="" this={MacyComponent} bind:macy options={options}> -->
            <!-- {#each arts as art} -->
                <!-- <a class="flex-1" href={`/objects/${art._source.id}`}>
                    <img class="hover:opacity-75 flex-1" src={`https://0.api.artsmia.org/400/${art._source.id}.jpg`} alt={art._source.title}>
                </a> -->
            <!-- {/each} -->
        <!-- </svelte:component> -->
        <img src={`https://0.api.artsmia.org/800/${object.id}.jpg`} 
        onerror={`this.onerror=null;this.src="https://0.api.artsmia.org/400/${object.id}.jpg";`} 
        alt={object.title}
      >      
      <p class="text-2xl"> {object.title}</p>
      <!-- <h1></h1> -->
      {#if object?.artist_suggest?.output}
        <h3> {object.artist_suggest.output} </h3>
      {:else if object?.artist}
        <h3> {object.artist} </h3>
      {:else}
        <h3>Artist Unknown</h3>
      {/if}
      <!-- https://0.api.artsmia.org/full/122262.jpg -->
      <!-- <pre>{JSON.stringify(object, null, 2)}</pre> -->
    </div>
  </main>
  
  <style>
    main {
      font-family: sans-serif;
    }
  
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0px 20px;
    }
  
    .container > * {
      max-height: 600px;
    }
  </style>

<!-- {
  id: "1863",
  title: "Wallow Crag, Cumberland",
  medium: "Oil on canvas",
  classification: " Paintings",
  dimension: "17 3/4 x 24 3/4 in. (45.09 x 62.87 cm) (canvas)",
  object_name: "Painting",
  continent: "Europe",
  country: "England",
  culture: null,
  dated: "1862",
  room: "Not on View",
  style: "19th century",
  inscription: "Monogram and Date",
  signed: "LRC in red: [GsW 1862] (\'Gs\' intertwined)",
  markings: "",
  text: "",
  description: "",
  provenance: "",
  portfolio: "From ",
  creditline: "The Collector's Fund Group",
  accession_number: "71.49",
  artist: "Artist: George Stanfield Walters",
  role: "Artist",
  nationality: "British",
  life_date: "British, 1838 - 1934",
  image_copyright: "",
  department: "European Art",
  rights_type: "Public Domain",
  image: "valid",
  image_width: 4702,
  image_height: 3395,
  restricted: 0,
  public_access: "1",
  curator_approved: 0,
  catalogue_raissonne: null,
  art_champions_text: null,
  see_also: [
  ""
  ],
  artist_suggest: {
  input: [
  "George",
  "Stanfield",
  "Walters"
  ],
  output: "George Stanfield Walters"
  } -->