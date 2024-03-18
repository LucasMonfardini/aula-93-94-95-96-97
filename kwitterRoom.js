
const firebaseConfig = {
  apiKey: "AIzaSyAYMUCCiQKF6PII9LNu0DRF7f930KWb-xk",
  authDomain: "kwitter-44602.firebaseapp.com",
  databaseURL:"https://kwitter-44602-default-rtdb.firebaseio.com/",
  projectId: "kwitter-44602",
  storageBucket: "kwitter-44602.appspot.com",
  messagingSenderId: "162004706784",
  appId: "1:162004706784:web:c3f6698685249c7ca2f785"
};

firebase.initializeApp(firebaseConfig);

  userName = localStorage.getItem("userName"); 

document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";

function addRoom() 
{
  roomName = document.getElementById("roomName").value;

  firebase.database().ref("/").child(roomName).update 
  ({ 
    purpose : "adicionar nome de sala" 
  });

    localStorage.setItem("roomName", roomName); 
    
    window.location = "kwitterPage.html "; 
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) /* Explicação: as linhas 25, 26, 27 e 28 obtém todos os dados do firebase para conter os nomes das salas.*/
       { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) 
          { childKey  = childSnapshot.key;
            roomNames = childKey; 

       console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>"; /* Explicação: O row(fileira) é uma variável que define a área de texto dentro da coluna do console, pois para cada navegador pode ser diferente, então o row padroniza. */
      /* Importante: O redirectToRoomName é uma função para que quando o nome da sala for pressionado, entraremos naquela sala.*/

      document.getElementById("output").innerHTML += row; 
      /* Importante: Se apenas escrevermos "=" apenas o nome da sala será exibido. No entanto, quando temos muitos nomes
        de salas, e queremos exibir todos dentro de um único elemento HTML, utilizamos "+="" e em seguida escrevemos a variável row para enfileirar. */
    });
  });

}

getData();

function redirectToRoomName(name)
{
  console.log(name); 
  localStorage.setItem("roomName", name); 
    window.location = "kwitterPage.html"; 
}

function logout() 
{
localStorage.removeItem("userName"); 
localStorage.removeItem("roomName"); 
    window.location = "index.html"; 
}
