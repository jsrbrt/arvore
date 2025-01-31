<?php
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
$senha = password_hash($_POST['usuario_senha'], PASSWORD_BCRYPT);
$estado = $_POST['estado'];

// Preparar e executar a consulta
$stmt = $conn->prepare("INSERT INTO cadastro (usuario_nome, usuario_senha, estado_arvore) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $nome, $senha, $estado);
if ($stmt->execute()) {
    // Cadastro realizado com sucesso, redirecionar para login
    header("Location: login.html");
    exit();
} else {
    echo "<p>Erro ao cadastrar o usuário.</p>";
}

$stmt->close();
$conn->close();
?>
