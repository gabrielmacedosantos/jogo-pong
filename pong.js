let jogadorY, computadorY, alvoJogadorY, alvoComputadorY;
let bolaX, bolaY, velocidadeBolaX, velocidadeBolaY;
let larguraRaquete, alturaRaquete;
let alturaBarra;
let velocidadeJogador = 5;
let velocidadeComputadorBase = 2;
let suavizacao = 0.2;
let fundoImg;
let imgBola;
let placarJogador = 0;
let placarComputador = 0;
let botoesCriados = false;

function definirTamanhos() {
    larguraRaquete = width * 0.01;
    alturaRaquete = height * 0.2;
    alturaBarra = height * 0.02;
}

function preload() {
    fundoImg = loadImage("https://images.pexels.com/photos/2312040/pexels-photo-2312040.jpeg");
    imgBola = loadImage("https://png.pngtree.com/png-vector/20240623/ourmid/pngtree-game-fx-design-electricity-ball-texture-sprite-effect-3d-blue-energy-png-image_12814687.png");
}

function setup() {
    let canvas = createCanvas(900, 450);
    canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
    definirTamanhos();
    jogadorY = height / 2 - alturaRaquete / 2;
    computadorY = height / 2 - alturaRaquete / 2;
    alvoJogadorY = jogadorY;
    alvoComputadorY = computadorY;
    reiniciarBola();
    
    if (windowWidth < 600) criarBotoes();
}

function draw() {
    background(fundoImg);
    
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text(`${placarJogador} - ${placarComputador}`, width / 2, 50);
    
    fill(255);
    rect(20, jogadorY, larguraRaquete, alturaRaquete);
    rect(width - 30, computadorY, larguraRaquete, alturaRaquete);
    
    let tamanhoBola = width * 0.03;
    image(imgBola, bolaX - tamanhoBola / 2, bolaY - tamanhoBola / 2, tamanhoBola, tamanhoBola);
    
    bolaX += velocidadeBolaX;
    bolaY += velocidadeBolaY;
    
    if (bolaY < alturaBarra || bolaY > height - alturaBarra) velocidadeBolaY *= -1;
    
    if (bolaX < 30 && bolaY > jogadorY && bolaY < jogadorY + alturaRaquete) {
        velocidadeBolaX *= -1;
        modificarVelocidadeBola();
    }
    
    if (bolaX > width - 30 && bolaY > computadorY && bolaY < computadorY + alturaRaquete) {
        velocidadeBolaX *= -1;
        modificarVelocidadeBola();
    }
    
    if (bolaX < 0) { placarComputador++; reiniciarBola(); }
    if (bolaX > width) { placarJogador++; reiniciarBola(); }
    
    if (keyIsDown(87)) alvoJogadorY -= velocidadeJogador;
    if (keyIsDown(83)) alvoJogadorY += velocidadeJogador;
    
    alvoJogadorY = constrain(alvoJogadorY, alturaBarra, height - alturaRaquete - alturaBarra);
    jogadorY = lerp(jogadorY, alvoJogadorY, suavizacao);
    
    velocidadeComputadorBase + abs(velocidadeBolaX) * 0.1;
    alvoComputadorY = bolaY - alturaRaquete / 2;
    alvoComputadorY = constrain(alvoComputadorY, alturaBarra, height - alturaRaquete - alturaBarra);
    computadorY = lerp(computadorY, alvoComputadorY, suavizacao);
}

function reiniciarBola() {
    bolaX = width / 2;
    bolaY = height / 2;
    velocidadeBolaX = random([-4, -3, 3, 4]);
    velocidadeBolaY = random([-3, -2, 2, 3]);
}

function modificarVelocidadeBola() {
    let direcaoX = velocidadeBolaX > 0 ? 1 : -1;
    let direcaoY = velocidadeBolaY > 0 ? 1 : -1;
    velocidadeBolaX = random(3, 6) * direcaoX;
    velocidadeBolaY = random(2, 5) * direcaoY;
}

function criarBotoes() {
    if (botoesCriados) return;
    botoesCriados = true;
    
    let botaoCima = createButton("⬆");
    botaoCima.position(50, height - 100);
    botaoCima.size(50, 50);
    botaoCima.mousePressed(() => alvoJogadorY -= velocidadeJogador * 10);
    
    let botaoBaixo = createButton("⬇");
    botaoBaixo.position(50, height - 40);
    botaoBaixo.size(50, 50);
    botaoBaixo.mousePressed(() => alvoJogadorY += velocidadeJogador * 10);
}
