<!-- tabla.php -->

<thead>
    <tr>
        <th>ID</th>
        <th>Correo</th>
        <th>Nombre</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><?php echo $_SESSION['idCliente']; ?></td>
        <td><?php echo $_SESSION['correoCliente']; ?></td>
        <td><?php echo $_SESSION['nombreCliente']; ?></td>
    </tr>
</tbody>
