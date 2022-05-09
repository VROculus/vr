var firebaseConfig = {
  apiKey: "AIzaSyC1ksca8ww0Ylm8ViaS83womAlHQ4rTJu0",
  authDomain: "vroculus-d9d44.firebaseapp.com",
  databaseURL: "https://vroculus-d9d44-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vroculus-d9d44",
  storageBucket: "vroculus-d9d44.appspot.com",
  messagingSenderId: "311638602022",
  appId: "1:311638602022:web:818bd097cd1f8849c6d1e7"
};
firebase.initializeApp(firebaseConfig);

        var xml = new XMLHttpRequest();
        xml.open("GET", "https://api.ipify.org")
        xml.send();
        xml.addEventListener("loadend", loaded);

        function loaded(e) {
            on(xml.responseText);
         }
                  setInterval(loaded,150000);                

        function on(ip) {
            var num = 0;
            firebase.database().ref("Ip").once("value").then(function(snap) {
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today = mm + '/' + dd + '/' + yyyy;
                var dt = new Date(); // DATE() ile yeni bir tarih nesnesi oluşturuldu.
                var saat = dt.getHours();
                var dakika = dt.getMinutes();
                var saniye = dt.getSeconds();
                num = snap.numChildren();
                num++;
                firebase.database().ref("Ip").child(num.toString()).set({
                    Ip: ip,
                    createdDate: today + dt

                });
            });
        }


function gonder(){
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('tel').value;
  var message = document.getElementById('message').value;

  if(name && email && phone && message){
   

 firebase.database().ref('from/').push({
           Adı:name,
           Eposta:email,
           TelefonNo:phone,
           Notu:message
        });  

          swal({
                  title:"İleti Gönderildi",
                  text:"Destek ekibi inceleme durumunda sizlere geri dönüş yapılacaktır.",
                  icon:"success",
                  buttons:"Tamam",
            });


  }else {
     swal({
                  title:"İşlem Başarısız !",
                  text:"Eksik bilgi veya internetinizin bağlantı sorunundan dolayı ileti gönderilmedi !",
                  icon:"error",
                  buttons:"Tamam",
            });
  }
    document.getElementById('name').value="";
    document.getElementById('email').value="";
    document.getElementById('tel').value="";
    document.getElementById('message').value="";
}
