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


const showdetails = () => {
    console.log('clicked');
}

const aiUniverse = (hubs, status) => {

    console.log(hubs);
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
        cardItems.setAttribute('onclick', 'showdetails()');
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