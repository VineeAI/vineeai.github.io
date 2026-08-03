import { pipeline } 
from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2";


import { documents } 
from "./documents.js";


let extractor;
let documentVectors = [];


async function loadModel(){

extractor = await pipeline(
"feature-extraction",
"Xenova/all-MiniLM-L6-v2"
);


// Create embeddings for documents

for(let doc of documents){

let output = await extractor(
doc.text,
{
pooling:"mean",
normalize:true
}
);


documentVectors.push({
text:doc.text,
vector:output.data
});

}


console.log("Embedding model loaded");
console.log("Documents embedded:", documentVectors.length);
console.log(documentVectors);

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

window.semanticSearch = async function(){

let query =
document
.getElementById("searchInput")
.value;
console.log("Query:", query);

let queryEmbedding =
await extractor(
query,
{
pooling:"mean",
normalize:true
}
);
console.log(queryEmbedding);

let results =
documentVectors.map(doc=>{

    let score =
    cosineSimilarity(
        queryEmbedding.data,
        doc.vector
    );

    return {

        text:doc.text,

        score:score

    };

});

console.log(results);


results.sort(
(a,b)=>b.score-a.score
);


let output =
document.getElementById(
"searchResults"
);


output.innerHTML="";


results.slice(0,3)
.forEach(result=>{


output.innerHTML += `

<div class="result-card">

<p>${result.text}</p>

<p>
Similarity Score:
${result.score.toFixed(3)}
</p>

</div>

`;

});


}
