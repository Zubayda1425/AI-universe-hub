

const infoPannel = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const dataJson = await res.json();
    const data = dataJson.data;
    const hubs = data.tools;

    aiUniverse(hubs);
}


const aiUniverse = (hubs) => {
    console.log(hubs);
    hubs.forEach(element => {
        console.log(element);

        
    });
}


infoPannel();