<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;
    protected $fillable=['id','expiry_date','subscription_date','responsible_person','value','VIP','status','customer_id'];
    public function customer()
    {
        return $this->belongsTo(Customer::class,'customer_id');
    }
public function getDiffInHoursAttribute()
{
    // $from = Carbon::parse($this->subscription_date);
    // $to = Carbon::parse($this->expiry_date);
    // return $to->diffInDays($from);
    
    if ($this->expiry_date) {
        $remaining_days = Carbon::now()->diffInDays(Carbon::parse($this->expiry_date));
    } else {
        $remaining_days = 0;
    }
    return $remaining_days;
    
}
}
