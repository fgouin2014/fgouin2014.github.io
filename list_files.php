<?php
$directory = './'; // Répertoire à parcourir

// Ouvrir le répertoire
if ($handle = opendir($directory)) {
    $files = array();
    
    // Lire les fichiers du répertoire
    while (false !== ($entry = readdir($handle))) {
        if (is_file($entry) && pathinfo($entry, PATHINFO_EXTENSION) === 'html') {
            $files[] = $entry;
        }
    }
    
    closedir($handle);
    
    // Renvoyer la liste des fichiers en JSON
    header('Content-Type: application/json');
    echo json_encode($files);
}
?>
