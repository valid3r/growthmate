<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Macro extends Model
{
    protected $fillable = ['title', 'goal_id'];

    public function goal()
    {
        return $this->belongsTo(Goal::class);
    }
}
