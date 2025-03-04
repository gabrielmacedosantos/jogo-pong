let jogadorY, computadorY, alvoJogadorY, alvoComputadorY;
let bolaX, bolaY, velocidadeBolaX, velocidadeBolaY;
let larguraRaquete, alturaRaquete;
let alturaBarra;
let velocidadeJogador = 5;
let velocidadeComputadorBase = 2;
let suavizacao = 0.2;
let fundoImg, imgBola;
let placarJogador = 0, placarComputador = 0;
let jogoIniciado = false;
let vencedor = "";

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
    createCanvas(windowWidth, windowHeight).position(0, 0);
    definirTamanhos();
    reiniciarJogo();
}

function draw() {
    background(fundoImg);
    desenharPlacar();
    desenharElementos();

    if (vencedor !== "") {
        fill(255);
        textSize(width * 0.05);
        textAlign(CENTER, CENTER);
        text(`${vencedor} venceu!`, width / 2, height / 2);
        text("Pressione ENTER para começar", width / 2, height / 1.5);
        return


    }

    if (!jogoIniciado) {
        fill(255);
        textSize(width * 0.05);
        textAlign(CENTER, CENTER);
        text("Pressione ENTER para começar", width / 2, height / 2);
        return;
    }

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
    if (colisaoRaquete(jogadorY, 30)) velocidadeBolaX *= -1, aumentarVelocidadeBola();
    if (colisaoRaquete(computadorY, width - 30)) velocidadeBolaX *= -1, aumentarVelocidadeBola();
    if (bolaX < 0) { placarComputador++; verificarVencedor(); reiniciarBola(); }
    if (bolaX > width) { placarJogador++; verificarVencedor(); reiniciarBola(); }
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
    placarJogador = 0;
    placarComputador = 0;
    vencedor = "";
    reiniciarBola();
}

function reiniciarBola() {
    bolaX = width / 2;
    bolaY = height / 2;
    velocidadeBolaX = random([-6, -5, 5, 6]);
    velocidadeBolaY = random([-5, -4, 4, 5]);
}

function aumentarVelocidadeBola() {
    velocidadeBolaX *= 1.1;
    velocidadeBolaY *= 1.1;
}

function verificarVencedor() {
    if (placarJogador >= 3) {
        vencedor = "Jogador";
        jogoIniciado = false;
    } else if (placarComputador >= 3) {
        vencedor = "Computador";
        jogoIniciado = false;
    }
}

function keyPressed() {
    if (keyCode === ENTER) {
        if (!jogoIniciado) {
            jogoIniciado = true;
            if (vencedor !== "") reiniciarJogo();
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    definirTamanhos();
}
