import SanityClient from "@sanity/client";
import  imageUrlBuilder  from "@sanity/image-url";

const client = SanityClient ({
    projectId: "gcla3u0l",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
//run this to add exception for localhost 3000 CORS 
// sanity cors add http://localhost:3000
export default client;