const background = document.getElementById('background');
const navbar = document.getElementById('navbar');
const navOptions = document.getElementById('nav-options');
const buttonLeft = document.getElementById('button-left');
const buttonRight = document.getElementById('button-right');
const buttonNuevo1 = document.getElementById('button-Nuevo1');


document.querySelector('.cool-button').addEventListener('click', () => {
  window.location.href = "Home2.html";
});


// Nuevos fondos
const backgrounds = [
  'https://www.fundacionaquae.org/wp-content/uploads/2016/01/bosquesudamerica.jpg',
  'https://png.pngtree.com/png-clipart/20230927/original/pngtree-shiny-soap-bubble-png-image_13149362.png ',
  'https://i.ibb.co/DzqRmBR/De-Watermark-ai-1732471620301.png',
];



// Nuevas barras de opciones
const newNavOptions = ""
 ;

// Cambiar a la izquierda
buttonLeft.addEventListener('click', () => {
  background.style.backgroundImage = `url('${backgrounds[0]}')`;
  navOptions.innerHTML = newNavOptions;
});

// Cambiar a la derecha
buttonRight.addEventListener('click', () => {
  background.style.backgroundImage = `url('${backgrounds[1]}')`;
  navOptions.innerHTML = newNavOptions;
});
//siguiente
buttonNuevo1.addEventListener('click', () => {
  background.style.backgroundImage = `url('${backgrounds[2]}')`;
  navOptions.innerHTML = newNavOptions;
});


///////////////////////////





