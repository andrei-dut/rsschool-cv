let geoPosition;
let nameCountry;
let btnLanguages = document.querySelector(".btn-languages");
import changeLang from './weather';
ymaps.ready(init);
export default function init(){
    let country;
    let myMap = new ymaps.Map("map", {
        center: [53.902284,27.561831],
        zoom: 5
    });
    let suggestView1 = new ymaps.SuggestView('suggest');
    ymaps.geolocation.get({ 
        provider: 'auto',
        mapStateAutoApply: true
    }).then(function (result) {
        country = result.geoObjects.get(0).properties.getAll().description.split(',')[0];
        myMap.geoObjects.add(result.geoObjects);
        showPosition(result.geoObjects.position, country);
    });
    document.querySelector('.search__field').addEventListener('keypress', (e)=> {
        if(e.code == 'Enter') search()
    })
document.querySelector('.search__btn-search').addEventListener('click', search)
  function search()
{ 

    ymaps.geocode(document.querySelector('.search__field').value, {
        results: 1
    }).then(function (res) {
        country = res.geoObjects.get(0).properties.getAll().description.split(',')[0];
        
            let firstGeoObject = res.geoObjects.get(0),
                coords = firstGeoObject.geometry.getCoordinates(),
                bounds = firstGeoObject.properties.get('boundedBy');
                showPosition(coords, country);
            myMap.setBounds(bounds, {
                checkZoomRange: true
            });          
        });
}
}

function showPosition(position, country) {
    geoPosition = position;
    nameCountry = country;
        let lang = localStorage.getItem('lang')
        if (lang == null) lang = 'en';
    changeLang(position , country, lang );

}
changePage()
function changePage(){
    document.querySelector(".btn-en").addEventListener('click',()=> {
        let div = document.querySelector(".btn-ru");
        btnLanguages.append(div);
        btnLanguages.classList.toggle('btn-languages-active');
        localStorage.setItem('lang', 'en');
        changeLang(geoPosition , nameCountry , 'en')})
    document.querySelector(".btn-ru").addEventListener('click',()=> {
        let div = document.querySelector(".btn-en");
        btnLanguages.append(div);
        btnLanguages.classList.toggle('btn-languages-active');
        localStorage.setItem('lang', 'ru');
        changeLang(geoPosition, nameCountry , 'ru')})
}


