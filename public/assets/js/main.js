
    fetch('http://localhost:3000/api/orders', {       
    }).then(res => res.json())
    .then(json => console.log(json));

    fetch('http://localhost:3000/api/products', {       
    }).then(res => res.json())
    .then(json => console.log(json));

    fetch('http://localhost:3000/api/order-lines', {       
    }).then(res => res.json())
    .then(json => console.log(json));
