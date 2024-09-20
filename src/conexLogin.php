<?php
session_start(); // Iniciar a sessão

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "RazNormal";

// Criar a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar a conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Capturar dados do formulário
$nome = $_POST['usuario_nome'];
$senha = $_POST['usuario_senha'];

// Verificar se o usuário existe
$stmt = $conn->prepare("SELECT usuario_id, usuario_senha FROM cadastro WHERE usuario_nome = ?");
$stmt->bind_param("s", $nome);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($id, $hashed_password);
$stmt->fetch();

if ($stmt->num_rows > 0 && password_verify($senha, $hashed_password)) {
    // Login bem-sucedido
    $_SESSION['user_id'] = $id; // Armazenar o ID do usuário na sessão
    header("Location: arvore.html"); // Redirecionar para a árvore
} else {
    echo "<p>Usuário ou senha inválidos.</p>";
}

$stmt->close();
$conn->close();
