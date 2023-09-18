<?php
// routes.php

// Definir la ruta para obtener detalles de factura
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'obtenerDetallesFactura') {
    require 'FacturaController.php'; // Incluye el archivo del controlador

    $idFactura = isset($_GET['id']) ? $_GET['id'] : null;

    if ($idFactura !== null) {
        obtenerDetallesFactura($idFactura); // Llama a la función en el controlador
    } else {
        // Manejo de error: ID de factura no proporcionado
    }
}

?>
