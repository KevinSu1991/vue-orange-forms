import { DictData } from '@/common/staticDict/types';

interface ProductInfo {
  // 主键
  id?: string | undefined;
  // 创建人
  createdBy?: string | undefined;
  // 创建时间
  createdTs?: string | undefined;
  // 更新人
  updatedBy?: string | undefined;
  // 更新时间
  updatedTs?: string | undefined;
  // 版本
  version?: number | undefined;
  // 删除标志
  deleteFlag?: number | undefined;
  // 文件id
  attachmentId?: string | undefined;
  // 文件名称
  attachmentName?: string | undefined;
  // 产品条码
  barcode?: string | undefined;
  // 品牌名称英文
  brandNameEn?: string | undefined;
  // 品牌名称
  brandNameZh?: string | undefined;
  // 产品编号
  code?: string | undefined;
  // 所属行业
  industryId?: string | undefined;
  // 产品介绍
  introduction?: string | undefined;
  // 产品名称
  name?: string | undefined;
  // 产品产地
  originLocation?: string | undefined;
  // 生产企业信用代码
  productCompanyCreditCode?: string | undefined;
  // 产品分类id
  productTypeId?: string | undefined;
  // 业务方ID
  purchaserId?: string | undefined;
  // 产品预期使用年限
  serviceLifeAmount?: string | undefined;
  // 产品型号
  type?: string | undefined;
  // 采购品类
  categoryId?: string | undefined;
  // 生产企业地址
  productCompanyAddress?: string | undefined;
  // 生产企业编号
  productCompanyCode?: string | undefined;
  // 生产企业id
  productCompanyId?: string | undefined;
  // 产品分类id  classificationId
  productClassificationId?: string | undefined;
  // 产品英文名称
  nameEn?: string | undefined;
  // 生产企业
  productCompanyName?: string | undefined;
  // 产品图片id
  productPictureId?: string | undefined;
  // 最终版本
  lastVersionFlag?: boolean | undefined;
  // 版本号
  modifyVersion?: string | undefined;
  // 上版本id
  rootId?: string | undefined;
  // 产品别名
  aliasName?: string | undefined;
  // 产品CAS编号
  casCode?: string | undefined;
  // 产品产地省市的Id
  produceOriginDistrictCode?: string | undefined;
  // 计量单位
  amountUnit?: string | undefined;
  // 重量单位
  weightUnit?: string | undefined;
  // 定子外径分类
  dzwjType?: string | undefined;
  // 结构形式分类
  jgxsType?: string | undefined;
  // 适用冷媒分类
  sylmType?: string | undefined;
}

export default ProductInfo;
