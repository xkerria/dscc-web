<template>
  <div class="category-add">
    <a-page-header class="header" title="添加分类" :back-icon="false" />
    <div class="container">
      <category-form ref="form" :model="model" />
      <div class="bbar">
        <a-button type="primary" @click="onSubmitClick">提交</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import CategoryForm from './components/Form.vue'
import categoryApi from '@/api/category'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()
const form = ref(null)
const model = reactive({ name: '', image: '', on_home: false })

const onSubmitClick = () => {
  form.value
    .validate()
    .then((values) => {
      return categoryApi.store(values)
    })
    .then(() => {
      message.success('添加成功')
      router.replace('/categories')
    })
}
</script>

<style lang="less" scoped>
.category-add {
  padding: 16px;
  background-color: #fff;

  .header {
    border-bottom: 1px solid hsv(0, 0, 94%);
  }

  .container {
    margin-top: 40px;
    .bbar {
      text-align: center;
    }
  }
}
</style>
