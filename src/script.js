const corNaoPodeComprar = "salmon";
const corPodeComprar = "green"; 
const corComprado = "skyblue";
const corban = "yellow";
	
const container = document.getElementById("skilltree"),
save = document.getElementById("extract-positions"), 
load = document.getElementById("load-positions");

let pontos = 10, positionsElement, dracmas = 0; // Variável para armazenar o save dos nós

let nodes = new vis.DataSet([
	{ id: 1, size: 50, level: 1, label: "Magia", group: "comprado"},

	{ id: 2, size: 30, level: 2, label: "Intensidade", group: "comprado" },

	{ id: 5, size: 15, level: 3, label: "Aprendiz", 
		content: "Magias com essa melhoria causarão 1d6+1 de dano."},

	{ id: 6, size: 15, level: 4, label: "Iniciado da Intensidade", 
		content: "Magias com essa melhoria causarão 1d6+2 de dano." },
	{ id: 7, size: 15, level: 4, label: "Iniciado de Efeitos",
		content: "Magias com essa melhoria podem causar 1d3+1 de dano e causarão 1 efeito simples em seu conjurador." },

	{ id: 8, size: 15, level: 5, label: "Praticante da Intensidade", 
		content: "Magias com essa melhoria causarão 1d6+2 de dano \n\n - O conjurador tem +1 de bônus no teste de ataque." },
	{ id: 9, size: 15, level: 5, label: "Praticante de Efeitos", 
		content: "Magias com essa melhoria podem causar 1d3+1 de dano e causarão até 2 efeitos simples em seu conjurador."  },

	{ id: 10, size: 15, level: 6, label: "Estudioso da Intensidade", 
		content: "Magias com essa melhoria causarão 1d6+3 de dano \n\n - O conjurador tem +1 de bônus no teste de ataque." },
	{ id: 11, size: 15, level: 6, label: "Estudioso de\nEfeitos simples", 
		content: "Magias com essa melhoria podem causar 1d3+2 de dano e causarão 1 efeito simples no alvo."  },
	{ id: 12, size: 15, level: 6,label: "Estudioso de\nEfeitos complexos", 
		content: "Magias com essa melhoria causarão 1 efeito complexo em seu conjurador."  },

	{ id: 13, size: 15, level: 7, label: "Prodígio da\nIntensidade ofensiva", 
		content: "Magias com essa melhoria causarão 1d6+4 de dano \n\n - O conjurador também tem +1 de bônus no teste."  },
	{ id: 14, size: 15, level: 7,label: "Prodígio da\nIntensidade ágil", 
		content: "Magias com essa melhoria causarão 1d6+3 de dano \n\n - O conjurador também tem +2 de bônus no teste."  },
	{ id: 15, size: 15, level: 7, label: "Prodígio de Efeitos gêmeos", 
		content: "Magias com essa melhoria podem causar 1d3+2 de dano e causarão 2 efeitos simples em até 2 alvos."  },
	{ id: 16, size: 15, level: 7, label: "Prodígio de Efeitos pessoais", 
		content: "Magias com essa melhoria causarão 1 efeito simples e 1 complexo em seu conjurador."  },

	{ id: 17, size: 15, level: 8, label: "Graduado da\nIntensidade ofensiva", 
		content: "Magias com essa melhoria causarão 1d6+5 de dano \n\n - O conjurador também tem +1 de bônus no teste."  },
	{ id: 18, size: 15, level: 8,label: "Graduado da\nIntensidade ágil", 
		content: "Magias com essa melhoria causarão 1d6+4 de dano \n\n - O conjurador também tem +2 de bônus no teste."  },
	{ id: 19, size: 15, level: 8, label: "Graduado de Efeitos gêmeos", 
		content: "Magias com essa melhoria podem causar 1d3+3 de dano e causarão 1 efeito complexo em até 2 alvos."  },
	{ id: 20, size: 15, level: 8, label: "Graduado de Efeitos pessoais", 
		content: "Magias com essa melhoria causarão 1 efeito simples em seu conjurador e 1 efeito simples inofensivo em todos os alvos na área."  },

	{ id: 21, size: 15, level: 9, label: "Lendário na\nIntensidade ofensiva", 
		content: "Magias com essa melhoria causarão 2d6+5 de dano \n\n - O conjurador também tem +2 de bônus no teste."  },
	{ id: 22, size: 15, level: 9,label: "Lendário na\nIntensidade ágil", 
		content: "Magias com essa melhoria causarão 1d6+4 de dano \n\n - O conjurador também tem +3 de bônus no teste."  },
	{ id: 23, size: 15, level: 9, label: "Lendário em\nEfeitos diferentes", 
		content: "Magias com essa melhoria podem causar 1d3+3 de dano e causarão 1 efeito simples e 1 complexo em até 2 alvos."  },
	{ id: 24, size: 15, level: 9,label: "Lendário em\nEfeitos idênticos", 
		content: "Magias com essa melhoria podem causar 1d3+3 de dano e causarão 1 efeito complexo em até 4 alvos."  },

	{ id: 25, size: 15, level: 9, label: "Lendário em\nEfeitos pessoais I", 
		content: "Magias com essa melhoria causarão 1 efeito complexo em seu conjurador e 1 efeito simples inofensivo em todos os alvos."  },
	{ id: 26, size: 15, level: 9,label: "Lendário em\nEfeitos pessoais II", 
		content: "Magias com essa melhoria causarão 1 efeito simples em seu conjurador e 1 efeito simples em todos os alvos."  },

	{ id: 27, size: 15, level: 10, label: "Supremo na\nIntensidade ofensiva", 
		content: "Magias com essa melhoria causarão 2d6+6 de dano \n\n - O conjurador também tem +2 de bônus no teste."  },
	{ id: 28, size: 15, level: 10,label: "Supremo na\nIntensidade ágil", 
		content: "Magias com essa melhoria causarão 2d6+5 de dano \n\n - O conjurador também tem +3 de bônus no teste."  },
	{ id: 29, size: 15, level: 10, label: "Supremo em\nEfeitos diferentes", 
		content: "Magias com essa melhoria podem causar 1d3+3 de dano e causarão 1 efeito simples e 1 complexo em até 3 alvos."  },
	{ id: 30, size: 15, level: 10,label: "Supremo em\nEfeitos em área", 
		content: "Magias com essa melhoria podem causar 1d3+3 de dano e causarão 1 efeito complexo em todos os alvos."  },
	{ id: 31, size: 15, level: 10, label: "Supremo em\nEfeitos pessoais", 
		content: "Magias com essa melhoria podem causar 1d3+3 de dano e causarão 1 efeito complexo em seu conjurador e em 1 alvo."  },

	{ id: 32, size: 15, level: 11, label: "Arquimago da\nIntensidade ofensiva", 
		content: "Magias com essa melhoria causarão 2d6+7 de dano \n\n - O conjurador também tem +2 de bônus no teste."  },
	{ id: 33, size: 15, level: 11,label: "Arquimago da\nIntensidade ágil", 
		content: "Magias com essa melhoria causarão 2d6+5 de dano \n\n - O conjurador também tem +4 de bônus no teste."  },

	{ id: 34, size: 30, level: 12, label: "Mestre da Intensidade", 
		content: "Sua pura força de vontade transforma a intensidade de suas magias. \n\n - Você pode realocar os bônus de dano e de teste recebidos pela árvore livremente"  },
	{ id: 35, size: 30, level: 12, label: "Mestre dos Efeitos", 
		content: "Seus debuffs são destruídores. \n\n - Inimigos rolam resistência contra suas magias com uma penalidade igual seu atributo correspondente."  },

	{ id: 3, size: 30, level: 0, label: "Frequência", group: "comprado"},

	{ id: 36, size: 15, level: -1, label: "Instantântanea", content: "Magias com essa melhoria têm a duração instantânea.\n\nNível mínimo da magia: Aprendiz." },

	{ id: 37, size: 15, level: -2, label: "Concentração\n1 turno", content: "Magias com essa melhoria devem ser concentradas em para manter o seu efeito, máximo de 1 turno após o primeiro.\n\nNível mínimo da magia: Iniciado." },

	{ id: 38, size: 15, level: -3, label: "Concentração\n2 turnos", content: "Magias com essa melhoria devem ser concentradas em para manter o seu efeito, máximo de 2 turnos após o primeiro.\n\nNível da magia: Praticante." },
	{ id: 39, size: 15, level: -3, label: "Concentração\n1d4 turnos", content: "Magias com essa melhoria devem ser concentradas em para manter o seu efeito, máximo de 1d4 turnos após o primeiro.\n\nNível mínimo da magia: Praticante." },

	{ id: 40, size: 15, level: -4, label: "Concentração\n4 turnos", content: "Magias com essa melhoria devem ser concentradas em para manter o seu efeito, máximo de 4 turnos após o primeiro.\n\nNível mínimo da magia: Estudioso." },
	{ id: 41, size: 15, level: -4, label: "Concentração\n1d6+1 turnos", content: "Magias com essa melhoria devem ser concentradas em para manter o seu efeito, máximo de 1d6+1 turnos após o primeiro.\n\nNível mínimo da magia: Estudioso." },

	{ id: 42, size: 15, level: -5, label: "Determinada\n1 turno", content: "Magias com essa melhoria têm a duração determinada, durando 1 turno após o primeiro.\n\nNível mínimo da magia: Prodígio." },

	{ id: 43, size: 15, level: -6, label: "Determinada\n2 turnos", content: "Magias com essa melhoria têm a duração determinada, durando 2 turnos após o primeiro.\n\nNível mínimo da magia: Poderoso." },

	{ id: 44, size: 15, level: -7, label: "Círculo Mágico", content: "Magias com essa melhoria garantem que contanto que o alvo esteja na área do cículo mágico, ele continuará sendo afetado. \n\n- Tamanho depende do formato na versatilidade no qual foi conjurado.\n\nNível mínimo da magia: Lendário." },

	{ id: 45, size: 15, level: -8, label: "Visão", content: "Magias com essa melhoria garantem que contanto que o alvo esteja na sua área de visão, ele continuará sendo afetado.\n\nNível mínimo da magia: Supremo." },

	{ id: 46, size: 15, level: -9, label: "Determinada\n12 horas", content: "Magias com essa melhoria têm a duração determinada, durando até 12 horas.\n\nNível mínimo da magia: Arquimago." },
	{ id: 47, size: 15, level: -9, label: "Determinada\nPôr do sol", content: "Magias com essa melhoria têm a duração determinada, durando até o pôr do sol.\n\nNível mínimo da magia: Arquimago." },

	{ id: 48, size: 30, level: -10, label: "Mestre da Frequência", content: "Você tem total controle da duração das suas magias. Você consegue manter uma quantidade de magias permanentemente igual ao seu maior atributo mágico." },

	{ id: 4, size: 30, level: 0, label: "Versatilidade", group: "comprado" },
	{ id: 49, size: 15, level: -1, label: "Toque", content: "Magias com essa melhoria devem ser conjuradas por Toque.\n\nNível mínimo da magia: Aprendiz." },

	{ id: 50, size: 15, level: -2, label: "Próximo", content: "Magias com essa melhoria devem ser conjuradas numa distância que você poderia tocar sem se mexer (1 metro).\n\nNível mínimo da magia: Iniciado." },
	{ id: 51, size: 15, level: -2, label: "Cículo mágico", content: "Magias com essa melhoria devem ser conjuradas na área de um Cículo Mágico (1 metro de raio).\n\nNível mínimo da magia: Iniciado." },

	{ id: 52, size: 15, level: -3, label: "2 metros raio", content: "Magias com essa melhoria devem ser conjuradas numa área de 2 metros de raio.\n\nNível mínimo da magia: Praticante." },
	{ id: 53, size: 15, level: -3, label: "5 metros", content: "Magias com essa melhoria podem ser conjuradas a até 5 metros de distância do conjurador.\n\nNível mínimo da magia: Praticante." },

	{ id: 54, size: 15, level: -3, label: "Cículo - raio x1", content: "Magias com essa melhoria devem ser conjuradas na área de um Cículo Mágico (raio x1).\n\nNível mínimo da magia: Praticante." },
	{ id: 55, size: 15, level: -3, label: "Cone - raio x1.5", content: "Magias com essa melhoria devem ser conjuradas na área de um Cone Mágico (raio x1.5).\n\nNível mínimo da magia: Praticante." },
	{ id: 56, size: 15, level: -3, label: "Linha - raio x2", content: "Magias com essa melhoria devem ser conjuradas na área de uma Linha Mágica (raio x2).\n\nNível mínimo da magia: Praticante." },

	{ id: 57, size: 15, level: -4, label: "2.5 metros raio", content: "Magias com essa melhoria devem ser conjuradas numa área de 2.5 metros de raio.\n\nNível mínimo da magia: Estudioso." },
	{ id: 58, size: 15, level: -4, label: "8 metros", content: "Magias com essa melhoria podem ser conjuradas a até 8 metros de distância do conjurador.\n\nNível mínimo da magia: Estudioso." },

	{ id: 59, size: 15, level: -4, label: "Cículo - raio x1.5", content: "Magias com essa melhoria devem ser conjuradas na área de um Cículo Mágico (raio x1.5).\n\nNível mínimo da magia: Estudioso." },
	{ id: 60, size: 15, level: -4, label: "Cone - raio x2", content: "Magias com essa melhoria devem ser conjuradas na área de um Cone Mágico (raio x2).\n\nNível mínimo da magia: Estudioso." },
	{ id: 61, size: 15, level: -4, label: "Linha - raio x2.5", content: "Magias com essa melhoria devem ser conjuradas na área de uma Linha Mágica (raio x2.5).\n\nNível mínimo da magia: Estudioso." },

	{ id: 62, size: 15, level: -5, label: "3 metros raio", content: "Magias com essa melhoria devem ser conjuradas numa área de 3 metros de raio.\n\nNível mínimo da magia: Prodígio." },
	{ id: 63, size: 15, level: -5, label: "12 metros", content: "Magias com essa melhoria podem ser conjuradas a até 12 metros de distância do conjurador.\n\nNível mínimo da magia: Prodígio." },

	{ id: 64, size: 15, level: -5, label: "Círculo - raio x2", content: "Magias com essa melhoria devem ser conjuradas na área de um Cículo Mágico (raio x2).\n\nNível mínimo da magia: Prodígio." },
	{ id: 65, size: 15, level: -5, label: "Cone - raio x2.5", content: "Magias com essa melhoria devem ser conjuradas na área de um Cone Mágico (raio x2.5).\n\nNível mínimo da magia: Prodígio." },
	{ id: 66, size: 15, level: -5, label: "Linha - raio x3", content: "Magias com essa melhoria devem ser conjuradas na área de uma Linha Mágica (raio x3).\n\nNível mínimo da magia: Prodígio." },

	{ id: 67, size: 15, level: -6, label: "5 metros raio", content: "Magias com essa melhoria devem ser conjuradas numa área de 5 metros de raio.\n\nNível mínimo da magia: Poderoso." },
	{ id: 68, size: 15, level: -6, label: "15 metros", content: "Magias com essa melhoria podem ser conjuradas a até 15 metros de distância do conjurador.\n\nNível mínimo da magia: Poderoso." },

	{ id: 69, size: 15, level: -6, label: "Visão", content: "Magias com essa melhoria garantem que todos na sua linha de visão são afetados.\n\nNível mínimo da magia: Poderoso." },

	{ id: 70, size: 30, level: -7, label: "Mestre da Distância", content: "Desde que sua magia não seja cancelada, com um ligação ao alvo, ela alcança o mesmo independente da distância." },
	{ id: 71, size: 30, level: -7, label: "Mestre da Versatilidade - Duplicar", content: "Você não precisa se preocupar com falhar sua magia, afinal, você pode usá-la mais de uma vez. Você pode duplicar uma magia ao custo de -4 no teste e dano de cada uma." },

	{ id: 72, size: 30, level: -8, label: "Mestre da Versatilidade - Triplicar", content: "Você pode Triplicar uma magia ao custo de -6 no teste e dano de cada uma. \n\nNível mínimo da magia: Lendário." },
]);
let edges = new vis.DataSet([
	{ from: 1, to: 2, arrows: "to" },
	{ from: 1, to: 3, arrows: "to" },
	{ from: 1, to: 4, arrows: "to" },
	{ from: 2, to: 5, arrows: "to" },
	{ from: 5, to: 6, arrows: "to" },
	{ from: 5, to: 7, arrows: "to" },
	{ from: 6, to: 8, arrows: "to" },
	{ from: 7, to: 9, arrows: "to" },
	{ from: 8, to: 10, arrows: "to" },
	{ from: 9, to: 11, arrows: "to" },
	{ from: 9, to: 12, arrows: "to" },
	{ from: 10, to: 13, arrows: "to" },
	{ from: 10, to: 14, arrows: "to" },
	{ from: 11, to: 15, arrows: "to" },
	{ from: 12, to: 16, arrows: "to" },
	{ from: 13, to: 17, arrows: "to" },
	{ from: 14, to: 18, arrows: "to" },
	{ from: 15, to: 19, arrows: "to" },
	{ from: 16, to: 20, arrows: "to" },
	{ from: 17, to: 21, arrows: "to" },
	{ from: 18, to: 22, arrows: "to" },
	{ from: 19, to: 23, arrows: "to" },
	{ from: 19, to: 24, arrows: "to" },
	{ from: 20, to: 25, arrows: "to" },
	{ from: 20, to: 26, arrows: "to" },
	{ from: 21, to: 27, arrows: "to" },
	{ from: 22, to: 28, arrows: "to" },
	{ from: 23, to: 29, arrows: "to" },
	{ from: 24, to: 30, arrows: "to" },
	{ from: 25, to: 31, arrows: "to" },
	{ from: 26, to: 31, arrows: "to" },
	{ from: 27, to: 32, arrows: "to" },
	{ from: 28, to: 33, arrows: "to" },
	{ from: 29, to: 35, arrows: "to" },
	{ from: 30, to: 35, arrows: "to" },
	{ from: 31, to: 35, arrows: "to" },
	{ from: 32, to: 34, arrows: "to" },
	{ from: 33, to: 34, arrows: "to" },

	{ from: 3, to: 36, arrows: "to" },
	{ from: 36, to: 37, arrows: "to" },
	{ from: 37, to: 38, arrows: "to" },
	{ from: 37, to: 39, arrows: "to" },
	{ from: 38, to: 40, arrows: "to" },
	{ from: 39, to: 41, arrows: "to" },
	{ from: 40, to: 42, arrows: "to" },
	{ from: 41, to: 42, arrows: "to" },
	{ from: 42, to: 43, arrows: "to" },
	{ from: 43, to: 44, arrows: "to" },
	{ from: 44, to: 45, arrows: "to" },
	{ from: 45, to: 46, arrows: "to" },
	{ from: 45, to: 47, arrows: "to" },
	{ from: 46, to: 48, arrows: "to" },
	{ from: 47, to: 48, arrows: "to" },
	
	{ from: 4, to: 49, arrows: "to" },
	{ from: 49, to: 50, arrows: "to" },
	{ from: 49, to: 51, arrows: "to" },
	{ from: 50, to: 52, arrows: "to" },
	{ from: 50, to: 53, arrows: "to" },
	{ from: 51, to: 54, arrows: "to" },
	{ from: 51, to: 55, arrows: "to" },
	{ from: 51, to: 56, arrows: "to" },
	{ from: 52, to: 57, arrows: "to" },
	{ from: 53, to: 58, arrows: "to" },
	{ from: 54, to: 59, arrows: "to" },
	{ from: 55, to: 60, arrows: "to" },
	{ from: 56, to: 61, arrows: "to" },
	{ from: 57, to: 62, arrows: "to" },
	{ from: 58, to: 63, arrows: "to" },
	{ from: 59, to: 64, arrows: "to" },
	{ from: 60, to: 65, arrows: "to" },
	{ from: 61, to: 66, arrows: "to" },
	{ from: 62, to: 67, arrows: "to" },
	{ from: 63, to: 68, arrows: "to" },
	{ from: 64, to: 69, arrows: "to" },
	{ from: 65, to: 69, arrows: "to" },
	{ from: 66, to: 69, arrows: "to" },
	{ from: 67, to: 70, arrows: "to" },
	{ from: 68, to: 70, arrows: "to" },
	{ from: 69, to: 71, arrows: "to" },
	{ from: 71, to: 72, arrows: "to" },
]);	
// Definição dos dados e opções de exibição da árvore
let data = { nodes, edges };
let options = {
	layout: {
        hierarchical: {
            direction: "DU", // Up-Down (ou use "LR" para Left-Right)
            sortMethod: "directed", // Método de ordenação dos nós
        }
    },
	nodes: { 
		font: { face: "Raleway, Helvetica, Arial", size: 11, color: "#000"}, 
		borderWidth: 1, shape: "dot",
	},
	
	edges: { 
		color: "solid black", dashes: true, 
		arrows: { to: { scaleFactor: 1.0 } } 
	},
	groups: { 
		podecomprar: { color: { background: corPodeComprar, border: "#333" } },
		naopodecomprar: { color: { background: corNaoPodeComprar, border: "#333" } }, 
		comprado: { color: { background: corComprado, border: "#333"} },
    }
};
// Inicializa a rede visualizando a árvore de habilidades dentro do container
let network = new vis.Network(container, data, options); 

// Evento que executa após a estabilização inicial da rede
network.once("stabilized", updateNodeDisplay);
network.on("click", ({ nodes: clickedNodes }) => {
	let clickedNodeId = clickedNodes[0];
    let node = nodes.get(clickedNodeId); 

	if (clickedNodeId > 4) {
		if (node.group === "podecomprar" && pontos > 0 && confirm(`Comprar melhoria "${node.label}"? \n- ${node.content} \n\nSobrará ${pontos - 1} Pontos de Poder.`)){
			node.group = "comprado"; pontos--;
		}
		else if (node.group === "comprado" && confirm(`Reembolsar melhoria \n- ${node.label}?`)) {
			refundNodeAndDescendants(clickedNodeId);
		}
		updatepontosDisplay(); updateNodeDisplay();
	}
});

var estado = JSON.stringify(data.nodes.map(({ id, group }) => ({ id, group })));
document.getElementById('minhaVariavel').value = estado;

save.addEventListener("click", () => {
	estado = JSON.stringify(data.nodes.map(({ id, group }) => ({ id, group })));
	document.getElementById('minhaVariavel').value = estado;
});

load.addEventListener("click", () => {
    console.log('Botão "Carregar Árvore" clicado');
    fetch('carregarEstado.php')
        .then(response => response.json())
        .then(estadoSalvo => {
            console.log('Dados recebidos:', estadoSalvo);
            
            // Verifique se estadoSalvo é um array antes de usar forEach
            if (Array.isArray(estadoSalvo)) {
                estadoSalvo.forEach(nodePosition => {
                    data.nodes.update(nodePosition);
                });
                updatepontosDisplay();
                updateNodeDisplay();
            } else {
                console.error("Erro: os dados retornados não são um array:", estadoSalvo);
            }
        })
        .catch(error => {
            console.error('Erro ao carregar o estado da árvore:', error);
        });
});

function updatepontosDisplay() { 
	document.getElementById("pontos").textContent = pontos; 
}
function updateNodeDisplay() {
	nodes.forEach(node => {
		if (node.group !== "comprado") node.group = canBuyNode(node.id) && pontos >= 1 ? "podecomprar" : "naopodecomprar";
	});
	nodes.update(nodes.get());
}
function canBuyNode(nodeId) { // Verifica as arestas que levam até este nó
	return edges.get({ filter: edge => edge.to === nodeId }).some(edge => nodes.get(edge.from).group === "comprado");
}                                                            // Verifica se algum nó predecessor está selecionado
function getDescendants(nodeId) {
	return edges.get({ filter: edge => edge.from === nodeId }).reduce((acc, edge) => acc.concat([edge.to], getDescendants(edge.to)), []);
}
function refundNodeAndDescendants(nodeId) {
	let descendants = getDescendants(nodeId).concat(nodeId);
	descendants.forEach(id => {
		let node = nodes.get(id);
		if (node.group === "comprado") { pontos++; node.group = "podecomprar"; nodes.update(node); }
	});
	updatepontosDisplay(); updateNodeDisplay();
}
updatepontosDisplay();