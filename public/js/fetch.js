const APIKey = 'fa83475d320868961fe9c24c85b81f16';
let object = {};

let call= ()=>{
    let nav = document.querySelector('nav').offsetHeight;
    let body = document.querySelector('.body');

    if(window.innerWidth > 800){    
        body.style.height = `calc(100vh - ${nav}px)`;
    }
}

//trigger focus mode in form when keyboard icon is clicked
let keyboard = document.querySelector('.keyboard');
keyboard.addEventListener('click',()=>{
    let input = document.querySelector('input');
    input.focus();
})

//sending response to screen and changing some elements position
let updatePage = (object)=>{
    let navsearch = document.querySelector('.navsearch');
    let form = document.querySelector('.form');
    let weather_text = document.querySelector('.weather_text');
    let big = document.querySelector('.big')
    let biggest = document.querySelector('.biggest')
    console.log(object);
    weather_text

    if(object.code !== 404){
        if(weather_text.childElementCount != 3){form[0].classList.add('inputchange');
            form.classList.remove('form');
            big.style.zIndex = '1';
            form.classList.add('form_change');
            navsearch.replaceChild(form,navsearch.childNodes[0]);}
            navsearch.style.visibility = "visible"
            
            
            weather_text.innerHTML = "";
            let name = document.createElement('h1');
            let main = document.createElement('p');
            let temp = document.createElement('p');
            let icon = document.createElement('img');
            
            icon.classList.add('Weather_icon')
            icon.src = `http://openweathermap.org/img/wn/${object.icon}@2x.png`;
            
            big.innerHTML = '';
            big.append(icon);
            name.textContent = object.name;
            name.classList.add('name')
            main.innerHTML = "<b>Weather: </b>" + object.main_description;
            temp.innerHTML = `<b>Temperature:</b> ${Math.floor(object.temp - 273.15)} deg Celcius`;
            biggest.textContent = `${Math.floor(object.temp - 273.15)} deg C`;
            weather_text.append(name,main,temp);
            setTimeout(()=>{
                weather_text.style.color = 'red'
            },1000)
    }   
}

//getting form data and returning a response
let go = document.querySelector('.form');
go.addEventListener('submit',(e)=>{
    e.preventDefault();
    let city = document.forms["form"]["city"].value;
    let url = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    fetch(url).then(value => value.json()).then(data => {
         
        if(data.cod == 404){
           return alert(data.message)
        }
        else{
            object = {
                code: data.code,
                name: data.name,
                temp: data.main.temp,
                visibility:data.visibility,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                main_description: data.weather[0].main
            }
            updatePage(object)
        } 
    }
    )
    .catch(err=>{console.log(err);alert('Request could not be made.Try again later')})
}
)