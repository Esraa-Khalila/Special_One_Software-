<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    public function index()
    {
        // if (request()->has('search')) {
        //     return  Customer::where('customer_name', 'Like', '%' . request()->input('search') . '%');
        // } else {
            return Customer::all();
     
    }
    public function search($key)
    {
        return Customer::where('trade_name', 'Like', "%$key%")->orwhere('company_name', 'Like', "%$key%")->orwhere('customer_name', 'Like', "%$key%")->get();
    }

    public function store(Request $request)
    {
        $customer = $request->all();
        $arr = [];
        $validator = Validator::make(
            $request->all(),
            [
                'images' => 'required',
                'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
                'logo' => 'required',
                'Trade_Register_image' => 'required',
                'trade_name' => 'required',
                'company_name' => 'required',
                'customer_name' => 'required',

            ]
        );

        if ($validator->fails()) {
            return response()->json(['validateError' => $validator->errors()]);
        } else {
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $filename = time() . rand(1, 3) . '.' . $image->getClientOriginalExtension();
                    $image->move('uploads/', $filename);
                    $arr[] = $filename;
                }
            }
            if ($request->file('logo')) {
                $file = $request->file('logo');
                $filename = date('YmdHi') . $file->getClientOriginalName();
                $file->move(public_path('upload/logo'), $filename);
                $customer['logo'] = $filename;
            }
            if ($request->file('Trade_Register_image')) {
                $file = $request->file('Trade_Register_image');
                $filename = date('YmdHi') . $file->getClientOriginalName();
                $file->move(public_path('upload/Trade_Register_image'), $filename);
                $customer['Trade_Register_image'] = $filename;
            }
            $customer = new Customer;
            $customer->customer_name = $request->input('customer_name');
            $customer->company_name = $request->input('company_name');
            $customer->trade_name = $request->input('trade_name');
            $customer->logo = $filename;
            $customer->Trade_Register_image = $filename;
            $customer->ref_number = time() . '-' . $customer->company_name[0] . '.' . $customer->customer_name[0];
            $customer->contract_image = json_encode($arr);

            $customer->save();
            return response()->json(['status' => 200, 'message' => 'added successfuly']); 
        }
    }
}
