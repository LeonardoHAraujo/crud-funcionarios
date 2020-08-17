<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CollaboratorsModel extends Model
{
    // Table declaration used
    protected $table = 'collaborators_models';

    // Fillable configuration
    protected $fillable = [
        'name',
        'office',
        'sector',
        'address'
    ];
}
