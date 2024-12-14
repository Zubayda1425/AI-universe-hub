const showAllTrigger = () => {
    document.getElementById('seeAllBtn').style.display = 'none';
    infoPannel(true);
}

const infoPannel = async (status) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const dataJson = await res.json();
    const data = dataJson.data;
    const hubs = data.tools;

    aiUniverse(hubs, status);
}

const detailsInfo = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const dataJson = await response.json();
    const data = dataJson.data;

    showModal(data);
}


const showModal = (item) => {
    console.log('clicked');
    console.log(item);
    let feature = [];
    let integration = [];

    for (fea in item.features) {
        const value = '. ' + item.features[fea].feature_name + '<br>';
        feature.push(value);
    }
    if (Array.isArray(item.integrations)) {
        for (const int of item.integrations) {
            const value = '. ' + int + '<br>';
            integration.push(value);
        }
    }
    else {
        const value = 'No Data Found';
        integration.push(value);
    }
    let acc_text = ``;
    const acc = item.accuracy.score;
    // console.log(typeof (acc));
    if (typeof (acc) == 'number') {
        const acc_num = acc * 100;
        acc_text = `<p id="accuracy" class="bg-red-500 absolute py-1 px-3 rounded-md text-white top-0 right-0 m-3">${acc_num}% Accuracy</p>`;
        // console.log(html);
    }



    const modalContainer = document.getElementById('show_modal');
    modalContainer.innerText = '';

    const modal = document.createElement('div');
    modal.setAttribute('class', `relative mx-28 `);
    modal.innerHTML = `

        <div class="grid grid-cols-2 gap-x-10 bg-white rounded-xl  	p-5 ">
            <div class="bg-[#EB57570D] border-[#EB5757] border-2 rounded-xl p-8">
                <h1 class="text-black font-semibold text-xl">
                    ${item.description}
                </h1>
                <div class="grid grid-cols-3 text-center gap-x-5 my-7 font-semibold">
                    <div class="bg-white text-[#03A30A] py-5 ">
                        <p>${Array.isArray(item.pricing) ? item?.pricing[0]?.price?.split('/').join('/<br>') : item.pricing || 'Free Of Cost/'} <br> 
                        ${Array.isArray(item.pricing) ? item.pricing[0].plan : item.pricing || 'Basic'}</p>
                    </div>
                    <div class="bg-white text-[#F28927] py-5">
                        <p>${Array.isArray(item.pricing) ? item?.pricing[1]?.price?.split('/').join('/<br>') : item.pricing || 'Free Of Cost/'} <br> 
                        ${Array.isArray(item.pricing) ? item?.pricing[1]?.plan : item.pricing || 'Pro'} </p>
                    </div>
                    <div class="bg-white text-[#EB5757] py-5">
                        <p>${Array.isArray(item.pricing) ? item?.pricing[2]?.price?.slice(0, 11).split(' ').join('<br>') : item.pricing || 'Free Of Cost/'}  
                        ${Array.isArray(item.pricing) ? item?.pricing[2]?.plan : item.pricing || 'Enterprise'} </p>
                    </div>
                </div>
                <div class="flex justify-between">
                    <div>
                        <h1 class="text-black text-2xl font-semibold">Features</h1>
                        <p class="text-[#585858] "> ${feature.join('')}
                        </p>
                    </div>
                    <div class="mr-5">
                        <h1 class="text-black text-2xl font-semibold">Integrations</h1>
                        <p class="text-[#585858] ">
                        ${integration.join('')}
                        
                        </p>
                    </div>
                </div>
            </div>
            

            <div class="border-2 rounded-xl p-10 ">
                 <div class="mb-10 relative">
                    <img src="${item.image_link[0]}" alt="">
                    ${acc_text}
                </div>
                <div class="text-center">
                    <h1 class="font-semibold text-2xl text-black mb-5">Hi, how are you doing today?</h1>
                    <p class="text-[#585858] font-medium text-base">I'm doing well, thank you for asking. How can
                        I<br>assist you today?
                    </p>
                </div>
            </div>   
        </div>

        <form method="dialog">
            <button class=" btn btn-sm text-white btn-circle bg-[#EB5757] border-none absolute -right-2 -top-2 ">✕</button>
        </form>   
        
    `;

    modalContainer.appendChild(modal);
    show_modal.showModal();
}

const aiUniverse = (hubs, status) => {

    // console.log(hubs);
    if (!status) {
        hubs = hubs.slice(0, 6);
    }

    const cardContainer = document.getElementById('cards');
    cardContainer.innerText = '';
    hubs.forEach(hub => {

        let count = 1;
        const features = hub.features;
        const featureList = [];
        features.forEach(feature => {
            feature = count + '. ' + feature;
            count++;
            featureList.push(feature);
        });
        console.log(hub);


        const cardItems = document.createElement('div');
        cardItems.setAttribute('onclick', `detailsInfo("${hub.id}")`);
        cardItems.classList = `card bg-white border-t-2  shadow-xl`;
        cardItems.innerHTML = `
        <figure class="px-5 pt-5">
            <img src="${hub.image}" />
        </figure>
        <div class="card-body ">
            <div>
                <h2 class="card-title text-black">Features</h2>
                <p class="text-[#585858]">${featureList.join('<br>')}<p>
            </div>
            <hr>
            <div>
                <h2 class="card-title text-black">${hub.name}</h2>
                <div class="flex">
                    <img src="Frame.png" alt="">
                    <span class="text-[#585858] ml-2">${hub.published_in}</span>
                </div>
            </div>
        </div>
        `;
        cardContainer.appendChild(cardItems);

    });

    hubs = [];
}




infoPannel(false);
