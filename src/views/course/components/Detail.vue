<template>
  <div class="course-detail">
    <div class="header">
      <image-thumb v-if="course" :src="course?.cover" width="400" height="225" />
      <div class="info">
        <a-typography-title :level="4" :content="course?.name ?? ''" :ellipsis="{ rows: 1 }" />
        <a-typography-paragraph :content="course?.desc ?? ''" :ellipsis="{ rows: 6 }" />
        <div class="attrs">
          <a-space size="large">
            <a-space size="small">
              <ui-icon name="if-brick-f" style="color: #1890ff" />
              <span>{{ course?.price }}</span>
            </a-space>
            <a-space>
              <span>学习人数</span>
              <span>{{ numeral(course?.learned_times).format('0,0') }}</span>
            </a-space>
          </a-space>
        </div>
      </div>
    </div>
    <div class="main">
      <div v-html="course?.h5"></div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import ImageThumb from '@/components/image/Thumb.vue'
import numeral from 'numeral'

const course = inject('course')
</script>

<style lang="less" scoped>
.course-detail {
  padding: 16px;
  background-color: #fff;

  .header {
    display: flex;

    .info {
      flex: 1;
      padding-left: 32px;

      .attrs {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .main {
    margin-top: 40px;
    .bbar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-bottom: 8px;
      border-bottom: 1px solid hsv(0, 0, 94%);
    }
    .content {
      padding: 40px 0;
    }
  }
}
</style>
