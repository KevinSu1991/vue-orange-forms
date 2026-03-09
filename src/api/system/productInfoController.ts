import { BaseController } from '@/api/BaseController';
import { RequestOption } from '@/common/http/types';
import { ANY_OBJECT } from '@/types/generic';
import { TableData } from '@/common/types/table';
import { useUrlBuilder } from '@/common/hooks/useUrl';
import ProductInfo from '@/types/table/productInfo';
import { API_CONTEXT } from '../config';

const { buildGetUrl } = useUrlBuilder();

export interface ProductInfoData extends ProductInfo {
  __cascade_add_temp_id__?: string | number | undefined;
}

export default class ProductInfoController extends BaseController {
  static list(params: ANY_OBJECT, httpOptions?: RequestOption) {
    return super.post<TableData<ProductInfoData>>(API_CONTEXT + '/app/productInfo/list', params, httpOptions);
  }
  static view(params: ANY_OBJECT, httpOptions?: RequestOption) {
    return super.get<ProductInfoData>(API_CONTEXT + '/app/productInfo/view', params, httpOptions);
  }
  static export(params: ANY_OBJECT, fileName: string) {
    return super.download(API_CONTEXT + '/app/productInfo/export', params, fileName);
  }
  static import(params: ANY_OBJECT) {
    return super.upload(API_CONTEXT + '/app/productInfo/import', params);
  }
  static printUrl(params: ANY_OBJECT) {
    return buildGetUrl(API_CONTEXT + '/app/productInfo/print', params);
  }
  static add(params: ANY_OBJECT, httpOptions?: RequestOption) {
    return super.post(API_CONTEXT + '/app/productInfo/add', params, httpOptions);
  }
  static update(params: ANY_OBJECT, httpOptions?: RequestOption) {
    return super.post(API_CONTEXT + '/app/productInfo/update', params, httpOptions);
  }
  static delete(params: ANY_OBJECT, httpOptions?: RequestOption) {
    return super.post(API_CONTEXT + '/app/productInfo/delete', params, httpOptions);
  }
  static deleteBatch(params: ANY_OBJECT, httpOptions?: RequestOption) {
    return super.post(API_CONTEXT + '/app/productInfo/deleteBatch', params, httpOptions);
  }
  static listWithGroup(params: ANY_OBJECT, httpOptions?: RequestOption) {
    return super.post(API_CONTEXT + '/app/productInfo/listWithGroup', params, httpOptions);
  }
}
