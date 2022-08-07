const body = document.querySelector('body');
body.classList.add('carregando');

const hello = document.querySelector('#hello');

window.onload = ()=> {
	efeitoMaquina(hello);
	body.classList.remove('carregando');
}

function efeitoMaquina(elemento) {
	const arrayHello = elemento.innerHTML.split('');
	elemento.innerHTML = '';

	arrayHello.forEach((letra, i) => {
		setTimeout(()=> {
			elemento.innerHTML += letra;
		}, 150 * i);
	});
}

const nav = document.querySelector('#navegacao');
const btnMenu = document.querySelector('#btn-menu');
const bgMenuAberto = document.querySelector('.bg-menu-aberto');

btnMenu.addEventListener('click', menuToggle);

function menuToggle(e) {
	e.preventDefault();

	const verificarMenuAberto = nav.classList.contains('active');

	if(verificarMenuAberto){
		fecharMenu();
	} else {
		abrirMenu();
	}
}

bgMenuAberto.addEventListener('click', fecharMenu);

function fecharMenu() {
	removeClass(nav, 'active');
	removeClass(bgMenuAberto, 'active');
}

function  abrirMenu() {
	addClass(nav, 'active');
	addClass(bgMenuAberto, 'active');
}

const portfolioBtnVerMais = document.querySelector('#portfolio-btn-verMais');

portfolioBtnVerMais.addEventListener('click', projetosToggle);

function projetosToggle() {
	const projetoItensVerMais = document.querySelectorAll('.projetos-item.verMais');

	projetoItensVerMais.forEach(item => {

		if(item.classList.contains('invisivel')) {
			removeClass(item, 'invisivel');
			portfolioBtnVerMais.innerText = 'Ver menos';
		} else {
			addClass(item, 'invisivel');
			portfolioBtnVerMais.innerText = 'Ver mais';
		}
	});
}

const menuLink = document.querySelectorAll('.menu-link');
const page = document.querySelectorAll('.page');

menuLink.forEach((btn, i) => {
	btn.addEventListener('click', e => {
		e.preventDefault();

		window.scrollTo(0, 0)

		if(page[0].classList.contains('inicial')) {
			removeClass(page[0], 'inicial');
		}

		if(btn.classList.contains('active')) {
			fecharMenu();
		} else {
			menuLink.forEach(item => removeClass(item, 'active'));
			page.forEach(item => removeClass(item, 'active'));

			fecharMenu();

			addClass(btn, 'active');
			addClass(page[i], 'active');
		}

		bgHeaderToggle();
	});
});

const btnSobreMim = document.querySelector('#btn-sobreMim');

btnSobreMim.addEventListener('click', e => {
	e.preventDefault();
	homeBtn('.sobre', 1)
});

const btnPortfolio = document.querySelector('#btn-portfolio');

btnPortfolio.addEventListener('click', e => {
	e.preventDefault();
	homeBtn('.portfolio', 2)
});

function homeBtn(secao, i) {
	window.scrollTo(0, 0)
	
	secao = document.querySelector(secao);

	page.forEach(item => removeClass(item, 'active'));
	menuLink.forEach(item => removeClass(item, 'active'));

	addClass(menuLink[i], 'active');
	addClass(secao, 'active');

	bgHeaderToggle();
}

function bgHeaderToggle() {
	const header = document.querySelector('.header');

	if(menuLink[0].classList.contains('active')) {
		addClass(header, 'bg-transparent');
	} else {
		removeClass(header, 'bg-transparent');
	}
}

function addClass(element, classe) {
	element.classList.add(classe);
}

function removeClass(element, classe) {
	element.classList.remove(classe);
}

window.addEventListener('resize', debounce(() => widthMaior()));

function debounce(func, timeout = 200){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  }
}

function widthMaior() {
	let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width >= 992) {
        fecharMenu();
    }
}