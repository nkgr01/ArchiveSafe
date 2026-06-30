<?php
try {
    $pdo = new PDO('mysql:host=127.0.0.1;dbname=archivesafe', 'root', '');
    echo "✅ Connexion MySQL réussie !\n";
    echo "Version MySQL : " . $pdo->getAttribute(PDO::ATTR_SERVER_VERSION) . "\n";
} catch (PDOException $e) {
    echo "❌ Erreur : " . $e->getMessage() . "\n";
}
?>