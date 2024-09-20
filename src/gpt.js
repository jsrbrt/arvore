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
		content: "Magias com essa melhoria causarão 1d6+2 de dano." }
]);
let edges = new vis.DataSet([
	{ from: 1, to: 2, arrows: "to" },
	{ from: 1, to: 3, arrows: "to" },
	{ from: 1, to: 4, arrows: "to" },
	{ from: 2, to: 5, arrows: "to" },
	{ from: 5, to: 6, arrows: "to" },
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
	JSON.parse(document.getElementById('minhaVariavel').value).forEach(nodePosition => data.nodes.update(nodePosition));
	updatepontosDisplay();
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