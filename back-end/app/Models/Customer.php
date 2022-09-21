<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
     protected $fillable=['id','customer_name','company_name','trade_name','logo','Trade_Register_image','contract_image'];
    public function contract()
    {
        return $this->hasMany(Contract::class,'customer_id');
   
    }

    
}
