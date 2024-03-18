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
roomName = localStorage.getItem("roomName"); 

function send() 
{
  msg = document.getElementById("msg").value; 
  firebase.database().ref(roomName).push({
    name: userName, /* Adicione a variável userName que contém o nome do usuário. Name é a chave e userName o valor. */
    message: msg, /* Adicione a variável msg que contém a mensagem. Message é a chave e msg o valor. */
    like: 0  
   });

  document.getElementById("msg").value = ""; /* Explicação: o valor da input box das mensagens fica vazio, para que novas mensagens sejam escritas. */
}
/* Aula 96 termina aqui */

/* Inicio da aula 97 */
function getData() 
          { firebase.database().ref("/"+roomName).on('value', function(snapshot) 
            { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) 
               { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") 
               {
                firebaseMessageId = childKey; 
                messageData = childData; 
//Início do código
          console.log(firebaseMessageId); 
          console.log(messageData); 

          nome = messageData['name']; 
          message = messageData['message']; 
          like = messageData['like'];  

          nameWithTag = "<h4> "+ nome +"<img class='user_tick' src='tick.png'></h4>";
          messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
          like_button ="<button class='btn btn-warning' id="+firebaseMessageId+" value="+like+" onclick='updateLike(this.id)'>";
          spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

        row = nameWithTag + messageWithTag + like_button + spanWithTag;       
        document.getElementById("output").innerHTML += row; 

//Fim do código
      } });  }); }
getData();

function updateLike(messageId) /* Chamar a função updateLike. *Importante: o messageId é a identificação única da mensagem no banco de dados. */
{
  console.log("botão de like pressionado - " + messageId);
	buttonId = messageId; 
	likes = document.getElementById(buttonId).value; 
	updatedLikes = Number(likes) + 1; 
	console.log(updatedLikes); 

	firebase.database().ref(roomName).child(messageId).update({ 
		like :updatedLikes  
	 });

}

function logout() 
{
localStorage.removeItem("userName"); 
localStorage.removeItem("roomName"); 
    window.location.replace = ("index.html"); 
}