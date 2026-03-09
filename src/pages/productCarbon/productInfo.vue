<template>
  <div class="page-box" style="position: relative;">
    <el-form
      ref="productInfoRef"
      :size="layoutStore.defaultFormItemSize"
      label-width="120px"
      label-position="right"
      @submit.prevent
    >
      <filter-box :item-width="350" @search="refreshProductInfo()" @reset="resetProductInfo">
        <el-form-item label="产品名称">
          <el-input
            class="filter-item"
            v-model="formFilter.nameFilter"
            type="text"
            placeholder=""
            :clearable="true"
            :show-word-limit="false"
            maxlength=""
          />
        </el-form-item>
      </filter-box>
    </el-form>
    <table-box
      ref="productInfo"
      class="page-table"
      :data="productInfoWidgetDataList"
      :size="layoutStore.defaultFormItemSize"
      :row-config="{isCurrent: false, isHover: true}"
      :seq-config="{startIndex: ((productInfoWidgetCurrentPage - 1) * productInfoWidgetPageSize)}"
      :sort-config="{remote: true}"
      :hasExtend="false"
       :hasSearchString="true"
      @sort-change="productInfoWidget.onSortChange"
      @refresh="productInfoWidget.refreshTable()"
    >
      <vxe-column title="序号" type="seq" fixed="left" :index="productInfoWidget.getTableIndex" :width="80" />
      <template slot="empty">
        <div class="table-empty unified-font">
          <img src="@/assets/img/empty.png">
          <span>暂无数据</span>
        </div>
      </template>
      <!-- 分页 -->
      <template #pagination>
        <el-row type="flex" justify="end" style="margin-top: 10px;">
          <el-pagination
            :total="productInfoWidgetTotalCount"
            :current-page="productInfoWidgetCurrentPage"
            :page-size="productInfoWidgetPageSize"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, prev, pager, next, sizes"
            @current-change="productInfoWidget.onCurrentPageChange"
            @size-change="productInfoWidget.onPageSizeChange">
          </el-pagination>
        </el-row>
      </template>
    </table-box>
    <label v-if="subPage" class="page-close-box" @click="onCancel()">
      <img src="@/assets/img/back2.png" alt="">
    </label>
  </div>
</template>

<script lang="ts">
export default {
  name: 'productInfo',
};
</script>

<script setup lang="ts">
import * as validateRules from '@/common/utils/validate';
import { VxeColumn, VxeTable } from 'vxe-table';
import { ANY_OBJECT } from '@/types/generic';
import { DictData, DictionaryBase } from '@/common/staticDict/types';
import { ElMessage, ElMessageBox, UploadFile } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { useCommon } from '@/common/hooks/useCommon';
import { useLayoutStore, useStaticDictStore } from '@/store';
import { useDownload } from '@/common/hooks/useDownload';
import { useDropdown } from '@/common/hooks/useDropdown';
import { DropdownOptions, ListData } from '@/common/types/list';
import { useTable } from '@/common/hooks/useTable';
import { TableOptions } from '@/common/types/pagination';
import { useUpload } from '@/common/hooks/useUpload';
import { useUploadWidget } from '@/common/hooks/useUploadWidget';
import { DictionaryController } from '@/api/system';
import { treeDataTranslate, findItemFromList, findTreeNodePath, findTreeNode, stringCase } from '@/common/utils';
import { ProductInfoData } from '@/api/system/productInfoController';
import { ProductInfoController } from '@/api/system';
import DeptSelect from '@/components/DeptSelect/index.vue';
import UserSelect from '@/components/UserSelect/index.vue';

const router = useRouter();
const route = useRoute();
const layoutStore = useLayoutStore();
const { downloadFile } = useDownload();
const { getUploadHeaders, getUploadActionUrl, fileListToJson, parseUploadData, getPictureList } = useUpload();
const { 
  Delete,
  Search,
  Edit,
  Plus,
  Refresh,
  Picture,
  Dialog,
  mainContextHeight,
  clientHeight,
  checkPermCodeExist,
  parseParams,
  parseArrayParams,
  formatDateByStatsType,
  getDateRangeFilter,
} = useCommon();
// 静态字典
const { staticDict: StaticDict } = useStaticDictStore();

const props = withDefaults(
  defineProps<{
    subPage?: number | string | boolean;
  }>(),
  {
    subPage: 0,
  },
);

const formFilter = reactive({
  // 产品名称
  nameFilter: undefined,
});
const formFilterCopy = reactive({
  // 产品名称
  nameFilter: undefined,
});
const instance = getCurrentInstance();

const onCancel = () => {
  router.go(-1);
  layoutStore.removeCachePage(route.fullPath as string);
  route.meta.refreshParentCachedPage = true;
};

const onResume = () => {
  refreshProductInfo();
};

/**
 * 表格组件数据获取函数，返回Promise
 */
const loadProductInfoWidgetData = (params: ANY_OBJECT) => {
  if (params == null) params = {};
  params = {
    ...params,
  };
  return new Promise((resolve, reject) => {
    const searchString = productInfo.value ? productInfo.value.getSearchString() : undefined;
    if (searchString && searchString !== '') {
      if (params.productInfoDtoFilter == null) params.productInfoDtoFilter = {};
      params.productInfoDtoFilter.searchString = searchString;
    }
    ProductInfoController.list(params).then(res => {
      resolve({
        dataList: res.data.dataList,
        totalCount: res.data.totalCount
      });
    }).catch(e => {
      reject(e);
    });
  });
};
/**
 * 表格组件数据获取检测函数，返回true正常获取数据，返回false停止获取数据
 */
const loadProductInfoVerify = () => {
  formFilterCopy.nameFilter = formFilter.nameFilter;
  return true;
};
// 表格组件表格组件参数
const productInfoOptions: TableOptions<ProductInfoData> = {
  loadTableData: loadProductInfoWidgetData,
  verifyTableParameter: loadProductInfoVerify,
  paged: true,
  rowSelection: false,
  orderFieldName: 'createdTs',
  ascending: false,
};
// 表格组件表格组件
const productInfo = ref();
const productInfoWidget = useTable(productInfoOptions);
const {
  dataList: productInfoWidgetDataList,
  currentPage: productInfoWidgetCurrentPage,
  pageSize: productInfoWidgetPageSize,
  totalCount: productInfoWidgetTotalCount,
} = productInfoWidget;
const refreshProductInfo = () => {
  // 刷新段落
  productInfoWidget.refreshTable();
};
/**
 * 重置过滤值
 */
const resetProductInfo = () => {
  formFilter.nameFilter = undefined;
  formFilterCopy.nameFilter = undefined;
  refreshProductInfo();
};
/**
 * 重置所有过滤值
 */
const resetFilter = () => {
  resetProductInfo();
};
const formInit = () => {
  refreshProductInfo();
};

onMounted(() => {
  formInit();
});

onActivated(() => {
  onResume();
});
</script>