let jogadorY, computadorY, alvoJogadorY, alvoComputadorY;
let bolaX, bolaY, velocidadeBolaX, velocidadeBolaY;
let larguraRaquete, alturaRaquete;
let alturaBarra;
let velocidadeJogador = 5;
let velocidadeComputadorBase = 2;
let suavizacao = 0.2;
let fundoImg, imgBola;
let placarJogador = 0, placarComputador = 0;
let botoesCriados = false;

function definirTamanhos() {
    larguraRaquete = width * 0.02;
    alturaRaquete = height * 0.2;
    alturaBarra = height * 0.02;
}

function preload() {
    fundoImg = loadImage("https://images.pexels.com/photos/2312040/pexels-photo-2312040.jpeg");
    imgBola = loadImage("https://png.pngtree.com/png-vector/20240623/ourmid/pngtree-game-fx-design-electricity-ball-texture-sprite-effect-3d-blue-energy-png-image_12814687.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight * 0.8).position(0, (windowHeight - height) / 2);
    definirTamanhos();
    reiniciarJogo();
    criarBotoes();
}

function draw() {
    background(fundoImg);
    desenharPlacar();
    desenharElementos();
    atualizarBola();
    movimentarJogador();
    movimentarComputador();
}

function desenharPlacar() {
    fill(255);
    textSize(width * 0.05);
    textAlign(CENTER, CENTER);
    text(`${placarJogador} - ${placarComputador}`, width / 2, height * 0.1);
}

function desenharElementos() {
    fill(255);
    rect(20, jogadorY, larguraRaquete, alturaRaquete);
    rect(width - 30, computadorY, larguraRaquete, alturaRaquete);
    image(imgBola, bolaX - width * 0.015, bolaY - width * 0.015, width * 0.03, width * 0.03);
}

function atualizarBola() {
    bolaX += velocidadeBolaX;
    bolaY += velocidadeBolaY;
    if (bolaY < alturaBarra || bolaY > height - alturaBarra) velocidadeBolaY *= -1;
    if (colisaoRaquete(jogadorY, 30)) velocidadeBolaX *= -1, modificarVelocidadeBola();
    if (colisaoRaquete(computadorY, width - 30)) velocidadeBolaX *= -1, modificarVelocidadeBola();
    if (bolaX < 0) placarComputador++, reiniciarBola();
    if (bolaX > width) placarJogador++, reiniciarBola();
}

function colisaoRaquete(posicaoY, limiteX) {
    return bolaX < limiteX + larguraRaquete && bolaX > limiteX - larguraRaquete && bolaY > posicaoY && bolaY < posicaoY + alturaRaquete;
}

function movimentarJogador() {
    if (keyIsDown(87)) alvoJogadorY -= velocidadeJogador;
    if (keyIsDown(83)) alvoJogadorY += velocidadeJogador;
    alvoJogadorY = constrain(alvoJogadorY, alturaBarra, height - alturaRaquete - alturaBarra);
    jogadorY = lerp(jogadorY, alvoJogadorY, suavizacao);
}

function movimentarComputador() {
    alvoComputadorY = constrain(bolaY - alturaRaquete / 2, alturaBarra, height - alturaRaquete - alturaBarra);
    computadorY = lerp(computadorY, alvoComputadorY, suavizacao);
}

function reiniciarJogo() {
    jogadorY = computadorY = alvoJogadorY = alvoComputadorY = height / 2 - alturaRaquete / 2;
    reiniciarBola();
}

function reiniciarBola() {
    bolaX = width / 2;
    bolaY = height / 2;
    velocidadeBolaX = random([-4, -3, 3, 4]);
    velocidadeBolaY = random([-3, -2, 2, 3]);
}

function modificarVelocidadeBola() {
    velocidadeBolaX = random(3, 6) * Math.sign(velocidadeBolaX);
    velocidadeBolaY = random(2, 5) * Math.sign(velocidadeBolaY);
}

function criarBotoes() {
    if (botoesCriados) return;
    botoesCriados = true;
    criarBotao("⬆", 50, height - 150, () => alvoJogadorY -= velocidadeJogador * 10);
    criarBotao("⬇", 50, height - 80, () => alvoJogadorY += velocidadeJogador * 10);
}

function criarBotao(label, x, y, acao) {
    let botao = createButton(label);
    botao.position(x, y);
    botao.size(60, 60);
    botao.mousePressed(acao);
}
