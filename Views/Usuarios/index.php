<?php require_once "Views/Templates/header.php"; ?>


<h1 class="mt-4">Oficina Virtual</h1>
<ol class="breadcrumb mb-4">
    <li class="breadcrumb-item active">Mi Oficina</li>
</ol>
<!-- Contenedor para mostrar Menu -->
<div class="row">
    <div class="col-xl-3 col-md-6">
        <div class="card bg-primary text-white mb-4">
            <div class="card-body" style="overflow: hidden;">
                <span style="float: left;">Compras del mes</span>
                <span style="float: right; text-align: right;">
                    <strong id="Saldo">0</strong> $
                </span>
            </div>
            <div class="card-footer d-flex align-items-center justify-content-between">
                <a id="detalleCompras"class="small text-white stretched-link" href="#">Detalles de compras</a>
                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-md-6">
        <div class="card bg-primary text-white mb-4">
            <div class="card-body" style="overflow: hidden;">
                <span style="float: left;">Compras del mes</span>
                <span style="float: right; text-align: right;">
                    <strong id="Saldo">0</strong> $
                </span>
            </div>
            <div class="card-footer d-flex align-items-center justify-content-between">
                <a id="detalleCompras"class="small text-white stretched-link" href="#">Detalles de compras</a>
                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-md-6">
        <div class="card bg-primary text-white mb-4">
            <div class="card-body" style="overflow: hidden;">
                <span style="float: left;">Compras del mes</span>
                <span style="float: right; text-align: right;">
                    <strong id="Saldo">0</strong> $
                </span>
            </div>
            <div class="card-footer d-flex align-items-center justify-content-between">
                <a id="detalleCompras"class="small text-white stretched-link" href="#">Detalles de compras</a>
                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-md-6">
        <div class="card bg-primary text-white mb-4">
            <div class="card-body" style="overflow: hidden;">
                <span style="float: left;">Compras del mes</span>
                <span style="float: right; text-align: right;">
                    <strong id="Saldo">0</strong> $
                </span>
            </div>
            <div class="card-footer d-flex align-items-center justify-content-between">
                <a id="detalleCompras"class="small text-white stretched-link" href="#">Detalles de compras</a>
                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-xl-4 col-md-6">
        <div class="card bg-success shadow text-white mb-4">
            <div class="card-body" style="overflow: hidden;">
                <span style="float: left;">Referidos</span>
                <span style="float: right; text-align: right;">
                    <strong id="nref">0</strong> <i class="fas fa-users"></i>
                </span>
            </div>
            <div class="card-footer d-flex align-items-center justify-content-between">
                <a id="enlaceCargarTabla" class="small text-white stretched-link" href="#">View Details</a>
                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
            </div>
        </div>
    </div>
    <div class="col-xl-4 col-md-6">
        <div class="card bg-success shadow text-white mb-4">
            <div class="card-body" style="overflow: hidden;">
                <span style="float: left;">Referidos</span>
                <span style="float: right; text-align: right;">
                    <strong id="nref">0</strong> <i class="fas fa-users"></i>
                </span>
            </div>
            <div class="card-footer d-flex align-items-center justify-content-between">
                <a class="small text-white stretched-link" href="#">View Details</a>
                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
            </div>
        </div>
    </div>
    <div class="col-xl-4 col-md-6">
        <div class="card bg-success shadow text-white mb-4">
            <div class="card-body" style="overflow: hidden;">
                <span style="float: left;">Referidos</span>
                <span style="float: right; text-align: right;">
                    <strong id="nref">0</strong> <i class="fas fa-users"></i>
                </span>
            </div>
            <div class="card-footer d-flex align-items-center justify-content-between">
                <a class="small text-white stretched-link" href="#">View Details</a>
                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
            </div>
        </div>
    </div>
</div>
<!-- Contenedor para mostrar la tabla -->

    <div class="card mb-4">
        <div class="card-header">
            <i class="fas fa-table mr-1"></i>
            <label id="labelmulti">Multinivel</label>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <div id="tablaContainer" class="pl-2 pr-2" style="display: none;">
                    <table id="tablaAfiliados" class="table table-bordered" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>status</th>
                                <th>Consulta</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>status</th>
                                <th>Consulta</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <!-- Los datos se cargarán a través de Ajax aquí -->
                        </tbody>
                    </table>
                </div>
            
                <div id="tablaContainerR" class="pl-2 pr-2"style="display: none;">
                    <table id="tablaReferidos" class="table table-bordered" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>status</th>
                                <th>Consulta</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>statu</th>
                                <th>Consulta</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <!-- Los datos se cargarán a través de Ajax aquí -->
                        </tbody>
                    </table>
                </div>

                <div id="tablaContainerD" class="pl-2 pr-2"style="display: none;">
                    <table id="tablaDetalleCompras" class="table table-bordered" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Factura #</th>
                                <th>Fecha</th>
                                <th>Monto</th>
                                <th>Detalle</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>#</th>
                                <th>Factura #</th>
                                <th>Fecha</th>
                                <th>Monto</th>
                                <th>Detalle</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <!-- Los datos se cargarán a través de Ajax aquí -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- fin Contenedor para mostrar la tabla -->
    <!-- inicio de modal -->
    
    <!-- <div class="modal fade" id="detalleModal" tabindex="-1" aria-labelledby="detalleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content"> -->
      <!-- Aquí mostrarás los detalles de la factura -->
                <!-- <div class="modal-header">
                    <h5 class="modal-title">Detalle de Factura</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" id="detalles">
                    <div class="card">
                        <div class="card-header">
                        Factura #{{ numero }}
                        </div>
                        <div class="card-body">
                        <p class="card-text">Fecha: {{ fecha }}</p>
                        <p class="card-text">Monto: {{ monto }}</p>
                        <p class="card-text">Detalles: {{ detalles }}</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div> -->


<div class="modal fade" id="detalleModal2" tabindex="-1" aria-labelledby="detalleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="detalleModalLabel">Detalle de Factura</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="detalles">
                <div class="card">
                    <div class="card-header">
                        Factura #<span id="facturaNumero"></span>
                    </div>
                    <div class="card-body">
                        <p class="card-text">Fecha: <span id="facturaFecha"></span></p>
                        <p class="card-text">Monto: <span id="facturaMonto"></span></p>
                        <p class="card-text">Detalles: <span id="facturaDetalles"></span></p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="detalleModal222" tabindex="-1" aria-labelledby="detalleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="detalleModalLabel">Detalle de Factura</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="detalles">
                <div class="card">
                    <div class="card-header">
                        Factura #<span id="facturaNumero"></span>
                    </div>
                    <div class="card-body">
                        <p class="card-text">Fecha de creación: <span id="facturaCreatedAt"></span></p>
                        <p class="card-text">Producto ID: <span id="facturaProductId"></span></p>
                        <p class="card-text">Cantidad: <span id="facturaQuantity"></span></p>
                        <!-- Agrega más propiedades aquí según tus necesidades -->
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="detalleModal" tabindex="-1" aria-labelledby="detalleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="detalleModalLabel">Detalle de Factura</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="detalles">
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Codigo Producto</th>
                            <th>Nombre del producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Total</th>
                            <!-- Agrega más encabezados aquí según tus necesidades -->
                        </tr>
                    </thead>
                    <tbody id="tablaDetalles">
                        <!-- Aquí se agregarán las filas de la tabla -->
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>



<?php include "Views/Templates/footer.php"; ?>