const url = 'https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw&maxResults=25&key=AIzaSyADJ7CqV3isjEKK2Sc8n1EvkP-R7Cy0pPA'
// para poder loguearse a youtube hay que crear un api key  https://console.cloud.google.com/v3/

// https://developers.google.com/youtube/v3/docs/ informacion sobre el api de youtube

// para buscar un id de channel de youtube, boton derecho inspeccionar ver codigo fuente de la pagina, y buscar 
//browseId Lo que sigue es el id del canal
const urlMidudev = 'https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=UC8LeXCWOalN8SxlrPcG-PaQ&key=AIzaSyADJ7CqV3isjEKK2Sc8n1EvkP-R7Cy0pPA';


const videosQueMeGustan = 'https://youtube.googleapis.com/youtube/v3/videos?myRating=like&key=AIzaSyADJ7CqV3isjEKK2Sc8n1EvkP-R7Cy0pPA';

const videosSearch = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&key=AIzaSyADJ7CqV3isjEKK2Sc8n1EvkP-R7Cy0pPA'

const videosSearchClaveDos = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&key=AIzaSyBefTrtwOQr-YyZVQ4zjHO51Cj8x---GzA';


/*
//?video_id=1A7Qw88As64
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd39f8364d4msh6218422caf62ac8p109c7cjsn7df179c04e55',
		'X-RapidAPI-Host': 'youtube-music-api-detailed.p.rapidapi.com'
	}
};*/

try {
   fetch(videosSearchClaveDos).then(resp => resp.json()) .then(data =>{
     console.log(data);
     let videos = data.items;
     const contenedorVideos = document.querySelector(".youtube-container");
     // Crear un fragmento de documento para almacenar los elementos
     const fragment = document.createDocumentFragment();
     for (let video of videos){
        /*  //ejemplo con innerHtml
          contenedorVideos.innerHTML += 
          `<div class="divVideo"> 
             <a href="https://www.youtube.com/watch?v=${video.id.videoId}">
                <img src="${video.snippet.thumbnails.high.url}" alt="video" width="100%" height="auto">
                <h4> ${video.snippet.title} </h4>
             </a>
           </div>`; */

           // <iframe width="100%" height="auto" src="https://www.youtube.com/embed/"${video.id.videoId}""frameborder="0" allowfullscreen></iframe>

           // ejemplo con creacion de elementos y con appendchild
            const divVideo = document.createElement('div');
            divVideo.classList.add('divVideo');

            const link = document.createElement('a');
            link.href = `https://www.youtube.com/watch?v=${video.id.videoId}`;
            link.classList.add('imagenTitulo');

            const divContenedorImg = document.createElement('div');
            divContenedorImg.classList.add('contenedorImagenVideo');

            const img = document.createElement('img');
            img.src = video.snippet.thumbnails.high.url;
            img.alt = 'video';
            img.style.width = '100%';

            const h4 = document.createElement('h4');
            h4.textContent = video.snippet.title;

            const a = document.createElement('a');
            a.href =`https://www.youtube.com/${video.snippet.channelId}`;
            a.textContent = video.snippet.channelTitle;
            a.classList.add('channelTitle');

            divContenedorImg.appendChild(img);
            link.appendChild(divContenedorImg);
            link.appendChild(h4);

            divVideo.appendChild(link);
            divVideo.appendChild(a);

            fragment.appendChild(divVideo);
          
     }

     // Agregar el fragmento completo al contenedor
     contenedorVideos.appendChild(fragment);

   });
	
} catch (error) {
	console.error(error);
}