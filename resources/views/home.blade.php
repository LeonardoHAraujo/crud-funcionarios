@extends('layouts.app')

@section('content')
<div class="container-data">
    <!-- POST Search Form -->
    <form id="formPost" action="" method="post" class="form-inline">
        @csrf
        <div class="form-group mx-sm-3 mb-2">
            <input type="text" class="form-control" placeholder="Nome do Funcionario..." data-input-value>
        </div>
        <button type="submit" id="" class="btn btn-primary mb-2" data-btn-search>Pesquisar</button>
    </form>

    <hr class="my-4">

    <!-- Modal form Create Form -->
    <button class="btn btn-primary mb-2" data-btn-new>Adicionar Funcionario</button>

    <!-- Data List (Header) -->
    <div>
        <div id="containList" class="container-list">
            <div id="a-linha" class="row">
                <div class="col-sm">
                    Nome
                </div>
                <div class="col-sm">
                    Cargo
                </div>
                <div class="col-sm">
                    Setor
                </div>
                <div class="col-sm">
                    Endereço
                </div>
                <div class="col-sm">
                    Criado em
                </div>
                <div class="col-sm">
                    Alterado em
                </div>
                <div class="col-sm">
                    Ações
                </div>
            </div>
        </div>

        <!-- Dynamic data coming via AJAX -->
        <div id="dataDynamics"></div>

    </div>

    <!-- Modal Datas -->
    <div class="modal fade" role="dialog" data-modal-edit>
        <div class="modal-dialog">
            <!-- Modal content-->
            <form action="" method="post">
                <div class="modal-content">

                    <!-- Data id -->
                    <input type="hidden" value="" data-id>

                    <!-- Modal Header  -->
                    <div class="modal-header">
                        <h4 class="modal-title">Adicionar Funcionário</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Message Alert validate -->
                    <div class="hide-message" id="alert-message" data-message-validate></div>
                    
                    <!-- Modal Body  -->
                    <div class="modal-body">
                        <div class="form-group mx-sm-3 mb-2">
                            <label for="name">Nome</label>
                            <input type="text" id="name" class="form-control" placeholder="Nome do funcionario...">
                        </div>
                        <div class="form-group mx-sm-3 mb-2">
                            <label for="office">Cargo</label>
                            <input type="text" id="office" class="form-control" placeholder="Cargo do funcionario...">
                        </div> 
                        <div class="form-group mx-sm-3 mb-2">
                            <label for="sector">Setor</label>
                            <input type="text" id="sector" class="form-control" placeholder="Setor do funcionario...">
                        </div> 
                        <div class="form-group mx-sm-3 mb-2">
                            <label for="address">Endereço</label>
                            <input type="text" id="address" class="form-control" placeholder="Endereço do funcionario...">
                        </div> 
                    </div>

                    <!-- Modal Footer  -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary mb-2" data-btn-confirm>Confirmar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

</div>
@endsection
