
//Alla globala variabler som behövs och kan nås från alla platser i koden
const btn = document.querySelector('#inputButton');
const imgContainer = document.querySelector('#imgContainer');
const imgWaitingAnimation = document.querySelector('#imgWaitingAnimation');
const h1 = document.createElement('h1');
document.body.append(h1);

//animationen som kallas när man trycker på search-knappen
const divAnimation = {
    targets: '#imgWaitingAnimation',
    //gör så att objektet roterar. Anges i degrees
    rotate: '360deg',

    //anger hur länge animationen varar.
    duration: 900,

    //den ska loopa när man trycker på play
    loop: true,
    easing: 'linear',

    //den ska inte auto-playa för vi ska kunna styra den med kontrollen.
    autoplay: false,

}
const help = anime(divAnimation);

btn.addEventListener('click', getImages);

function getImages(event) {
    event.preventDefault();
    //samtliga "input-fälten":

    //textinput för texten som användaren matar in
    const textInput = document.querySelector('#textInput');
    const text = textInput.value.toLowerCase();
    console.log(text);
    //numberinput för antal bilder användaren matar in
    const numberInput = document.querySelector('#numberInput');
    const number = numberInput.value;
    console.log(number);
    //radiobuttons för val av storlek
    const radioButtons = document.querySelectorAll('input[name="size"]');
    let selectedSize;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedSize = radioButton.value;
            break;
        }
    }
    //drop-down menyn med sortinput
    const sortInput = document.querySelector('#sortInput');
    const value = sortInput.value;


    //if-sats som kontrollerar om alla fälten är ifyllda och skickar meddelanden till användaren utifrån vad som är ifyllt och/ eller vad som inte är ifyllt:
    if (text == '' && number == '' && selectedSize == undefined) {

        h1.innerText = "Du måste skriva in ett sökord, antal bilder som du vill visa, storleken på dem samt hur du vill visa dem!"
        h1.style.color = 'red';
        h1.style.textAlign = 'center';
        imgContainer.innerText = '';

    }

    else if (number == '' && selectedSize == undefined && value == '') {

        h1.innerText = "Du måste skriva in antal bilder som du vill visa, storleken på dem samt hur du vill visa dem!"
        h1.style.color = 'red';
        h1.style.textAlign = 'center';
        imgContainer.innerText = '';

    }

    else if (number == '' && selectedSize == undefined) {

        h1.innerText = "Du måste skriva in antal bilder som du vill visa och storleken på dem!"
        h1.style.color = 'red';
        h1.style.textAlign = 'center';
        imgContainer.innerText = '';

    }
    else if (text == '' && number == '') {

        h1.innerText = "Du måste skriva in ett sökord och antal bilder som du vill visa!"
        h1.style.color = 'red';
        h1.style.textAlign = 'center';
        imgContainer.innerText = '';

    }

    else if (text == '') {

        h1.innerText = "Du måste skriva in ett sökord!"
        h1.style.color = 'red';
        h1.style.textAlign = 'center';
        imgContainer.innerText = '';

    }
    else if (number == '') {

        h1.innerText = "Du måste ange antalet bilder som du vill söka på!";
        h1.style.color = 'red';
        h1.style.textAlign = 'center';
        imgContainer.innerText = '';

    }
    else if (selectedSize == undefined) {

        h1.innerText = "Du måste ange storleken på bilderna du vill få fram!";
        h1.style.color = 'red';
        h1.style.textAlign = 'center';
        imgContainer.innerText = '';

    }
    else if (value == '') {

        h1.innerText = "Du måste ange hur du vill att bilderna visas!";
        h1.style.color = 'red';
        h1.style.textAlign = 'center';
        imgContainer.innerText = '';
    }

    else {
        //Anropar "vänt-animationen"
        help.play();

        //"Länkar" en bild till img-elementet som jag har valt för animationen 
        document.querySelector('#divAnimation');
        imgWaitingAnimation.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyn88EhwxQJmEzMJ4AO5jziF6N9Yt5EQFwen1ItI-dBvLTwmJB0fGcZv5O_xiKcsrq6bw&usqp=CAU";

        //Rensar innehållet i imgContainern för att kunna skapa plats för bilderna
        imgContainer.innerText = '';

        //Anropar funktionen som ska rendera bilderna från flickr + Tömmer alla input från användaren,samt error-meddelanden om det fanns något/några
        fetchUsersImage(text, number, selectedSize, value);
        textInput.value = '';
        numberInput.value = '';
        radioButtons.value = '';
        sortInput.value = '';
        h1.innerText = '';
    }

    function fetchUsersImage(textPar, numberPar, radioButtonsPar, value) {

        //hämtar API:et från flickr med den personliga nyckeln som man kan skapa på hemsidan. Jag har ersatt attributen som vi som krav skulle ha med så att användaren kan välja attributen ssjälv utifrån värdena på inputen som användaren har matat in
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=80ca20d642298b335e7370364e1e2a2c&text=${textPar}&sort=${value}&per_page=${numberPar}&format=json&nojsoncallback=1`

        // Hämtar url:en
        fetch(url)
            //gör om det till json-objekt
            .then(response => response.json())
            .then(results => {
                // Loopar igenom arrayen för att kunna hämta de olika objekten som skapas i div:en som har id="imgContainer"
                const photoArr = results.photos.photo;

                //Pausar "vänt-animationen"
                help.pause();

                //"Tömmer" "vänt-animationen" så att jag på dess plats kan få upp bilderna som renderas
                imgWaitingAnimation.src = '';

                //For-sats för att "stegra" igenom alla renderade bilderna
                photoArr.forEach(element => {
                    //Deklarerar de renderade bilderna i en variabel + ger dem attribut 
                    const flickrImages = document.createElement('img');
                    document.querySelector("img").naturalWidth;
                    //ger de renderade bilderna flickrImages ett klass-attribut
                    flickrImages.setAttribute("class", "imagesInContainer")
                    //Appendar de renderade flickr-bilderna till imgContainer
                    imgContainer.append(flickrImages);
                    //Adressen för de renderade bilderna så att de ska kunna visas utifrån attributen som användaren matat in
                    flickrImages.src = `https://live.staticflickr.com/${element.server}/${element.id}_${element.secret}_${radioButtonsPar}.jpg`;

                    //EXTRA FUNKTIONALITET 1 - när man klickar på en eller flera bilder så ska de markeras och synas på annat sätt än resten av bilderna så att man vet vilka man klickat på för att exempelvis välja ut vilka man vill använda

                    //Lägger till en Eventlistener på flickrImages så att den / de valda bilderna visas på det sätt som jag valt genom de valda attributen i css:en
                    flickrImages.addEventListener("click", () => {
                        flickrImages.classList.add(".selectedImages");
                        flickrImages.classList.toggle("selectedImages");
                    })

                    //EXTRA FUNKTIONALITET 2 - Skapar en slide där man kan visa bilderna och där de kan röra sig mot sidorna, beroende på vad användaren väljer

                    //Deklarerar variabler till höger- och vänsterknappen
                    let prevBtn = document.getElementById('prev');
                    let nextBtn = document.getElementById('next');

                    //Deklarera variabeln till sliden och appendar imgContainer till den
                    let carousel = document.querySelector(".carousel");
                    carousel.append(imgContainer);

                    //Deklarerar variablen som räknar bilderna och ger den startvärdet 0.
                    let idx = 0;

                    //Funktion med if-sats för att röra bilderna antingen mot höger eller mot vänster beroende på vilken knapp användaren trycker på
                    function changeImage() {
                        if (idx > numberPar - 1) {
                            idx = 0;
                        } else if (idx < 0) {
                            idx = numberPar - 1;
                        }

                        // If-sats som kontrollerar vilken radio-button som är ibockad ock skickar värdet (n,c,b) som motsvarar den valda storleken på bilderna och kan utifrån den skapa hur mycket/avståndet som bilderna ska röra sig i x-led
                        if (radioButtonsPar === "n") {
                            imgContainer.style.transform = `translateX(${-idx * 300}px)`;
                        } else if (radioButtonsPar === "c") {
                            imgContainer.style.transform = `translateX(${-idx * 750}px)`;
                        } else if (radioButtonsPar === "b") {
                            imgContainer.style.transform = `translateX(${-idx * 1200}px)`;
                        }
                    }
                    ////Ett event som lyssnar på ett knapptryck från "next"-knappen och som får bilderna att slida vänster
                    nextBtn.addEventListener("click", () => {
                        idx++;
                        changeImage();
                    });

                    ////Ett event som lyssnar på ett knapptryck från "prev"-knappen och som får bilderna att slida höger
                    prevBtn.addEventListener("click", () => {
                        idx--;
                        changeImage();
                    });
                });
            })

            //Fångar upp alla error, samt visar dem i konsolen
            .catch(error => {
                console.log(error);
            });
    }
}

