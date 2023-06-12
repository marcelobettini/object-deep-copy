const util = require("util");

//veamos los problemas para acceder a propiedades anidadas de un objeto, a partir del cuarto nivel
const user = {
  id: 2,
  name: "Ervin Howell",
  username: "Antonette",
  email: "Shanna@melissa.tv",
  phone: "010-692-6593 x09125",
  website: "anastasia.net",
  company: {
    name: "Deckow-Crist",
    catchPhrase: "Proactive didactic contingency",
    bs: "synergize scalable supply-chains",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: {
        lat: "-43.9509",
        lng: "-34.4618",
      },
    },
  },
};
console.clear();

console.log(user); //shows [Object] at 4th level
console.log(JSON.stringify(user, null, 2));
console.log(
  util.inspect(user, { showHidden: false, depth: null, colors: true })
); //showHidden is false by default, we can rid off of it

//Estos problemas son sólo para mostrar el objeto anidado o se evidencian al hacer una deep copy también?
const original = {
  post: "How the hell can we deep copy a complex JS object?",
  author: "Marce",
  published: new Date(),
  socials: [
    {
      name: "twitter",
      url: "https://twitter.com/marcelobettini",
    },
  ],
};

const copy1 = Object.assign({}, original);
const copy2 = { ...original };

// Error, this will update the publishedDate property of all objects
console.log(original.published);
copy1.published.setFullYear(2000);
console.log(original.published);
console.log(copy1.published);
console.log(copy2.published);

// Error, this will add Insta to all objects
copy2.socials.push({ name: "instagram", url: "https://instagram.com" });
console.log(original.socials);
console.log(copy1.socials);

//Una forma de conseguir copias profundas en JS era recurrir a librerías como Lodash o buscarle la vuelta con JSON.stringify y JSON.parse
const copy = JSON.parse(JSON.stringify(original));
// The publishedDate property is now a string, check out below!
console.log(original);
console.log(copy);
/*
La estrategia aquí consiste en transformar primero el objeto como string con JSON.stringify. Este método *serializa cada prop del objeto recursivamente, así que todas las props estarán representadas.

Después usamos JSON.parse para "de-serializar" el objeto stringificado y generar un nuevo objeto a partir de ese origen.

El problema aquí surge del proceso de serialización:
Cada objeto en JS tiene un método de propiedades que se llama toString(), que premite hacer una representación de esa prop en dicho formato... Pero algunas props, como las de tipo Date. Podemos serializarla a un string, pero no podemos reconvertirla al formato Date original desde un string con JSON.parse.

JSON.stringify solo puede manejar objectos básicos, arrays y primitivos. Otros tipos pueden dar resultados inesperados. Los objetos Date se convierten en string, los Sets en {}...
*/

/*Introducing structuredClone()*/

const doppelganger = structuredClone(original);
original.published.setMonth(6);
console.log(original);
console.log(doppelganger);

// *serializar: Proceso por el que un objeto o estructura de datos se traduce a un formato adecuado para su transferencia a través de una red o almacenamiento.
