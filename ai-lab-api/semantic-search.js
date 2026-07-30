import { pipeline } 
from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2";


import { documents } 
from "./documents.js";


let extractor;


async function loadModel(){

extractor = await pipeline(
"feature-extraction",
"Xenova/all-MiniLM-L6-v2"
);


console.log(
"Embedding model loaded"
);

}


loadModel();

function cosineSimilarity(a,b){

let dot=0;

let normA=0;

let normB=0;


for(let i=0;i<a.length;i++){

dot += a[i]*b[i];

normA += a[i]*a[i];

normB += b[i]*b[i];

}


return dot /
(Math.sqrt(normA)*Math.sqrt(normB));

}
