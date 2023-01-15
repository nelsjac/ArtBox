export async function get({ params }) {
    // `params.id` comes from [id].js
    const res = await fetch(`https://search.artsmia.org/id/${params.id}`);
    const object = await res.json();

    if (object) {
      return {
        body: {object }
      };
    }
   
    return {
      status: 404
    };
  }