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
        <div class="card   bg-base-100 shadow-xl p-5 border-2 lg:h-[500px]">
           <figure ><img src="${tool.image}" alt="${tool.name} " class="rounded-xl "/></figure>
                    <div class="card-body">
                    <h2 class="card-title ">Features</h2>
                    <ul id="${tool.id}"  class="mb-2">
                    </ul> 
                    <hr>
                    <div class ="flex justify-between items-center">
                      <div>
                        <h2 class="card-title pt-5  ">${tool.name}</h2>
                        <p>${tool.published_in}</p>
                      </div>
                      <button class="btn rounded-full text-2xl text-center text-[#EB5757]" onclick="tool_modal.showModal(); ToolInfoModel(${tool.id})" >></button>                    
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
};

const FList = (features, id) => {
    const list = document.getElementById(id);
    let num = 1

    for (const key in features) {
        // console.log(key[feature_name]);
    
        const li = document.createElement('li')
        li.innerText = num + ". " + 1;
        list.appendChild(li)
        num++;

    }
}
// model
const model_container = document.getElementById('Info-container-model')
async function ToolInfoModel(id) {
    const res = await fetch(` https://openapi.programming-hero.com/api/ai/tool/0${id}`);
    const data = await res.json();
    const detail = data.data;
    console.log(detail)

    model_container.innerHTML = `
    <div>
    <h3 class="text-2xl">${detail.description}</h3>
    <div class="flex justify-between items-center gap-4 text-base font-bold mt-5">
    <div class="text-center bg-white text-[#03A30A] p-4 rounded-xl flex-1 h-[100px]  flex flex-col justify-center">
    <p>${detail.pricing[0].price}</p>
    <p>${detail.pricing[0].plan}</p>
    </div>
    <div class="text-center bg-white text-[#F28927]  p-4 rounded-xl flex-1 h-[100px]   flex flex-col  justify-center">
    <p>${detail.pricing[1].price}</p>
    <p>${detail.pricing[1].plan}</p>
    </div>
    <div class="text-center bg-white text-[#EB5757] p-4 rounded-xl flex-1 h-[100px]   flex flex-col justify-center">
    <p>${detail.pricing[2].price}</p>
    <p>${detail.pricing[2].plan}</p>
    </div>  
    </div>
    <div class="flex justify-between items-center gap-4 text-base font-semibold mt-5">
    <div> 
    <h3 class="text-2xl ">Features</h3>
    <ul id="${detail.id}">
    </ul>
    </div>
    <div>
    <h3 class="text-2xl">Integrations</h3>
    <ul id="${detail.tool_name}" class="mt-3">
    </ul>
    </div>
    </div>
    </div>
    <div></div>
    `;
    featuresList(detail.integrations , detail.tool_name);
    FList(detail.features , detail.id);
    // featuresList()
}

aiDetails()