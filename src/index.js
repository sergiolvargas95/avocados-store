/*RESUMEN: NOS CONECTAMOS A UNA API QUE ES UN PUENTE CON LA INFORMACION
DE UN SERVIDOR Y ESE SERVIDOR NOS DEVUELVE ESA INFORMACION, Y UTILIZAMOS
UN CICLO POR CADA UNO DE LOS ELEMENTOS QUE NOS DEVUELVE ESE SERVIDOR
CREAMOS NODOS Y SE LOS AGREGAMOS AL FINAL A NUESTRO HTML*/

const baseUrl = "https://platzi-avo.vercel.app";

const appNode = document.querySelector('#app')

const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD',
    }).format(price);

    return newPrice;
}
window
    .fetch(`${baseUrl}/api/avo`)
    .then(respuesta => respuesta.json())
    .then(responseJson => {
        const todosLosItems = [];
        responseJson.data.forEach((item) => {
            const imagen = document.createElement('img');
            imagen.src =  `${baseUrl}${item.image}`
            imagen.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";

            const title = document.createElement('h2');
            title.textContent = item.name;
            title.className = 'text-lg'

            const price = document.createElement('div');
            price.textContent = formatPrice(item.price);
            price.className = 'text-gray-600'

            const priceAndTitle = document.createElement('div')
            priceAndTitle.className = 'text-center md:text-left'
            priceAndTitle.append(title, price)

            //Wrap Img and priceAndTitle
            const card = document.createElement('div')
            card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300"

            card.append(imagen, priceAndTitle)

            todosLosItems.push(card);
        });

        appNode.append(...todosLosItems)
    });