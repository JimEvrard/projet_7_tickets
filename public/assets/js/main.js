
    const cors = function (req, res){
            res.setHeader('Access-Control-Allow-Origin',  '*')
            fetch('https://api.jim-evrard.fr/api/orders', {   
                
            }).then(res => res.json())
            .then(json => console.log(json));
            
            fetch('http://api.jim-evrard.fr/api/products', {       
            }).then(res => res.json())
            .then(json => console.log(json));
            
            fetch('http://api.jim-evrard.fr/api/order-lines', {       
            }).then(res => res.json())
            .then(json => console.log(json));
        }
    

        function test (){
    let b = document.getElementById('tickets_container');
    let c = document.getElementById('test2');
    let newDiv = document.createElement('div');

    newDiv.textContent = 'testets'; 
    b.appendChild(newDiv); 
}

var w;
function PopupCentrer(page, largeur, hauteur, options) {
    var top=(screen.height-hauteur)/2;
    var left=(screen.width-largeur)/2;
    w= window.open(page,"","top="+top+",left="+left+",width="+largeur+",height="+hauteur+","+options);
  }



