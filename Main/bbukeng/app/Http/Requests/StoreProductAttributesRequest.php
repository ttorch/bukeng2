<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductAttributesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => [$this->isPostRequest(), 'max:500'],
            'value' => [$this->isPostRequest()],
            // 'highlight' => [$this->isPostRequest()],
            // 'important' => [$this->isPostRequest()],
            'product_id' => [$this->isPostRequest()],
        ];
    }

    private function isPostRequest() {
        return request()->isMethod('post') ? 'required' :'sometimes';
    }
}
