document.querySelector('.busca').addEventListener('submit',async (e)=>{
    e.preventDefault()
//async diz que vai código assincrono ou seja sem ordem
    let input = document.querySelector('#searchInput').value
    if(input !== '')
    {
        clearInfo()

        showWarning('Carregando...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=c4db5671ae40600b0c9d51bc8cf9977a&units=metric&lang=pt_br`

        let results = await fetch(url)
        let json = await results.json()

        if(json.cod == 200){
            showInformations({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                icon:json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
                description: json.weather[0].description
            })
            //console.log(json)
        }
        else{
            clearInfo()
            showWarning('Não Foi encontrada a cidade de '+ input)
        }
    }
    else{
        clearInfo()
    }
})

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg
}

function showInformations(json){
    showWarning('')

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`

    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC<sup>`

    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`

    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.icon}@2x.png`)

    document.querySelector('.tempDescricao').innerHTML = json.description

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle}deg)`

    document.querySelector('.resultado').style.display = 'block'
}

function clearInfo(){
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'
}