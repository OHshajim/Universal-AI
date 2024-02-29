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
        <div class="card   bg-base-100 shadow-xl p-5 border-2 ">
           <figure class="h-[300px] " ><img src="${tool.image ? tool.image : 'no image available'}" alt="${tool.name}" class="rounded-xl"/></figure>
                    <div class="card-body">
                    <h2 class="card-title ">Features</h2>
                    <ul id="${tool.id}"  class="mb-2">
                    </ul> <hr>
                    <div class ="flex justify-between items-center">
                      <div>
                        <h2 class="card-title pt-5  ">${tool.name}</h2>
                        <p>${tool.published_in}</p>
                      </div>
                      <button class="btn rounded-full text-2xl text-center text-[#EB5757]">></button>                    
                    </div>
                    </div>
        </div>
        `;
        cards.appendChild(div)
        featuresList(tool.features, tool.id)

    });

}
// display features lists
const featuresList = (features, id) => {
    const list = document.getElementById(id);
    let num = 1
    features.forEach(feature => {
        const li = document.createElement('li')
        li.innerText = num + ". " + feature;
        list.appendChild(li)
        num++;
    });
}

aiDetails()