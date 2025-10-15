const apiKey = 'SUA_CHAVE_AQUI'
const form = document.getElementById('form')
const cityInput = document.getElementById('city')
const output = document.getElementById('output')
const tempEl = document.getElementById('temp')
const descEl = document.getElementById('desc')
const extraEl = document.getElementById('extra')
const iconEl = document.getElementById('icon')
const message = document.getElementById('message')


async function buscarClima(cidade){
if(!cidade) return showMessage('Digite o nome de uma cidade.')
showMessage('Carregando...')
output.hidden = true
try{
const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${apiKey}&units=metric&lang=pt_br`
const res = await fetch(endpoint)
if(!res.ok) throw new Error('Erro na requisição')
const data = await res.json()
render(data)
showMessage('')
}catch(err){
showMessage('Cidade não encontrada ou erro na API.')
}
}


function render(data){
const t = Math.round(data.main.temp)
const descricao = data.weather[0].description
const icon = data.weather[0].icon
const humidity = data.main.humidity
const wind = Math.round(data.wind.speed * 3.6)


tempEl.textContent = `${t}°C`
descEl.textContent = descricao
extraEl.textContent = `Umidade: ${humidity}% · Vento: ${wind} km/h`
iconEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${descricao}" width="100" height="100">`


output.hidden = false
}


function showMessage(text){
message.textContent = text
}


form.addEventListener('submit', e => {
e.preventDefault()
const cidade = cityInput.value.trim()
buscarClima(cidade)
})


cityInput.addEventListener('keydown', e => {
if(e.key === 'Enter'){
e.preventDefault()
buscarClima(cityInput.value.trim())
}
})