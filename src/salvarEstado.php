<?php
session_start();

// Verificar se o usuário está logado
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Usuário não está logado']);
    exit();
}

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "RazNormal";

// Criar a conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(['error' => 'Erro na conexão com o banco de dados']);
    exit();
}

// Capturar o id do usuário da sessão e o estado da árvore
$user_id = $_SESSION['user_id'];
$estado = $_POST['minhaVariavel'];

// Preparar e executar a consulta
$stmt = $conn->prepare("UPDATE cadastro SET estado_arvore = ? WHERE usuario_id = ?");
$stmt->bind_param("si", $estado, $user_id);

if ($stmt->execute()) {
    echo json_encode(['success' => 'Estado salvo com sucesso']);
    header("Location: arvore.html"); // Redirecionar para a árvore

} else {
    echo json_encode(['error' => 'Erro ao salvar o estado']);
}

$stmt->close();
$conn->close();
?>
