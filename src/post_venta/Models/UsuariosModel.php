<?php
class UsuariosModel extends Query{
    private $usuario, $nombre, $clave, $id_caja, $id, $estado, $typecustomerid, $idCliente;
    public function __construct()
    {
        parent::__construct();
    }
    public function getVerificar($correo)
    {
        $sql = 'SELECT * FROM "Customers" WHERE email = \'' . $correo . '\'';
        // $sql = "SELECT * FROM clientes WHERE correo = '$correo'";
        return $this->select($sql);
    }
    public function getUsuario(string $usuario, string $clave)
    {
        $sql = "SELECT * FROM usuarios WHERE usuario = '$usuario' AND clave = '$clave'";
        // $sql = 'SELECT * FROM "Customers" WHERE "firstName" = \'' . $usuario . '\' AND clave = \'' . $clave . '\'';
        $data = $this->select($sql);
        return $data;
    }
    public function getCajas()
    {
        $sql = "SELECT * FROM caja WHERE estado = 1";
        $data = $this->selectAll($sql);
        return $data;
    }
    // public function getUsuarios()
    // {
    //     $sql = "SELECT u.*, c.id as id_caja, c.caja FROM usuarios u INNER JOIN caja c WHERE u.id_caja = c.id";
    //     $data = $this->selectAll($sql);
    //     return $data;
    // }
    public function getUsuarios($id, $typecustomerid)
    {
        $sql = 'SELECT * FROM "Customers" WHERE ref = \'' . $id . '\'AND "typecustomerId" = \'' . $typecustomerid . '\' order BY id';
        $data = $this->selectAll($sql);
        return $data;
        
    }
    public function getActivo($id)
    {
        $sql = 'SELECT "isVerified" FROM "Customers" WHERE id = \'' . $id . '\'';
        $data = $this->select($sql);
        // return $data;
        if (!empty($data)) {
            return $data[0]['isVerified'];
        } else {
            // return $data[0]['isVerified'];
            return false; // O algún valor por defecto si no hay resultados
        }
        
    }
    public function getCompras($id)
    {
        $sql = 'SELECT * FROM "Movements" WHERE "customerId" = \'' . $id . '\' ORDER BY "createdAt" DESC';
        $data = $this->selectAll($sql);
        return $data;
        
    }
    // public function getDetalles($idFactura)
    // {   $sql = 'SELECT MI.*, P.name AS nombre_producto FROM "Movement_items" AS MI JOIN "Productos" AS P ON MI."productId" = P.id
    //     WHERE MI."movementId" = \'' . $idFactura . '\'';
    //     // $sql = 'SELECT * FROM "Movement_items" WHERE "movementId" = \'' . $idFactura . '\'';
    //     $data = $this->selectAll($sql);
    //     return $data;
        
    // }

    public function getDetalles($idFactura)
    {
        $sql = 'SELECT MI.*, P.name AS nombre_producto, P.price_afiliate AS precio
                FROM "Movement_items" AS MI
                JOIN "Products" AS P ON MI."productId" = P.id
                WHERE MI."movementId" = \'' . $idFactura . '\'';
        
        try {
            $data = $this->selectAll($sql);
            return $data;
        } catch (PDOException $e) {
            // Manejo de error
            echo "Error en la consulta: " . $e->getMessage();
            return null;
        }
    }

    // public function getComprasmes($idCliente, $mes, $anio)
    // {
    //     Realiza la consulta para obtener las compras del cliente en el mes y año dados
    //     $sql = 'SELECT SUM(total) AS total_compras FROM "Movements" WHERE "customerId" = :idCliente AND EXTRACT(MONTH FROM "createdAt") = :mes AND EXTRACT(YEAR FROM "createdAt") = :anio';
    //     $params = array(
    //         'idCliente' => $idCliente,
    //         'mes' => $mes,
    //         'anio' => $anio
    //     );
        
    //     $stmt = $this->db->prepare($sql);
    //     $stmt->execute($params);
    //     $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
    
    //     return $resultado['total_compras'];
    // }
    public function getComprasmes22($idCliente, $mes, $anio)
    {
        // Realiza la consulta para obtener las compras del cliente en el mes y año dados
        $sql = 'SELECT SUM(total) AS total_compras FROM "Movements" WHERE "customerId" = \'' . $idCliente . '\' AND EXTRACT(MONTH FROM "createdAt") = \'' . $mes . '\' AND EXTRACT(YEAR FROM "createdAt") = \'' . $anio . '\'';
        
        try {
            $data = $this->select($sql);
            return $data;
        } catch (PDOException $e) {
            // Manejo de error
            echo "Error en la consulta: " . $e->getMessage();
            return null;
        }
    }
    public function getComprasmes($idCliente, $mes, $anio)
    {
        $sql = 'SELECT SUM(total) AS totalc FROM "Movements" WHERE "customerId" = \'' . $idCliente . '\' AND EXTRACT(MONTH FROM "createdAt") = \'' . $mes . '\' AND EXTRACT(YEAR FROM "createdAt") = \'' . $anio . '\'';
        
        try {
            $data = $this->selectAll($sql);
            return $data;
        } catch (PDOException $e) {
            // Manejo de error
            echo "Error en la consulta: " . $e->getMessage();
            return null;
        }
    }



    public function registrarUsuario(string $usuario, string $nombre, string $clave, int $id_caja)
    {
        $this->usuario = $usuario;
        $this->nombre = $nombre;
        $this->clave = $clave;
        $this->id_caja = $id_caja;
        $verificar = "SELECT * FROM usuarios WHERE usuario = '$this->usuario'";
        $existe = $this->select($verificar);
        if (empty($existe)) {
            $sql = "INSERT INTO usuarios(usuario, nombre, clave, id_caja) VALUES (?,?,?,?)";
            $datos = array($this->usuario, $this->nombre, $this->clave, $this->id_caja);
            $data = $this->save($sql, $datos);
            if ($data == 1) {
                $res = "ok";
            }else{
                $res = "error";
            }
        }else{
            $res = "existe"; 
        }
        
        return $res;
    }
    public function modificarUsuario(string $usuario, string $nombre, int $id_caja, int $id)
    {
        $this->usuario = $usuario;
        $this->nombre = $nombre;
        $this->id = $id;
        $this->id_caja = $id_caja;
        $sql = "UPDATE usuarios SET usuario = ?, nombre = ?, id_caja = ? WHERE id = ?";
        $datos = array($this->usuario, $this->nombre, $this->id_caja, $this->id);
        $data = $this->save($sql, $datos);
        if ($data == 1) {
            $res = "modificado";
        }else{
            $res = "error";
        }
        return $res;
    }
    public function editarUser(int $id)
    {
        $sql = "SELECT * FROM usuarios WHERE id = $id";
        $data = $this->select($sql);
        return $data;
    }
    public function accionUser(int $estado, int $id)
    {
        $this->id = $id;
        $this->estado = $estado;
        $sql = "UPDATE usuarios SET estado = ? WHERE id = ?";
        $datos = array($this->estado, $this->id);
        $data = $this->save($sql, $datos);
        return $data;
    }
}


?>