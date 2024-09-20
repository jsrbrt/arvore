<?php
session_start();

// Verificar se o usuário está logado
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["erro" => "Usuário não logado"]);
    exit();
}

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "RazNormal";

// Criar a conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Capturar o id do usuário da sessão
$user_id = $_SESSION['user_id'];

// Buscar o estado da árvore do banco de dados
$stmt = $conn->prepare("SELECT estado_arvore FROM cadastro WHERE usuario_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($estado_arvore);
$stmt->fetch();
$stmt->close();
$conn->close();

// Certifique-se de que está retornando um JSON válido
if ($estado_arvore) {
    // Decodifica a string JSON e a re-encoda para garantir um JSON válido
    $estado_arvore_decoded = json_decode($estado_arvore, true);
    echo json_encode($estado_arvore_decoded); // Certifique-se de que está retornando um array/objeto JSON
} else {
    echo json_encode([]);
}
?>
