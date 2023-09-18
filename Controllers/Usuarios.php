<?php
class Usuarios extends Controller{
    public function __construct()
    {
        parent::__construct();
        session_start();
    }
    public function index()
    {
        if (empty($_SESSION['correoCliente'])) {
            header('Location: ' . base_url);
        }
        $id = $_SESSION['idCliente'];
        // $id = '1';
        $typecustomerid = '2';
        // $usuarios = $this->model->getUsuarios($id, $typecustomerid);
        // print_r($usuarios);
        // $data['usuarios'] = $usuarios;
        // $this->views->getView($this, "index", $data);

        $this->views->getView($this, "index");
        // $usuarios = $this->model->getUsuarios($id, $typecustomerid);
        // print_r($usuarios);
        // if (!empty($usuarios)) {
        //     $data['usuarios'] = $usuarios;
        // } else {
        //     $data['usuarios'] = array(); // Si no hay usuarios, crea un arreglo vacío
        // }
        // print_r($data);
        // $this->views->getView($this, "index", $data);
        
    }
    public function cargarTabla()
    {
        $id = $_SESSION['idCliente'];
        $typecustomerid = '2';
        $usuarios = $this->model->getUsuarios($id, $typecustomerid);
        echo json_encode($usuarios, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function cargarTablaR()
    {
        $id = $_SESSION['idCliente'];
        $typecustomerid = '1';
        $usuarios = $this->model->getUsuarios($id, $typecustomerid);
        echo json_encode($usuarios, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function cargarTablaD()
    {
        $id = $_SESSION['idCliente'];
        $usuarios = $this->model->getCompras($id);
        echo json_encode($usuarios, JSON_UNESCAPED_UNICODE);
        die();
    }

//login directo
    public function loginDirecto()
    {
        if (isset($_POST['correoLogin']) && isset($_POST['claveLogin'])) {
            if (empty($_POST['correoLogin']) || empty($_POST['claveLogin'])) {
                $mensaje = array('msg' => 'TODO LOS CAMPOS SON REQUERIDOS', 'icono' => 'warning');
            } else {
                $correo = $_POST['correoLogin'];
                $clave = $_POST['claveLogin'];
                $verificar = $this->model->getVerificar($correo);
                if (!empty($verificar)) {
                    if (password_verify($clave, $verificar['password'])) {
                        $_SESSION['idCliente'] = $verificar['id'];
                        $_SESSION['correoCliente'] = $verificar['email'];
                        $_SESSION['nombreCliente'] = $verificar['username'];
                        $mensaje = array('msg' => 'OK', 'icono' => 'success');
                    } else {
                        $mensaje = array('msg' => 'CONTRASEÑA INCORRECTA', 'icono' => 'error');
                    }
                } else {
                    $mensaje = array('msg' => 'EL CORREO NO EXISTE', 'icono' => 'warning');
                }
            }
            echo json_encode($mensaje, JSON_UNESCAPED_UNICODE);
            die();
        }
    }
    public function activo($id)
    {
        $data = $this->model->getActivo($id);

        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function salir()
    {
        session_destroy();
        header('Location: ' . base_url);
    }
    // Usuarios.php

    // Usuarios.php

    public function detalleFactura() {
        $idFactura = $_GET['id'];
        $detalles = $this->model->getDetalles($idFactura);

        // Crea una representación HTML de los detalles de la factura
        $htmlDetalles = '<p>Detalles de la factura:</p>';

        // Agrega los detalles obtenidos de la base de datos al HTML
        foreach ($detalles as $detalle) {
            $htmlDetalles .= '<p>Producto: ' . $detalle['producto'] . '</p>';
            $htmlDetalles .= '<p>Cantidad: ' . $detalle['cantidad'] . '</p>';
            $htmlDetalles .= '<p>Precio: ' . $detalle['precio'] . '</p>';
            // Agrega más campos si es necesario
        }

        // Retorna los detalles en formato HTML
        echo $htmlDetalles;
    }

    public function obtenerDetalle() {
        $idFactura = $_GET['id'];
        $detalles = $this->model->getDetalles($idFactura);

        // Crea una representación HTML de los detalles de la factura
        $htmlDetalles = '<p>Detalles de la factura:</p>';

        // Agrega los detalles obtenidos de la base de datos al HTML
        foreach ($detalles as $detalle) {
            $htmlDetalles .= '<p>Producto: ' . $detalle['producto'] . '</p>';
            $htmlDetalles .= '<p>Cantidad: ' . $detalle['cantidad'] . '</p>';
            $htmlDetalles .= '<p>Precio: ' . $detalle['precio'] . '</p>';
            // Agrega más campos si es necesario
        }

        // Retorna los detalles en formato HTML
        echo $htmlDetalles;
    }
    public function obtenerDetalleFactura($id)
    {
        $idFactura = $id;
        $detallesFactura = $this->model->getDetalles($idFactura);
        echo json_encode($detallesFactura, JSON_UNESCAPED_UNICODE);
        die();
    }
    // public function totalcomprasmes()
    // {
    //     $mes = $_GET['mes'];
    //     $anio = $_GET['anio'];
    //     $idCliente = $_SESSION['idCliente'];
    //     $totalCompras = $this->model->getComprasmes($idCliente, $mes, $anio);
    //     if ($totalCompras !== null) {
    //         echo json_encode($totalCompras, JSON_UNESCAPED_UNICODE);
    //     } else {
    //         echo json_encode("Error en la consulta");
    //     }
        



    //     // $totalcompras = $this->model->getComprasmes($idCliente, $mes, $anio);
    //     // // $concatenado = $mes . '-' . $anio . '-' . $idCliente;
    //     // echo json_encode($totalcompras, JSON_UNESCAPED_UNICODE);
    //     // // echo json_encode($concatenado, JSON_UNESCAPED_UNICODE);
    //     die();
    // }

    public function totalcomprasmes2()
    {
        $mes = $_GET['mes'];
        $anio = $_GET['anio'];
        $idCliente = $_SESSION['idCliente'];
        $totalCompras = $this->model->getComprasmes($idCliente, $mes, $anio);
        
        header('Content-Type: application/json'); // Establecer el tipo de contenido como JSON
        
        if ($totalCompras !== null) {
            echo json_encode($totalCompras, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode("Error en la consulta");
        }
    
        die();
    }
    public function totalcomprasmes()
    {
        $mes = $_GET['mes'];
        $anio = $_GET['anio'];
        $idCliente = $_SESSION['idCliente'];
        $totalCompras = $this->model->getComprasmes($idCliente, $mes, $anio);
        
        header('Content-Type: application/json'); // Establecer el tipo de contenido como JSON
        
        if ($totalCompras !== null) {
            echo json_encode($totalCompras, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode("Error en la consulta");
        }
    
        die();
    }
    
}



?>