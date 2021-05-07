(() => {
    let pokeSprite, getID, pokeName, pokeID, pokeMove1, pokeMove2, pokeMove3, pokeMove4, api_url, api_urlDex,api_urlEvolve, evolveName, evolvePic;

    async function getData() {
        const response = await fetch(api_url)
        const data = await response.json();

        console.log(data);
        pokeSprite = data.sprites["front_default"];
        pokeName = data.name;
        pokeID = data.id;
        pokeMove1 = data.moves[0]["move"]["name"];
        pokeMove2 = data.moves[1]["move"]["name"];
        pokeMove3 = data.moves[2]["move"]["name"];
        pokeMove4 = data.moves[3]["move"]["name"];

        console.log(pokeSprite);
        console.log(pokeName);
        console.log(pokeID);
        console.log(pokeMove1);
        console.log(pokeMove2);
        console.log(pokeMove3);
        console.log(pokeMove4);

        getDataDex()
        document.getElementById("pokeName").textContent= capitalize(pokeName);
        document.getElementById("pokeID").textContent= pokeID;
        document.getElementById("pokeMove1").textContent= capitalize(pokeMove1);
        document.getElementById("pokeMove2").textContent= capitalize(pokeMove2);
        document.getElementById("pokeMove3").textContent= capitalize(pokeMove3);
        document.getElementById("pokeMove4").textContent= capitalize(pokeMove4);
        document.getElementById("pokeSprite").src = pokeSprite;


    }
    async function getDataDex() {
        const responseDex = await fetch(api_urlDex)
        const dataDex = await responseDex.json();
        if (dataDex["evolves_from_species"]){
            evolveName= dataDex["evolves_from_species"]["name"];

            api_urlEvolve = 'https://pokeapi.co/api/v2/pokemon/' + evolveName;

            console.log(evolveName);
            console.log(api_urlEvolve);

            getDataEvolve()
        }
    }

    async function getDataEvolve() {
        const responseEvolve = await fetch(api_urlEvolve)
        const dataEvolve = await responseEvolve.json();
        evolvePic = dataEvolve.sprites["front_default"];
        console.log(evolvePic);
    }

    document.getElementById("searchPoke").addEventListener("click", function () {
        getID = (document.getElementById("inputPoke").value).toLowerCase()
        api_url = 'https://pokeapi.co/api/v2/pokemon/' + getID;
        api_urlDex = 'https://pokeapi.co/api/v2/pokemon-species/' + getID;
        getData()
    })
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

})();