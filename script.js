// API Keys e URLs
const apiKey = "447954334ef4e0c591d2ef05536ccc95";
const apiCountryURL = "https://flagsapi.com/";
const apiCountryParams = "/flat/64.png";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

// Seletores de elementos DOM
const cityInput = document.querySelector("#cityInput");
const weatherForm = document.querySelector("#weatherForm");
const weatherInfo = document.querySelector("#weatherInfo");
const cityNameElement = document.querySelector("#cityName");
const temperatureElement = document.querySelector("#temperature");
const weatherElement = document.querySelector("#weather");

// Exibe ou oculta informações climáticas
const showWeatherInfo = (isVisible) => {
    weatherInfo.style.display = isVisible ? "block" : "none";
};

// Obtem dados de clima da API
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const response = await fetch(apiWeatherURL);

    if (!response.ok) {
        throw new Error("Cidade não encontrada");
    }

    return await response.json();
};

// Atualiza a interface com os dados do clima
const updateWeatherInfo = (data) => {
    const { name, main, weather, sys } = data;

    // Nome da cidade
    cityNameElement.textContent = `${name}, ${sys.country}`;
    // Temperatura
    temperatureElement.textContent = `Temperatura: ${parseInt(main.temp)}°C`;
    // Descrição do clima
    weatherElement.textContent = `Clima: ${weather[0].description}`;

    // Atualiza a cor do plano de fundo
    const isRaining = weather[0].main.toLowerCase().includes("rain");
    document.body.style.backgroundColor = isRaining ? "#a9a9a9" : "#87ceeb"; // Cinza para chuva, azul para outros climas
};

// Lida com a submissão do formulário
weatherForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Por favor, insira o nome de uma cidade!");
        return;
    }

    try {
        showWeatherInfo(false); // Esconde os dados antigos
        const weatherData = await getWeatherData(city);
        updateWeatherInfo(weatherData);
        showWeatherInfo(true); // Mostra os novos dados
    } catch (error) {
        alert("Erro: Não foi possível encontrar informações para esta cidade.");
    }
});
