<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contract;
use App\Models\Customer;
use Illuminate\Support\Facades\Validator;




class ContractController extends Controller
{
   public function index(Request $request,Contract $contracts){
 
    return Contract::all();

   }
    public function search($key){
       return Contract::where('expiry_date','Like',"%$key%")->orwhere('responsible_person','Like',"%$key%")->orwhere('subscription_date','Like',"%$key%")->orwhere('value','Like',"%$key%")->get();
   }
   
      
    public function store(Request $request){
       $validator = Validator::make($request->all(), [
         'expiry_date' => 'required',
            'subscription_date' => 'required',
            'responsible_person' => 'required|min:3',
            'value' => 'required',
    ]);
    if($validator->fails()){
         return response()->json(['validateError'=>$validator->errors()]);
    }else{
       $contract= new Contract;
             
               $contract->subscription_date =$request->input('subscription_date');
               $contract->responsible_person =$request->input('responsible_person');
               $contract->value =$request->input('value');
               $contract->VIP =$request->input('VIP');
               $contract->expiry_date=$request->input('expiry_date') ;
               $contract->contract_period =$contract->getDiffInHoursAttribute();
               $contract->customer_id= $request->input('customer_id');

               $contract->save();
         
               return response()->json(['status'=>200,'message'=>'added successfuly']); 
    }
        
    }
    public function date(){
        $currentDate = date('Y-m-d');
        $articles = Contract::where('expiry_date', '>=', $currentDate)->get();
        return $articles;

    }
    public function customer_contract($key){
  
        return $users = Customer::join('contracts', 'customers.id', '=', 'contracts.customer_id')
        ->where('customer_name','Like',"%$key%")
        ->get(['customers.*', 'contracts.*']);
    }
      public function customer_contractt(){


       return $customer_contract = Customer::join('contracts', 'customers.id', '=', 'contracts.customer_id')
               ->get(['customers.*', 'contracts.*']);
    }
}
