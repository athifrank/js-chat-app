// Make connection
var socket = io.connect('http://localhost:4000');

var message=document.getElementById('message'),
    output=document.getElementById('output'),
    btn=document.getElementById('send'),
    feedback=document.getElementById('feedback');

    var userName=document.getElementById('userName');
    var userdetail=document.getElementById('userdetail');
    var changeName=document.getElementById('changeName');

    var handle=sessionStorage.getItem('user');

    var da=new Date();
    var da1=da.getDate()+'-'+(da.getMonth()+1)+'-'+da.getFullYear();
    var ta1=da.getHours()-12+':'+da.getMinutes();
    if(da.getHours()>12){
      ta1 =ta1+' PM';
    }else{
      ta1 =ta1+' AM';
    }

function enterName(){
  if(userName.value==0){
   alert('please enter your name in text box');
   userName.focus();
  }else{
    location.reload();
    sessionStorage.setItem('user',userName.value);
  }
}

userdetail.innerHTML=sessionStorage.getItem('user') ? sessionStorage.getItem('user'):'Unknown';
if(sessionStorage.getItem('user')){
  userName.disabled=true;
}else{
  userName.disabled=false;
}

changeName.addEventListener('click',function(){
  userName.disabled=false;
  userName.focus();
});

//emit the event  
btn.addEventListener('click',function(){
    socket.emit('chat',{
      message:message.value,
      handle:handle,
      timeCal:ta1+' | '+da1
    });
    message.value=''
});



message.addEventListener('keypress',function(){
  if(sessionStorage.getItem('user')){
    socket.emit('typing',handle);
  }else{
    alert('please enter your name in text box');
   userName.focus();
  }
});


//listen for events
socket.on('chat',function(data){
  feedback.innerHTML=''
  output.innerHTML += '<div class="outgoing_msg"><div class="sent_msg"><span id="handle">'+data.handle+'</span><p>'+data.message+'</p><span class="time_date">'+data.timeCal+' </span> </div></div>';
})

//listening for typing

socket.on('typing',function(data){
  feedback.innerHTML ='<p><em>'+data+' is typing...<em><p>';
})

