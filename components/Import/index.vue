<template>
  <div class="import">
    <div class="import-trigger" @click="handleToogleImport">
      <slot>
        <el-button type="primary" size="mini" icon="el-icon-upload2">
          导入
        </el-button>
      </slot>
    </div>
    <el-dialog :visible.sync="showImport" :before-close="handleToogleImport">
      <div slot="title">
        <span class="import-title">{{ title }}</span>
        <a
          class="import-template"
          target="_blank"
          v-if="template"
          :href="template.url || template"
          :download="template.name"
        >
          下载模板 <i class="el-icon-download"></i>
        </a>
      </div>
      <div class="import-upload">
        <upload
          drag
          v-model="importFileList"
          :on-success="handleUploadSuccess"
          class="import-upload-box"
          v-bind="$attrs"
        >
          <div slot="trigger">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传进行导入</em>
            </div>
          </div>
        </upload>
      </div>
      <div class="import-reocrd" v-if="showRecord">
        <h3 class="import-record-header">导入记录</h3>
        <tables :data="importRecordList" :columns="columns" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Upload from '../Upload'
import Tables from '../Tables'
import isFunction from 'lodash/isFunction'
export default {
  name: 'Import',
  components: {
    Upload,
    Tables,
  },
  props: {
    title: {
      type: String,
      default: '导入',
    },
    importRequest: {
      type: Function,
      required: true,
    },
    showRecord: {
      type: Boolean,
      default: true,
    },
    recordColumns: {
      type: Array,
      default: () => [],
    },
    template: {
      type: [String, Object],
      default: '',
    },
    successMsg: {
      type: String,
      default: '导入成功！',
    },
    errorMsg: {
      type: String,
      default: '导入失败！',
    },
  },
  data() {
    const defaultColumns = [
      {
        label: '名称',
        prop: '_file_name',
        'show-overflow-tooltip': true,
        width: 200,
      },
      {
        label: '状态',
        prop: 'status',
        width: 80,
        render: val => (
          <el-tag effect="dark" type={val ? 'success' : 'danger'}>
            {val ? '成功' : '失败'}
          </el-tag>
        ),
      },
      {
        label: '描述',
        prop: 'description',
        'show-overflow-tooltip': true,
        render: val => {
          if (Array.isArray(val)) {
            return val.map(item => <div>{item}</div>)
          }
          return val
        },
      },
    ]
    return {
      importFileList: [],
      importRecordList: [],
      columns:
        this.recordColumns && this.recordColumns.length
          ? this.recordColumns
          : defaultColumns,
      showImport: false,
    }
  },
  methods: {
    // 切换导入
    handleToogleImport() {
      // 关闭弹窗时，通知父组件
      if (this.showImport) {
        this.$emit('close')
      }
      this.showImport = !this.showImport
    },
    //处理上传成功，触发导入
    handleUploadSuccess(response, file, fileList) {
      return new Promise((resolve, reject) => {
        if (this.importRequest && isFunction(this.importRequest)) {
          this.importRequest(response, resolve, reject)
        } else {
          reject(new Error(`未定义合法的导入处理函数！${this.importRequest}`))
        }
      })
        .then(
          record => {
            this.$message.success(this.successMsg)
            record && this.updateImportRecord(record, file, fileList)
          },
          record => {
            this.$message.error(this.errorMsg)
            record && this.updateImportRecord(record, file, fileList)
          }
        )
        .catch(error => {
          this.$message.error(this.errorMsg)
        })
    },
    // 更新导入记录
    updateImportRecord(record = {}, file, fileList) {
      this.importRecordList.push({ _file_name: file.name, ...record })
    },
  },
}
</script>

<style lang="scss" scoped>
.import {
  display: inline-block;
  &-title {
    font-size: 18px;
    line-height: 24px;
    color: #fefefe;
  }
  &-template {
    margin-left: 10px;
    color: #21aeff;
  }
  &-upload {
    text-align: center;
    &-box {
      width: 360px;
      margin: 0 auto;
    }
  }

  &-record {
    &-header {
      font-size: 16px;
      font-weight: normal;
    }
    &-icon {
      font-size: 18px;
      &-success {
        color: #67c23a;
      }
      &-error {
        color: #f56c6c;
      }
    }
  }
}
</style>
