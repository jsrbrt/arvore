const corNaoPodeComprar = 'lightgray';
const corPodeComprar = 'grey'; 
const corComprado = 'black';

const customConfirm = (message, callback) => {
    document.getElementById('textoConfirmacao').innerText = message;
    document.getElementById('confirm').style.display = 'block';

    document.getElementById('confirmYes').onclick = () => {
        document.getElementById('confirm').style.display = 'none';
        callback(true);
    };

    document.getElementById('confirmNo').onclick = () => {
        document.getElementById('confirm').style.display = 'none';
        callback(false);
    };
};
const container = document.getElementById('skilltree'),
buy = document.getElementById('comprar'),
save = document.getElementById('salvar'), 
load = document.getElementById('carregar');

let pontos = 3;

let nodes = new vis.DataSet([
	{ id: 1, size: 50, level: 1, label: 'Magia', group: 'comprado'},

	{ id: 2, size: 30, level: 2, label: 'Intensidade', group: 'comprado', pillar: 'intensidade' },

	{ id: 3, size: 15, level: 3, label: 'Aprendiz', 
		content: 'Magias com essa melhoria causarão 1d6+1 de dano.'},

	{ id: 4, size: 15, level: 4, label: 'Iniciado da Intensidade', 
			content: 'Magias com essa melhoria causarão 1d6+2 de dano.' },
	{ id: 5, size: 15, level: 4, label: 'Iniciado de Efeitos',
			content: 'Magias com essa melhoria podem causar 1d3+1 de dano e causarão 1 efeito simples em seu conjurador.' },

	{ id: 6, size: 15, level: 5, label: 'Praticante da Intensidade', 
			content: 'Magias com essa melhoria causarão 1d6+2 de dano \n\n - O conjurador tem +1 de bônus no teste de ataque.' },
	{ id: 7, size: 15, level: 5, label: 'Praticante de Efeitos', 
			content: 'Magias com essa melhoria podem causar 1d3+1 de dano e causarão até 2 efeitos simples em seu conjurador.'  },

	{ id: 8, size: 15, level: 6, label: 'Estudioso da Intensidade', 
			content: 'Magias com essa melhoria causarão 1d6+3 de dano \n\n - O conjurador tem +1 de bônus no teste de ataque.' },
	{ id: 9, size: 15, level: 6, label: 'Estudioso de\nEfeitos simples', 
			content: 'Magias com essa melhoria podem causar 1d3+2 de dano e causarão 1 efeito simples no alvo.'  },
	{ id: 10, size: 15, level: 6,label: 'Estudioso de\nEfeitos complexos', 
			content: 'Magias com essa melhoria causarão 1 efeito complexo em seu conjurador.'  },

	{ id: 11, size: 15, level: 7, label: 'Prodígio da\nIntensidade ofensiva', 
			content: 'Magias com essa melhoria causarão 1d6+4 de dano \n\n - O conjurador também tem +1 de bônus no teste.'  },
	{ id: 12, size: 15, level: 7,label: 'Prodígio da\nIntensidade ágil', 
			content: 'Magias com essa melhoria causarão 1d6+3 de dano \n\n - O conjurador também tem +2 de bônus no teste.'  },
	{ id: 13, size: 15, level: 7, label: 'Prodígio de Efeitos gêmeos', 
			content: 'Magias com essa melhoria podem causar 1d3+2 de dano e causarão 2 efeitos simples em até 2 alvos.'  },
	{ id: 14, size: 15, level: 7, label: 'Prodígio de Efeitos pessoais', 
			content: 'Magias com essa melhoria causarão 1 efeito simples e 1 complexo em seu conjurador.'  },

	{ id: 15, size: 15, level: 8, label: 'Graduado da\nIntensidade ofensiva', 
			content: 'Magias com essa melhoria causarão 1d6+5 de dano \n\n - O conjurador também tem +1 de bônus no teste.'  },
	{ id: 16, size: 15, level: 8,label: 'Graduado da\nIntensidade ágil', 
			content: 'Magias com essa melhoria causarão 1d6+4 de dano \n\n - O conjurador também tem +2 de bônus no teste.'  },
	{ id: 17, size: 15, level: 8, label: 'Graduado de Efeitos gêmeos', 
			content: 'Magias com essa melhoria podem causar 1d3+3 de dano e causarão 1 efeito complexo em até 2 alvos.'  },
	{ id: 18, size: 15, level: 8, label: 'Graduado de Efeitos pessoais', 
			content: 'Magias com essa melhoria causarão 1 efeito simples em seu conjurador e 1 efeito simples inofensivo em todos os alvos na área.'  },

	{ id: 19, size: 15, level: 9, label: 'Lendário na\nIntensidade ofensiva', 
			content: 'Magias com essa melhoria causarão 2d6+5 de dano \n\n - O conjurador também tem +2 de bônus no teste.'  },
	{ id: 20, size: 15, level: 9,label: 'Lendário na\nIntensidade ágil', 
			content: 'Magias com essa melhoria causarão 1d6+4 de dano \n\n - O conjurador também tem +3 de bônus no teste.'  },
	{ id: 21, size: 15, level: 9, label: 'Lendário em\nEfeitos diferentes', 
			content: 'Magias com essa melhoria podem causar 1d3+3 de dano e causarão 1 efeito simples e 1 complexo em até 2 alvos.'  },
	{ id: 22, size: 15, level: 9,label: 'Lendário em\nEfeitos idênticos', 
			content: 'Magias com essa melhoria podem causar 1d3+3 de dano e causarão 1 efeito complexo em até 4 alvos.'  },

	{ id: 23, size: 15, level: 9, label: 'Lendário em\nEfeitos pessoais I', 
			content: 'Magias com essa melhoria causarão 1 efeito complexo em seu conjurador e 1 efeito simples inofensivo em todos os alvos.'  },
	{ id: 24, size: 15, level: 9,label: 'Lendário em\nEfeitos pessoais II', 
			content: 'Magias com essa melhoria causarão 1 efeito simples em seu conjurador e 1 efeito simples em todos os alvos.'  },

	{ id: 25, size: 15, level: 10, label: 'Supremo na\nIntensidade ofensiva', 
			content: 'Magias com essa melhoria causarão 2d6+6 de dano \n\n - O conjurador também tem +2 de bônus no teste.'  },
	{ id: 26, size: 15, level: 10,label: 'Supremo na\nIntensidade ágil', 
			content: 'Magias com essa melhoria causarão 2d6+5 de dano \n\n - O conjurador também tem +3 de bônus no teste.'  },
	{ id: 27, size: 15, level: 10, label: 'Supremo em\nEfeitos diferentes', 
			content: 'Magias com essa melhoria podem causar 1d3+3 de dano e causarão 1 efeito simples e 1 complexo em até 3 alvos.'  },
	{ id: 28, size: 15, level: 10,label: 'Supremo em\nEfeitos em área', 
			content: 'Magias com essa melhoria podem causar 1d3+3 de dano e causarão 1 efeito complexo em todos os alvos.'  },
	{ id: 29, size: 15, level: 10, label: 'Supremo em\nEfeitos pessoais', 
			content: 'Magias com essa melhoria podem causar 1d3+3 de dano e causarão 1 efeito complexo em seu conjurador e em 1 alvo.'  },

	{ id: 30, size: 15, level: 11, label: 'Arquimago da\nIntensidade ofensiva', 
			content: 'Magias com essa melhoria causarão 2d6+7 de dano \n\n - O conjurador também tem +2 de bônus no teste.'  },
	{ id: 31, size: 15, level: 11,label: 'Arquimago da\nIntensidade ágil', 
			content: 'Magias com essa melhoria causarão 2d6+5 de dano \n\n - O conjurador também tem +4 de bônus no teste.'  },

	{ id: 32, size: 30, level: 12, label: 'Mestre da Intensidade', 
			content: 'Sua pura força de vontade transforma a intensidade de suas magias. \n\n - Você pode realocar os bônus de dano e de teste recebidos pela árvore livremente'  },
	{ id: 33, size: 30, level: 12, label: 'Mestre dos Efeitos', 
			content: 'Seus debuffs são destruídores. \n\n - Inimigos rolam resistência contra suas magias com uma penalidade igual seu atributo correspondente.'  },

	{ id: 34, size: 30, level: 0, label: 'Frequência', group: 'comprado', pillar: 'frequencia'},

	{ id: 35, size: 15, level: -1, label: 'Instantântanea', 
		content: 'Magias com essa melhoria têm a duração instantânea.' },

	{ id: 36, size: 15, level: -2, label: 'Concentração\n1 turno', 
		content: 'Magias com essa melhoria devem ser concentradas em para manter o seu efeito, máximo de 1 turno após o primeiro.' },

	{ id: 37, size: 15, level: -3, label: 'Concentração\n2 turnos', 
		content: 'Magias com essa melhoria devem ser concentradas em para manter o seu efeito, máximo de 2 turnos após o primeiro.\n\nNível da magia: Praticante.' },
	{ id: 38, size: 15, level: -3, label: 'Concentração\n1d4 turnos', 
		content: 'Magias com essa melhoria devem ser concentradas em para manter o seu efeito, máximo de 1d4 turnos após o primeiro.e.' },

	{ id: 39, size: 15, level: -4, label: 'Concentração\n4 turnos', 
		content: 'Magias com essa melhoria devem ser concentradas em para manter o seu efeito, máximo de 4 turnos após o primeiro..' },
	{ id: 40, size: 15, level: -4, label: 'Concentração\n1d6+1 turnos', 
		content: 'Magias com essa melhoria devem ser concentradas em para manter o seu efeito, máximo de 1d6+1 turnos após o primeiro..' },

	{ id: 41, size: 15, level: -5, label: 'Determinada\n1 turno', 
		content: 'Magias com essa melhoria têm a duração determinada, durando 1 turno após o primeiro.' },

	{ id: 42, size: 15, level: -6, label: 'Determinada\n2 turnos', 
		content: 'Magias com essa melhoria têm a duração determinada, durando 2 turnos após o primeiro.' },

	{ id: 43, size: 15, level: -7, label: 'Círculo Mágico', 
		content: 'Magias com essa melhoria garantem que contanto que o alvo esteja na área do cículo mágico, ele continuará sendo afetado. \n\n- Tamanho depende do formato na versatilidade no qual foi conjurado.' },

	{ id: 44, size: 15, level: -8, label: 'Visão', 
		content: 'Magias com essa melhoria garantem que contanto que o alvo esteja na sua área de visão, ele continuará sendo afetado.' },

	{ id: 45, size: 15, level: -9, label: 'Determinada\n12 horas', 
		content: 'Magias com essa melhoria têm a duração determinada, durando até 12 horas.' },
	{ id: 46, size: 15, level: -9, label: 'Determinada\nPôr do sol', 
		content: 'Magias com essa melhoria têm a duração determinada, durando até o pôr do sol..' },

	{ id: 47, size: 30, level: -10, label: 'Mestre da Frequência', 
		content: 'Você tem total controle da duração das suas magias. Você consegue manter uma quantidade de magias permanentemente igual ao seu maior atributo mágico.' },

	{ id: 48, size: 30, level: 0, label: 'Versatilidade', group: 'comprado', pillar: 'verssatilidade' },
	{ id: 49, size: 15, level: -1, label: 'Toque', 
		content: 'Magias com essa melhoria devem ser conjuradas por Toque.' },

	{ id: 50, size: 15, level: -2, label: 'Próximo',
		 content: 'Magias com essa melhoria devem ser conjuradas numa distância que você poderia tocar sem se mexer (1 metro).' },
	{ id: 51, size: 15, level: -2, label: 'Cículo mágico', 
		content: 'Magias com essa melhoria devem ser conjuradas na área de um Cículo Mágico (1 metro de raio).' },

	{ id: 52, size: 15, level: -3, label: '2 metros raio', 
		content: 'Magias com essa melhoria devem ser conjuradas numa área de 2 metros de raio.' },
	{ id: 53, size: 15, level: -3, label: '5 metros', 
		content: 'Magias com essa melhoria podem ser conjuradas a até 5 metros de distância do conjurador.' },

	{ id: 54, size: 15, level: -3, label: 'Cículo - raio x1', 
		content: 'Magias com essa melhoria devem ser conjuradas na área de um Cículo Mágico (raio x1).' },
	{ id: 55, size: 15, level: -3, label: 'Cone - raio x1.5', 
		content: 'Magias com essa melhoria devem ser conjuradas na área de um Cone Mágico (raio x1.5).' },
	{ id: 56, size: 15, level: -3, label: 'Linha - raio x2', 
		content: 'Magias com essa melhoria devem ser conjuradas na área de uma Linha Mágica (raio x2).' },

	{ id: 57, size: 15, level: -4, label: '2.5 metros raio', 
		content: 'Magias com essa melhoria devem ser conjuradas numa área de 2.5 metros de raio..' },
	{ id: 58, size: 15, level: -4, label: '8 metros',
		 content: 'Magias com essa melhoria podem ser conjuradas a até 8 metros de distância do conjurador..' },

	{ id: 59, size: 15, level: -4, label: 'Cículo - raio x1.5',
		 content: 'Magias com essa melhoria devem ser conjuradas na área de um Cículo Mágico (raio x1.5).' },
	{ id: 60, size: 15, level: -4, label: 'Cone - raio x2',
		 content: 'Magias com essa melhoria devem ser conjuradas na área de um Cone Mágico (raio x2).' },
	{ id: 61, size: 15, level: -4, label: 'Linha - raio x2.5',
		 content: 'Magias com essa melhoria devem ser conjuradas na área de uma Linha Mágica (raio x2.5).' },

	{ id: 62, size: 15, level: -5, label: '3 metros raio',
		 content: 'Magias com essa melhoria devem ser conjuradas numa área de 3 metros de raio.' },
	{ id: 63, size: 15, level: -5, label: '12 metros',
		 content: 'Magias com essa melhoria podem ser conjuradas a até 12 metros de distância do conjurador.' },

	{ id: 64, size: 15, level: -5, label: 'Círculo - raio x2',
		 content: 'Magias com essa melhoria devem ser conjuradas na área de um Cículo Mágico (raio x2).' },
	{ id: 65, size: 15, level: -5, label: 'Cone - raio x2.5',
		 content: 'Magias com essa melhoria devem ser conjuradas na área de um Cone Mágico (raio x2.5).' },
	{ id: 66, size: 15, level: -5, label: 'Linha - raio x3',
		 content: 'Magias com essa melhoria devem ser conjuradas na área de uma Linha Mágica (raio x3).' },

	{ id: 67, size: 15, level: -6, label: '5 metros raio',
		 content: 'Magias com essa melhoria devem ser conjuradas numa área de 5 metros de raio.' },
	{ id: 68, size: 15, level: -6, label: '15 metros',
		 content: 'Magias com essa melhoria podem ser conjuradas a até 15 metros de distância do conjurador.' },

	{ id: 69, size: 15, level: -6, label: 'Visão',
		 content: 'Magias com essa melhoria garantem que todos na sua linha de visão são afetados.' },

	{ id: 70, size: 30, level: -7, label: 'Mestre da Distância',
		 content: 'Desde que sua magia não seja cancelada, com um ligação ao alvo, ela alcança o mesmo independente da distância.' },
	{ id: 71, size: 30, level: -7, label: 'Mestre da Versatilidade - Duplicar',
		 content: 'Você não precisa se preocupar com falhar sua magia, afinal, você pode usá-la mais de uma vez. Você pode duplicar uma magia ao custo de -4 no teste e dano de cada uma.' },

	{ id: 72, size: 30, level: -8, label: 'Mestre da Versatilidade - Triplicar',
		 content: 'Você pode Triplicar uma magia ao custo de -6 no teste e dano de cada uma. ' },
]);
let edges = new vis.DataSet([
	{ from: 1, to: 2, arrows: 'to' },
	{ from: 1, to: 34, arrows: 'to' },
	{ from: 1, to: 48, arrows: 'to' },
	{ from: 2, to: 3, arrows: 'to' },
	{ from: 3, to: 4, arrows: 'to' },
	{ from: 3, to: 5, arrows: 'to' },
	{ from: 4, to: 6, arrows: 'to' },
	{ from: 5, to: 7, arrows: 'to' },
	{ from: 6, to: 8, arrows: 'to' },
	{ from: 7, to: 9, arrows: 'to' },
	{ from: 7, to: 10, arrows: 'to' },
	{ from: 8, to: 11, arrows: 'to' },
	{ from: 8, to: 12, arrows: 'to' },
	{ from: 9, to: 13, arrows: 'to' },
	{ from: 10, to: 14, arrows: 'to' },
	{ from: 11, to: 15, arrows: 'to' },
	{ from: 12, to: 16, arrows: 'to' },
	{ from: 13, to: 17, arrows: 'to' },
	{ from: 14, to: 18, arrows: 'to' },
	{ from: 15, to: 19, arrows: 'to' },
	{ from: 16, to: 20, arrows: 'to' },
	{ from: 17, to: 21, arrows: 'to' },
	{ from: 17, to: 22, arrows: 'to' },
	{ from: 18, to: 23, arrows: 'to' },
	{ from: 18, to: 24, arrows: 'to' },
	{ from: 19, to: 25, arrows: 'to' },
	{ from: 20, to: 26, arrows: 'to' },
	{ from: 21, to: 27, arrows: 'to' },
	{ from: 22, to: 28, arrows: 'to' },
	{ from: 23, to: 29, arrows: 'to' },
	{ from: 24, to: 29, arrows: 'to' },
	{ from: 25, to: 30, arrows: 'to' },
	{ from: 26, to: 31, arrows: 'to' },
	{ from: 28, to: 33, arrows: 'to' },
	{ from: 29, to: 33, arrows: 'to' },
	{ from: 27, to: 33, arrows: 'to' },
	{ from: 30, to: 32, arrows: 'to' },
	{ from: 31, to: 32, arrows: 'to' },	

	{ from: 34, to: 35, arrows: 'to' },
	{ from: 35, to: 36, arrows: 'to' },
	{ from: 36, to: 37, arrows: 'to' },
	{ from: 36, to: 38, arrows: 'to' },
	{ from: 37, to: 39, arrows: 'to' },
	{ from: 38, to: 40, arrows: 'to' },
	{ from: 39, to: 41, arrows: 'to' },
	{ from: 40, to: 41, arrows: 'to' },
	{ from: 41, to: 42, arrows: 'to' },
	{ from: 42, to: 43, arrows: 'to' },
	{ from: 43, to: 44, arrows: 'to' },
	{ from: 44, to: 45, arrows: 'to' },
	{ from: 44, to: 46, arrows: 'to' },
	{ from: 45, to: 47, arrows: 'to' },
	{ from: 46, to: 47, arrows: 'to' },
	
	{ from: 48, to: 49, arrows: 'to' },
	{ from: 49, to: 50, arrows: 'to' },
	{ from: 49, to: 51, arrows: 'to' },
	{ from: 50, to: 52, arrows: 'to' },
	{ from: 50, to: 53, arrows: 'to' },
	{ from: 51, to: 54, arrows: 'to' },
	{ from: 51, to: 55, arrows: 'to' },
	{ from: 51, to: 56, arrows: 'to' },
	{ from: 52, to: 57, arrows: 'to' },
	{ from: 53, to: 58, arrows: 'to' },
	{ from: 54, to: 59, arrows: 'to' },
	{ from: 55, to: 60, arrows: 'to' },
	{ from: 56, to: 61, arrows: 'to' },
	{ from: 57, to: 62, arrows: 'to' },
	{ from: 58, to: 63, arrows: 'to' },
	{ from: 59, to: 64, arrows: 'to' },
	{ from: 60, to: 65, arrows: 'to' },
	{ from: 61, to: 66, arrows: 'to' },
	{ from: 62, to: 67, arrows: 'to' },
	{ from: 63, to: 68, arrows: 'to' },
	{ from: 64, to: 69, arrows: 'to' },
	{ from: 65, to: 69, arrows: 'to' },
	{ from: 66, to: 69, arrows: 'to' },
	{ from: 67, to: 70, arrows: 'to' },
	{ from: 68, to: 70, arrows: 'to' },
	{ from: 69, to: 71, arrows: 'to' },
	{ from: 71, to: 72, arrows: 'to' }
]);	
let data = { nodes, edges };
let options = {
	layout: {
        hierarchical: {
            direction: 'DU',
            sortMethod: 'directed'
        }
    },
	nodes: { 
		font: { face: 'Raleway, Helvetica, Arial', size: 11}, 
		borderWidth: 2, shape: 'dot'
	},
	edges: { 
		color: 'solid black', dashes: true, 
		arrows: { to: { scaleFactor: 1.0 } } 
	},
	groups: { 
		podecomprar: { color: corPodeComprar },
		naopodecomprar: { color: corNaoPodeComprar }, 
		comprado: { color: corComprado },
    }
};
let network = new vis.Network(container, data, options); 

network.once('stabilized', updateNodeDisplay);
network.on('click', ({ nodes: clickedNodes }) => {
	let clickedNodeId = clickedNodes[0];
    let node = nodes.get(clickedNodeId); 

	if(node.group != 'podecomprar') 
		buy.style.display = 'none';

	//decidir se eles vao poder ver a arvore toda
	//if(node.group == 'podecomprar'){
	if(clickedNodeId > 2 && clickedNodeId != 34 && clickedNodeId != 48) {
		showContent(node.label, node.content);

		if(node.group === 'podecomprar') {
			buy.style.display = 'block';
			buy.onclick = () => {
				if(node.group === 'podecomprar' && pontos > 0) {
					customConfirm(`Comprar melhoria '${node.label}'? \n\nSobrará ${pontos - 1} Pontos de Poder.`, 
					(confirmed) => { 
						if(confirmed) {
							node.group = 'comprado'; 
							pontos--;
							nodes.update(node);
							updateNodeDisplay();
							updatePontosDisplay();
							buy.style.display = 'none';
						}
					});
				}
			}
		}
		else if(node.group === 'comprado') {
            customConfirm(`Reembolsar melhoria\n- ${node.label}?`, 
			(confirmed) => {
				if(confirmed) refundNode(clickedNodeId);
			});
		}
	}
});

var estado = JSON.stringify(data.nodes.map(({ id, group }) => ({ id, group })));
document.getElementById('estado').value = estado;

save.addEventListener('click', () => {
	estado = JSON.stringify(data.nodes.map(({ id, group }) => ({ id, group })));
	document.getElementById('estado').value = estado;
});

load.addEventListener('click', () => loadThings());

function showContent(title, text){
	document.getElementById('tituloNode').innerHTML = title;
	document.getElementById('textoNode').innerHTML = text;
}
function loadThings(){
	fetch('carregarEstado.php')
	.then(response => response.json())
	.then(estadoSalvo => {
		console.log('Dados recebidos:', estadoSalvo);
		const arv = estadoSalvo.estado_arvore;
		const p = estadoSalvo.pontos;

		if(Array.isArray(arv)) {
			arv.forEach(nodePosition => {
				data.nodes.update(nodePosition);
			});
			pontos = p;
			updatePontosDisplay();
			updateNodeDisplay();
		} else {
			console.error('Erro: os dados retornados não são um array:', estadoSalvo);
		}
	})
	.catch(error => {
		console.error('Erro ao carregar o estado da árvore:', error);
	});
}
function determinePillar(){
	for (let id = 2; id < 35; id++) {
		nodes.get(id).pillar = 'intensidade';
	}
	for (let id = 34; id < 49; id++) {
		nodes.get(id).pillar = 'frequencia';
	}
	for (let id = 48; id < 73; id++) {
		nodes.get(id).pillar = 'versatilidade';
	}
	
	nodes.forEach(node => {
		if(node.pillar == 'intensidade'){
			nodes.update({ id: node.id, color: { border: 'red' }})
		}
		else if(node.pillar == 'frequencia'){
			nodes.update({ id: node.id, color: { border: 'green' }})
		}
		else if(node.pillar == 'versatilidade'){
			nodes.update({ id: node.id, color: { border: 'blue' }})
		}
	})
}
function updatePontosDisplay() { 
	document.getElementById('pontos').value = pontos;
	document.getElementById('visPontos').textContent = pontos;
}
function updateNodeDisplay() {
	nodes.forEach(node => {
		if(node.group !== 'comprado') node.group = canBuyNode(node.id) && pontos >= 1 ? 'podecomprar' : 'naopodecomprar';
	});
	nodes.update(nodes.get());
}
function canBuyNode(nodeId) {
	return edges.get({ filter: edge => edge.to === nodeId }).some(edge => nodes.get(edge.from).group === 'comprado');
}
function getDescendants(nodeId) {
	return edges.get({ filter: edge => edge.from === nodeId }).reduce((acc, edge) => acc.concat([edge.to], getDescendants(edge.to)), []);
}
function refundNode(nodeId) {
	let descendants = getDescendants(nodeId).concat(nodeId);
	descendants.forEach(id => {
		let node = nodes.get(id);
		if(node.group === 'comprado') { pontos++; node.group = 'podecomprar'; nodes.update(node); }
	});
	updatePontosDisplay(); updateNodeDisplay();
}

loadThings();
updatePontosDisplay();