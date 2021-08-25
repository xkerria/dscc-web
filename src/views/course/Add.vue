<template>
  <div class="course-add">
    <a-page-header class="header" title="添加课程" :back-icon="false" />
    <div class="container">
      <course-form ref="form" :model="model" />
      <div class="bbar">
        <a-button type="primary" @click="onSubmitClick">提交</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import CourseForm from './components/Form.vue'
import courseApi from '@/api/course'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()
const form = ref(null)
const model = reactive({ name: '', cover: '', price: 0, desc: '' })

const onSubmitClick = () => {
  form.value
    .validate()
    .then((values) => {
      return courseApi.store(values)
    })
    .then(() => {
      message.success('添加成功')
      router.replace('/courses')
    })
}
</script>

<style lang="less" scoped>
.course-add {
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
