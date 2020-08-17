<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\CollaboratorsModel;

class CrudController extends Controller {

    // Functions CRUD

    // READ
    public function index() {       
        $collaborators = DB::table('collaborators_models')
            ->select(
                'id',
                'name',
                'office',
                'sector',
                'address',
                'created_at',
                'updated_at'
            )
            ->get();
        
        header("Access-Control-Allow-Origin: *");
        return response()->json($collaborators);
    }

    // READ ONE
    public function show($name) {
        $collaborator = DB::table('collaborators_models')
            ->where('name', 'like', "%$name%")
            ->select(
                'id',
                'name',
                'office',
                'sector',
                'address',
                'created_at',
                'updated_at'
            )
            ->get();

        header("Access-Control-Allow-Origin: *");
        return response()->json($collaborator);
    }

    // CREATE
    public function store(Request $req) {

        // Form validate
        if ('' === $req->name || false === isset($req->name)) {
            return response()->json([
                'success' => false,
                'status'  => 'invalid_name',
                'message' => 'Nome não informado.'
            ]);
        }

        if ('' === $req->office || false === isset($req->office)) {
            return response()->json([
                'success' => false,
                'status'  => 'invalid_office',
                'message' => 'Cargo não informado.'
            ]);
        }

        if ('' === $req->sector || false === isset($req->sector)) {
            return response()->json([
                'success' => false,
                'status'  => 'invalid_sector',
                'message' => 'Setor não informado.'
            ]);
        }

        if ('' === $req->address || false === isset($req->address)) {
            return response()->json([
                'success' => false,
                'status'  => 'invalid_address',
                'message' => 'Endereço não informado.'
            ]);
        }

        // Capturing address and name
        $name = CollaboratorsModel::where('name', $req->name)->get();
        $address = CollaboratorsModel::where('address', $req->address)->get();

        if(!$address->isEmpty() && !$name->isEmpty()) {

            // Check that the address and name are different
            if($name[0]->address !== $address[0]->address) {

                $collaborator = CollaboratorsModel::create([
                    'name' => $req->name,
                    'office' => $req->office,
                    'sector' => $req->sector,
                    'address' => $req->address
                ]);

                return response()->json([
                    'success' => true,
                    'status'  => 'success',
                    'message' => 'Funcionário gravado com sucesso.'
                ]);
            }else {
                return response()->json([
                    'success' => false,
                    'status'  => 'Failed',
                    'message' => 'Esse usuário já possui esse endereço.'
                ]);
            }

        }else {

            $collaborator = CollaboratorsModel::create([
                'name' => $req->name,
                'office' => $req->office,
                'sector' => $req->sector,
                'address' => $req->address
            ]);

            return response()->json([
                'success' => true,
                'status'  => 'success',
                'message' => 'Funcionário gravado com sucesso.'
            ]);
        }
    }

    // UPDATE
    public function update($id, Request $req) {

        // Form validate
        if ('' === $id || false === isset($id)) {
            return response()->json([
                'success' => false,
                'status'  => 'invalid_id',
                'message' => 'Ops! Algo deu errado, contate o administrador.'
            ]);
        }

        if ('' === $req->name || false === isset($req->name)) {
            return response()->json([
                'success' => false,
                'status'  => 'invalid_name',
                'message' => 'Nome não informado.'
            ]);
        }

        if ('' === $req->office || false === isset($req->office)) {
            return response()->json([
                'success' => false,
                'status'  => 'invalid_office',
                'message' => 'Cargo não informado.'
            ]);
        }

        if ('' === $req->sector || false === isset($req->sector)) {
            return response()->json([
                'success' => false,
                'status'  => 'invalid_sector',
                'message' => 'Setor não informado.'
            ]);
        }

        if ('' === $req->address || false === isset($req->address)) {
            return response()->json([
                'success' => false,
                'status'  => 'invalid_address',
                'message' => 'Endereço não informado.'
            ]);
        }

        // Capturing address and name
        $name = CollaboratorsModel::where('name', $req->name)->get();
        $address = CollaboratorsModel::where('address', $req->address)->get();

        if(!$address->isEmpty() && !$name->isEmpty()) {

            // Check that the address and name are different
            if($name[0]->address !== $address[0]->address) {

                $collaborator = DB::table('collaborators_models')
                ->where('id', $id)
                ->update([
                    'name' => $req->name,
                    'office' => $req->office,
                    'sector' => $req->sector,
                    'address' => $req->address
                ]);

                return response()->json([
                    'success' => true,
                    'status'  => 'success',
                    'message' => 'Funcionário alterado com sucesso.'
                ]);
            }else {
                return response()->json([
                    'success' => false,
                    'status'  => 'Failed',
                    'message' => 'Esse usuário já possui esse endereço.'
                ]);
            }

        }else {

            $collaborator = DB::table('collaborators_models')
                ->where('id', $id)
                ->update([
                    'name' => $req->name,
                    'office' => $req->office,
                    'sector' => $req->sector,
                    'address' => $req->address
                ]);

            return response()->json([
                'success' => true,
                'status'  => 'success',
                'message' => 'Funcionário alterado com sucesso.'
            ]);
        }        
    }

    // DELETE
    public function delete($id) {

        // Form validate
        if ('' === $id || false === isset($id)) {
            return response()->json([
                'success' => false,
                'status'  => 'invalid_id',
                'message' => 'Ops! Algo deu errado, contate o administrador.'
            ]);
        }

        DB::table('collaborators_models')->where('id', $id)->delete();

        header("Access-Control-Allow-Origin: *");

        return response()->json([
            'success' => true,
            'status'  => 'success',
            'message' => 'Funcionário deletado com sucesso.'
        ]);
    }

}
