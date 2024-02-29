async function aiDetails() {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools')
    const data = await res.json();
    const tools = data.data.tools;
    console.log(tools);
    displayTools(tools)

}

// display tools or AI
const displayTools = (tools) => {
    const cards = document.getElementById('card-container');

    tools.forEach(tool => {
        // console.log(tool.image);
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl p-5">
           <figure ><img src="${tool.image ? tool.image : 'no image available'}" alt="${tool.name} class="rounded-xl" /></figure>
                    <div class="card-body">
                    <h2 class="card-title ">Features</h2>
                    <ul id="features">
                    </ul>
                    <h2 class="card-title pt-5 border-t border-[#111111]">${tool.name}</h2>
                      <p>${tool.published_in}</p>
                      <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
        </div>
        `;
        cards.appendChild(div)
        featuresList(tool.features)

    });

}
function featuresList(features) {
    const list = document.getElementById('features');
    features.forEach(feature => {
        const li = document.createElement('li')
        li.innerText = feature;
        list.appendChild(li)
    });
}

aiDetails()