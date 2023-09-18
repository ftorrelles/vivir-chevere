<?php
// class Conexion{
//     private $conect;
//     public function __construct()
//     {
//         $pdo = "mysql:host=".host.";dbname=".db.";.charset.";
//         try {
//             $this->conect = new PDO($pdo, user, pass);
//             $this->conect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//         } catch (PDOException $e) {
//             echo "Error en la conexion".$e->getMessage();
//         }
//     }
//     public function conect()
//     {
//         return $this->conect;
//     }
// }

class Conexion{
    private $conect;
    public function __construct()
    {
        $pdo = "pgsql:host=".host.";port=".port.";dbname=".db.";user=".user.";password=".pass.";";

        try {
            $this->conect = new PDO($pdo);
            $this->conect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Error en la conexión: " . $e->getMessage();
        }
    }
    public function conect()
    {
        return $this->conect;
    }
}







?>