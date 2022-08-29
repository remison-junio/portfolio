const hello = document.querySelector('#hello');

window.onload = ()=> {
	const body = document.querySelector('body');
	body.classList.remove('carregando');

	efeitoMaquina(hello);
	observer();
}

const addClass = (element, classe) => element.classList.add(classe);
const removeClass = (element, classe) => element.classList.remove(classe);

function ocutandoItens() {
	const dataAnimacao = document.querySelectorAll('[data-animacao]');
	const dataAnimacaoSeq = document.querySelectorAll('[data-animacao-seq]');

	dataAnimacao.forEach(item => removeClass(item, 'visivel'));
	dataAnimacaoSeq.forEach(item => removeClass(item, 'visivel'));
}

function observer() {
	//Entrada animada em sequência

	const homeAnimacaoEntradaEmSeq = document.querySelectorAll('#home [data-animacao-seq]');
	const sobreAnimacaoEntradaEmSeq = document.querySelectorAll('#sobre [data-animacao-seq]');
	const portfolioAnimacaoEntradaEmSeq = document.querySelectorAll('#portfolio [data-animacao-seq]');
	const contatosAnimacaoEntradaEmSeq = document.querySelectorAll('#contatos [data-animacao-seq]');

	function observandoItens(entries, timer) {
		entries.forEach((entry, i) => {
			if(entry.isIntersecting) {
				setTimeout(() => {addClass(entry.target, 'visivel');}, timer * i);
			}
		});
	}

	const observerHomeSeq = new IntersectionObserver(item => observandoItens(item, 300));
	const observerSobreSeq = new IntersectionObserver(item => observandoItens(item, 100));
	const observerPortfolioSeq = new IntersectionObserver(item => observandoItens(item, 150));
	const observerContatosSeq = new IntersectionObserver(item => observandoItens(item, 250));

	homeAnimacaoEntradaEmSeq.forEach(item => observerHomeSeq.observe(item));
	sobreAnimacaoEntradaEmSeq.forEach(item => observerSobreSeq.observe(item));
	portfolioAnimacaoEntradaEmSeq.forEach(item => observerPortfolioSeq.observe(item));
	contatosAnimacaoEntradaEmSeq.forEach(item => observerContatosSeq.observe(item));

	//Entrada animada

	const dataAnimacao = document.querySelectorAll('[data-animacao]');

	const observer = new IntersectionObserver(entradaAnimada);

	function entradaAnimada(entries) {
		entries.forEach((entry) => {
	    if(entry.isIntersecting)  {
	    	addClass(entry.target, 'visivel');
	    }
	  });
	}

	dataAnimacao.forEach(item => observer.observe(item));
}

function efeitoMaquina(elemento) {
	if(!elemento.innerHTML === 'Hello World!') {
		return
	}

	elemento.innerHTML = '';

	const texto = 'Hello World!';
	const arrayTexto = texto.split('');

	arrayTexto.forEach((item, i) => {
		setTimeout(() => {elemento.innerHTML += arrayTexto[i];}, 150 * i);
	});
}

const nav = document.querySelector('#navegacao');
const btnMenu = document.querySelector('#btn-menu');
const bgMenuAberto = document.querySelector('.bg-menu-aberto');

btnMenu.addEventListener('click', menuToggle);

function menuToggle(e) {
	e.preventDefault();

	if(nav.classList.contains('active')){
		fecharMenu();
		return
	} 
	
	abrirMenu();
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

const menuLink = document.querySelectorAll('.menu-link');
const page = document.querySelectorAll('.page');

function escolhendoPage(btn, i) {
	menuLink.forEach(item => removeClass(item, 'active'));
	page.forEach(item => removeClass(item, 'active'));

	ocutandoItens();

	addClass(btn, 'active');
	addClass(page[i], 'active');

	bgHeaderToggle();
}

const portfolioBtnVerMais = document.querySelector('#portfolio-btn-verMais');
portfolioBtnVerMais.addEventListener('click', projetosToggle);

function projetosToggle() {
	const projetoItensVerMais = document.querySelectorAll('.projetos-item.verMais');

	projetoItensVerMais.forEach(item => {
		if(item.classList.contains('invisivel')) {
			removeClass(item, 'invisivel');
			portfolioBtnVerMais.innerText = 'Ver menos';
			return
		}

		addClass(item, 'invisivel');
		portfolioBtnVerMais.innerText = 'Ver mais';
	});
}

menuLink.forEach((btn, i) => {
	btn.addEventListener('click', e => {
		e.preventDefault();

		window.scrollTo(0, 0);

		if(btn.classList.contains('active')) {
			fecharMenu();
			return
		}

		if(page[0].classList.contains('active')) {
			efeitoMaquina(hello);
		}

		fecharMenu();
		escolhendoPage(btn, i);
	});
});

const btnSobreMim = document.querySelector('#btn-sobreMim');
btnSobreMim.addEventListener('click', e => homeBtn(e, 1));

const btnPortfolio = document.querySelector('#btn-portfolio');
btnPortfolio.addEventListener('click', e => homeBtn(e, 2));

function homeBtn(e, i) {
	e.preventDefault()

	window.scrollTo(0, 0);

	escolhendoPage(menuLink[i], i);
}

function bgHeaderToggle() {
	const header = document.querySelector('.header');

	if(menuLink[0].classList.contains('active')) {
		addClass(header, 'bg-transparent');
		return
	}

	removeClass(header, 'bg-transparent');
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